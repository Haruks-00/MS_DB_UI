import { lazyLoadDatabase } from "../utils/lazyLoader.js";
import { ensureNewFormat } from "../utils/itemMigration";
import type {
  CharacterMaster,
  ItemMaster,
  GachaMaster,
  OwnedCharacter,
  Account,
  Team,
  ItemData,
} from "@/types";
import {
  collection,
  doc,
  writeBatch,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  collectionGroup,
  type QuerySnapshot,
  type DocumentData,
  type DocumentReference,
} from "../firebase-init.js";

/**
 * 初期データの戻り値型
 */
export interface ProcessedInitialData {
  accounts: Account[];
  characterMasters: CharacterMaster[];
  characterMastersMap: Map<string, CharacterMaster>;
  itemMasters: ItemMaster[];
  itemMastersMap: Map<number, string>;
  gachaMasters: GachaMaster[];
  teams: Team[];
  ownedCharactersData: Map<string, OwnedCharacter[]>;
  ownedCountMap: Map<string, number>;
}

/**
 * アプリケーションの初期化に必要なすべてのデータを並列で取得し、加工せずにそのまま返します。
 * @param userId - ログインしているユーザーのID
 * @returns 各コレクションのSnapshotを含む配列
 * @throws データ取得に失敗した場合
 */
const loadInitialDataRaw = async (
  userId: string
): Promise<[
  QuerySnapshot<DocumentData>,
  QuerySnapshot<DocumentData>,
  QuerySnapshot<DocumentData>,
  QuerySnapshot<DocumentData>,
  QuerySnapshot<DocumentData>,
  QuerySnapshot<DocumentData>
]> => {
  if (!userId) {
    throw new Error("User ID is required to load initial data.");
  }

  try {
    const db = await lazyLoadDatabase();
    return Promise.all([
      getDocs(collection(db, "accounts")),
      getDocs(collection(db, "character_masters")),
      getDocs(collection(db, "itemMasters")),
      getDocs(collectionGroup(db, "owned_characters")),
      getDocs(collection(db, "gachaMasters")),
      getDocs(
        query(
          collection(db, "teams"),
          where("userId", "==", userId),
          orderBy("createdAt", "desc")
        )
      ),
    ]);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("Database: Failed to load initial data.", error);
    }
    throw error;
  }
};

/**
 * 初期データをFirestoreから取得し、アプリケーションで使いやすい形に加工して返す
 * @param userId - ログインしているユーザーのID
 * @returns 整形済みのデータオブジェクト
 */
