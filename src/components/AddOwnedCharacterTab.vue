<template>
  <div id="tab-add-owned" class="tab-content">
    <h2>所持キャラクター追加</h2>
    <div class="form-section">
      <label>キャラクター検索:</label>
      <input type="text" v-model="search" placeholder="キャラクター名で検索">
      <label for="addable-char-selector">追加可能なキャラクター:</label>
      <select id="addable-char-selector" v-model="selectedMasterId" size="15" style="width:100%">
        <option v-for="master in addableCharacters" :key="master.id" :value="master.id">
          [{{ master.indexNumber || '?' }}] {{ master.monsterName }} ({{ getOwnedCountForMaster(master.id) }}/2 所持)
        </option>
      </select>
      <br><br>
      <button @click="handleAddCharacter" :disabled="!selectedMasterId || isAdding">
        {{ isAdding ? '追加中...' : 'このキャラクターを所持リストに追加' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import firebase from 'firebase/compat/app'; // INFO: serverTimestampのために必要
import { databaseService } from '../services/database.js';

/**
 * [概要] コンポーネントが受け取るプロパティを定義します。
 */
const props = defineProps({
  characterMasters: { type: Array, required: true },
  characterMastersMap: { type: Map, required: true },
  selectedAccountId: { type: String, default: null },
  ownedCountMap: { type: Map, required: true },
});

/**
 * [概要] 親コンポーネントに通知するイベントを定義します。
 */
const emit = defineEmits(['character-added']);

// INFO: data() は ref() を使ってリアクティブな状態として定義します
const search = ref('');
const selectedMasterId = ref(null);
const isAdding = ref(false);

/**
 * [概要] 検索条件と所持状況に基づき、追加可能なキャラクターのリストを返す。
 * @returns {Array<Object>} 追加可能なキャラクターの配列
 */
const addableCharacters = computed(() => {
  // INFO: this. は不要になり、propsを直接参照します
  if (!props.selectedAccountId) return [];

  const lowerSearch = search.value.toLowerCase();
  return props.characterMasters.filter(master => {
    const isNotFull = getOwnedCountForMaster(master.id) < 2;
    const matchesSearch = !lowerSearch || master.monsterName.toLowerCase().includes(lowerSearch);
    return isNotFull && matchesSearch;
  });
});

/**
 * [概要] 選択中のアカウントが変更されたら、選択中のキャラをリセットする。
 * @note INFO: watchオプションはwatch関数に置き換わります
 */
watch(() => props.selectedAccountId, () => {
  selectedMasterId.value = null;
});

/**
 * [概要] 特定マスターIDの所持数を返すヘルパー関数。
 * @param {string} masterId - キャラクターマスターID
 * @returns {number} 所持数
 */
const getOwnedCountForMaster = (masterId) => {
  if (!props.selectedAccountId) return 0;
  return props.ownedCountMap.get(`${masterId}-${props.selectedAccountId}`) || 0;
};

/**
 * [概要] キャラクター追加ボタンがクリックされた際の処理。
 */
const handleAddCharacter = async () => {
  if (!selectedMasterId.value || !props.selectedAccountId) return alert('追加するキャラとアカウントを選択してください。');
  if (getOwnedCountForMaster(selectedMasterId.value) >= 2) return alert('このキャラは既に2体所持しています。');
  
  isAdding.value = true;
  try {
    const master = props.characterMastersMap.get(selectedMasterId.value);
    if (!master) throw new Error('キャラのマスター情報が見つかりません。');
    
    const newOwnedCharData = {
      characterMasterId: selectedMasterId.value,
      monsterName: master.monsterName,
      items: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await databaseService.addOwnedCharacter(props.selectedAccountId, newOwnedCharData);
    
    const newLocalChar = { ...newOwnedCharData, id: docRef.id , createdAt: { toDate: () => new Date() } };
    emit('character-added', { accountId: props.selectedAccountId, newCharacter: newLocalChar });

    alert(`「${master.monsterName}」を所持リストに追加しました。`);
    selectedMasterId.value = null;
  } catch (error) {
    console.error('キャラ追加失敗:', error);
    alert('エラー: ' + error.message);
  } finally {
    isAdding.value = false;
  }
};
</script>