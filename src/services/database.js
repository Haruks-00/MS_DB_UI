
import { db } from '../firebase-init.js';

/**
 * @description アプリケーションの初期化に必要なすべてのデータを並列で取得し、加工せずにそのまま返します。
 * @param {string} userId - ログインしているユーザーのID。
 * @returns {Promise<Array>} 各コレクションのSnapshotを含む配列。
 * @throws {Error} データ取得に失敗した場合。
 */
const loadInitialDataRaw = (userId) => {
  if (!userId) {
    throw new Error("User ID is required to load initial data.");
  }
  
  try {
    // @temp: MODIFIED - Promise.allで生のSnapshotをそのまま返すように変更
    return Promise.all([
      db.collection('accounts').get(),
      db.collection('character_masters').get(),
      db.collection('itemMasters').get(),
      db.collectionGroup('owned_characters').get(),
      db.collection('gachaMasters').get(),
      db.collection('teams').where('userId', '==', userId).orderBy('createdAt', 'desc').get()
    ]);
  } catch (error) {
    console.error("Database: Failed to load initial data.", error);
    throw error;
  }
};
/**
 * [概要] 初期データをFirestoreから取得し、アプリケーションで使いやすい形に加工して返す。
 * @param {string} userId - ログインしているユーザーのID。
 * @returns {Promise<Object>} 整形済みのデータオブジェクト
 */
const loadAndProcessInitialData = async (userId) => {
  const [accountsSnap, mastersSnap, itemsSnap, ownedCharsSnap, gachaMastersSnap, teamsSnap] = await loadInitialDataRaw(userId);
  
  // INFO: 取得したデータを並列で加工する
  const accounts = accountsSnap.docs.map (doc => { const data = doc.data       (); return { id: doc.id       , name: data.Name  || `アカウント${data.id    }`, numericId: data.id, indexNumber: data.indexNumber }; }).sort((a, b) => (a.numericId || 999) - (b.numericId || 999));
  const characterMasters = mastersSnap.docs.map (doc => ({ ...doc.data(), id: doc.id })).sort((a, b) => (a.indexNumber || 999999) - (b.indexNumber || 999999));
  const characterMastersMap = new Map(characterMasters.map (m => [m.id , m]));
  const itemMasters = itemsSnap.docs.map (doc => ({...doc.data(), id: Number(doc.data().id) })).sort((a, b) => a.id - b.id  );
  const itemMastersMap = new Map(itemMasters.map (item => [item.id , item.name ]));
  const gachaMasters = gachaMastersSnap.docs.map (doc => doc.data()).sort((a,b) => a.id - b.id);
  const teams = teamsSnap.docs.map (doc => ({ ...doc.data(), id: doc.id }));

  const ownedCharactersData = new Map();
  const ownedCountMap = new Map();
  ownedCharsSnap.forEach(doc => {
    const data = doc.data();
    const accountId = doc.ref.parent.parent.id   ;
    const masterId = data.characterMasterId;
    const countKey = `${masterId}-${accountId}`;
    ownedCountMap.set(countKey, (ownedCountMap.get(countKey) || 0) + 1);
    if (!ownedCharactersData.has(accountId)) ownedCharactersData.set(accountId, []);
    ownedCharactersData.get(accountId).push({ ...data, id: doc.id });
  });

  return {
    accounts,
    characterMasters,
    characterMastersMap,
    itemMasters,
    itemMastersMap,
    gachaMasters,
    teams,
    ownedCharactersData,
    ownedCountMap,
  };
};

/**
 * @description 新しい所持キャラクターをデータベースに追加します。
 * @param {string} accountId - アカウントのID。
 * @param {Object} characterData - 追加するキャラクターのデータ。
 * @returns {Promise<firebase.firestore.DocumentReference>} 追加されたドキュメントの参照。
 */
const addOwnedCharacter = (accountId, characterData) => {
  return db.collection('accounts').doc(accountId).collection('owned_characters').add(characterData);
};

/**
 * @description 所持キャラクターのアイテム情報を更新します。
 * @param {string} accountId - アカウントのID。
 * @param {string} ownedCharacterId - 所持キャラクターのドキュメントID。
 * @param {Array<number>} items - 新しいアイテムの配列。
 * @returns {Promise<void>}
 */
const updateCharacterItems = (accountId, ownedCharacterId, items) => {
  return db.collection('accounts').doc(accountId).collection('owned_characters').doc(ownedCharacterId).update({ items });
};

/**
 * @description 複数のアイテム更新をバッチ処理で実行します（アイテム移動用）。
 * @param {string} accountId - アカウントのID。
 * @param {Object} from - 移動元の情報 { id: string, items: Array<number> }
 * @param {Object} to - 移動先の情報 { id: string, items: Array<number> }
 * @returns {Promise<void>}
 */
const moveCharacterItems = (accountId, from, to) => {
  const batch = db.batch();
  const fromRef = db.collection('accounts').doc(accountId).collection('owned_characters').doc(from.id  );
  const toRef = db.collection('accounts').doc(accountId).collection('owned_characters').doc(to.id );
  
  batch.update(fromRef, { items: from.items });
  batch.update(toRef, { items: to.items });
  
  return batch.commit();
};

/**
 * @description 新しいキャラクターマスターをデータベースに追加します。
 * @param {Object} masterData - 追加するマスターデータ。
 * @returns {Promise<void>}
 */
const addCharacterMaster = (masterData) => {
  return db.collection('character_masters').add(masterData);
};

/**
 * @description 既存のキャラクターマスター情報を更新します。
 * @param {string} masterId - マスターのドキュメントID。
 * @param {Object} masterData - 更新するデータ。
 * @returns {Promise<void>}
 */
const updateCharacterMaster = (masterId, masterData) => {
  return db.collection('character_masters').doc(masterId).update(masterData);
};

/**
 * @description チーム情報を保存または更新します。
 * @param {string} teamId - チームのID (更新の場合)。nullの場合は新規作成。
 * @param {Object} teamData - 保存するチームデータ。
 * @returns {Promise<firebase.firestore.DocumentReference | void>} 新規作成の場合はドキュメント参照、更新の場合はvoid。
 */
const saveTeam = (teamId, teamData) => {
  if (teamId) {
    return db.collection('teams').doc(teamId).update(teamData);
  } else {
    return db.collection('teams').add(teamData);
  }
};

/**
 * @description チームを削除します。
 * @param {string} teamId - 削除するチームのID。
 * @returns {Promise<void>}
 */
const deleteTeam = (teamId) => {
  return db.collection('teams').doc(teamId).delete();
};


export const databaseService = {
  loadAndProcessInitialData,
  addOwnedCharacter,
  updateCharacterItems,
  moveCharacterItems,
  addCharacterMaster,
  updateCharacterMaster,
  saveTeam,
  deleteTeam,
};
// #endregion