const loadAndProcessInitialData = async (userId: string): Promise<ProcessedInitialData> => {
  const [
    accountsSnap,
    mastersSnap,
    itemsSnap,
    ownedCharsSnap,
    gachaMastersSnap,
    teamsSnap,
  ] = await loadInitialDataRaw(userId);

  // 取得したデータを並列で加工する
  const accounts: Account[] = accountsSnap.docs
    .map((docSnapshot) => {
      const data = docSnapshot.data();
      return {
        id: docSnapshot.id,
        name: data.Name || `アカウント${data.id}`,
        numericId: data.id,
        indexNumber: data.indexNumber,
      } as Account & { numericId?: number; indexNumber?: number };
    })
    .sort((a, b) => ((a as any).numericId || 999) - ((b as any).numericId || 999));

  const characterMasters: CharacterMaster[] = mastersSnap.docs
    .map((docSnapshot) => ({
      ...docSnapshot.data(),
      id: docSnapshot.id,
    } as CharacterMaster & { indexNumber?: number }))
    .sort((a, b) => ((a as any).indexNumber || 999999) - ((b as any).indexNumber || 999999));

  const characterMastersMap = new Map<string, CharacterMaster>(
    characterMasters.map((m) => [m.id, m])
  );

  const itemMasters: ItemMaster[] = itemsSnap.docs
    .map((docSnapshot) => ({
      ...docSnapshot.data(),
      id: Number(docSnapshot.data().id),
    } as ItemMaster))
    .sort((a, b) => (a.id as any) - (b.id as any));

  const itemMastersMap = new Map<number, string>(
    itemMasters.map((item) => [item.id as any, item.name])
  );

  const gachaMasters: GachaMaster[] = gachaMastersSnap.docs
    .map((docSnapshot) => docSnapshot.data() as GachaMaster & { id?: number })
    .sort((a, b) => (a.id || 0) - (b.id || 0));

  const teams: Team[] = teamsSnap.docs.map((docSnapshot) => ({
    ...docSnapshot.data(),
    id: docSnapshot.id,
  } as Team));

  const ownedCharactersData = new Map<string, OwnedCharacter[]>();
  const ownedCountMap = new Map<string, number>();

  ownedCharsSnap.forEach((docSnapshot) => {
    const data = docSnapshot.data();
    const accountId = docSnapshot.ref.parent.parent?.id;
    if (!accountId) return;

    const masterId = data.characterMasterId;
    const countKey = `${masterId}-${accountId}`;
    ownedCountMap.set(countKey, (ownedCountMap.get(countKey) || 0) + 1);

    if (!ownedCharactersData.has(accountId)) {
      ownedCharactersData.set(accountId, []);
    }

    // アイテムデータを新形式に自動変換
    const migratedItems = ensureNewFormat(data.items);
    ownedCharactersData.get(accountId)?.push({
      ...data,
      items: migratedItems,
      id: docSnapshot.id,
    } as OwnedCharacter);
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
 * 新しい所持キャラクターをデータベースに追加します
 * @param accountId - アカウントのID
 * @param characterData - 追加するキャラクターのデータ
 * @returns 追加されたドキュメントの参照
 */
const addOwnedCharacter = async (
  accountId: string,
  characterData: Partial<OwnedCharacter>
): Promise<DocumentReference> => {
  const db = await lazyLoadDatabase();
  return addDoc(
    collection(db, "accounts", accountId, "owned_characters"),
    characterData
  );
};

/**
 * 所持キャラクターのアイテム情報を更新します
 * @param accountId - アカウントのID
 * @param ownedCharacterId - 所持キャラクターのドキュメントID
 * @param items - 新しいアイテムの配列
 * @returns Promise<void>
 */
const updateCharacterItems = async (
  accountId: string,
  ownedCharacterId: string,
  items: ItemData[]
): Promise<void> => {
  const db = await lazyLoadDatabase();
  return updateDoc(
    doc(db, "accounts", accountId, "owned_characters", ownedCharacterId),
    { items }
  );
};

/**
 * 複数のアイテム更新をバッチ処理で実行します（アイテム移動用）
 * @param accountId - アカウントのID
 * @param from - 移動元の情報 { id: string, items: ItemData[] }
 * @param to - 移動先の情報 { id: string, items: ItemData[] }
 * @returns Promise<void>
 */
const moveCharacterItems = async (
  accountId: string,
  from: { id: string; items: ItemData[] },
  to: { id: string; items: ItemData[] }
): Promise<void> => {
  const db = await lazyLoadDatabase();
  const batchInstance = writeBatch(db);
  const fromRef = doc(db, "accounts", accountId, "owned_characters", from.id);
  const toRef = doc(db, "accounts", accountId, "owned_characters", to.id);

  batchInstance.update(fromRef, { items: from.items });
  batchInstance.update(toRef, { items: to.items });

  return batchInstance.commit();
};

/**
 * 新しいキャラクターマスターをデータベースに追加します
 * @param masterData - 追加するマスターデータ
 * @returns Promise<DocumentReference>
 */
const addCharacterMaster = async (
  masterData: Partial<CharacterMaster>
): Promise<DocumentReference> => {
  const db = await lazyLoadDatabase();
  return addDoc(collection(db, "character_masters"), masterData);
};

/**
 * 既存のキャラクターマスター情報を更新します
 * @param masterId - マスターのドキュメントID
 * @param masterData - 更新するデータ
 * @returns Promise<void>
 */
const updateCharacterMaster = async (
  masterId: string,
  masterData: Partial<CharacterMaster>
): Promise<void> => {
  const db = await lazyLoadDatabase();
  return updateDoc(doc(db, "character_masters", masterId), masterData);
};

/**
 * チーム情報を保存または更新します
 * @param teamId - チームのID (更新の場合)。nullの場合は新規作成
 * @param teamData - 保存するチームデータ
 * @returns 新規作成の場合はドキュメント参照、更新の場合はvoid
 */
const saveTeam = async (
  teamId: string | null,
  teamData: Partial<Team>
): Promise<DocumentReference | void> => {
  const db = await lazyLoadDatabase();
  if (teamId) {
    return updateDoc(doc(db, "teams", teamId), teamData);
  } else {
    return addDoc(collection(db, "teams"), teamData);
  }
};

/**
 * チームを削除します
 * @param teamId - 削除するチームのID
 * @returns Promise<void>
 */
const deleteTeam = async (teamId: string): Promise<void> => {
  const db = await lazyLoadDatabase();
  return deleteDoc(doc(db, "teams", teamId));
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
