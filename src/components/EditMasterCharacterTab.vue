<template>
  <div id="tab-edit-master" class="tab-content">
    <h2>キャラクターマスター編集</h2>
    <div class="form-section">
        <label>キャラクター検索:</label>
        <input type="text" v-model="form.search " placeholder="編集したいキャラクター名で検索">
        <label>編集するキャラクターを選択:</label>
        <select v-model="form.selectedMasterId" size="10" style="width:100%">
          <option v-for="master in editableMasters" :key="master.id  " :value="master.id">
            [{{ master.indexNumber || '?' }}] {{ master.monsterName }}
          </option>
        </select>
    </div>
    <div class="form-section" v-if="form.selectedMasterId">
      <h3>編集フォーム</h3>
      <label>図鑑番号:</label>
      <input type="number" v-model.number="form.no " placeholder="例: 1234">
      <label>キャラクター名:</label>
      <input type="text" v-model.trim="form.name " required>
      <label>属性:</label>
      <input type="text" v-model.trim="form.element">
      <label>分類:</label>
      <input type="text" v-model.trim="form.type">
      <label>排出ガチャ (限定の場合):</label>
      <select v-model="form.gacha">
        <option value="">(限定ではない/その他)</option>
        <option v-for="gacha in gachaMasters" :key="gacha.id   " :value="gacha.name  ">{{ gacha.name }}</option>
      </select>
      <br><br>
      <button @click="handleUpdateMaster" :disabled="!form.selectedMasterId || isUpdating">
        {{ isUpdating ? '更新中...' : 'マスター情報を更新' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { databaseService } from '../services/database.js';

const props = defineProps({
  characterMasters: { type: Array, required: true },
  gachaMasters: { type: Array, required: true },
});

const emit = defineEmits(['master-updated']);

/**
 * @type {Object} フォームの検索、選択、入力データを保持するリアクティブなオブジェクト
 */
const form = reactive({
  search: '',
  selectedMasterId: null,
  no: '',
  name: '',
  element: '',
  type: '',
  gacha: '',
});

/** @type {import('vue').Ref<boolean>} 更新処理が実行中かどうかのフラグ */
const isUpdating = ref(false);
  
/**
 * [概要] IDによる高速アクセスのため、マスターリストをMap形式に変換する。
 * @returns {Map<string, Object>} キャラクターマスターIDをキーとするMap
 */
const characterMastersMap = computed(() => {
  return new Map(props.characterMasters.map (m => [m.id , m]));
});

/**
 * [概要] 検索文字列に基づいて編集可能なマスターリストをフィルタリングする。
 * @returns {Array<Object>} フィルタリングされたキャラクターマスターの配列
 */
const editableMasters = computed(() => {
  if (!props.characterMasters.length) return [];
  const lowerSearch = form.search.toLowerCase();
  return props.characterMasters.filter(master => !lowerSearch || master.monsterName.toLowerCase().includes(lowerSearch));
});

/**
 * [概要] 選択されたマスターIDが変更された際にフォームを更新する。
 * @param {string | null} newId - 新しく選択されたマスターID
 */
watch(() => form.selectedMasterId, (newId) => {
  if (!newId) {
    // INFO: 選択が解除されたらフォームをリセット
    Object.assign(form, { name: '', no: '', element: '', type: '', gacha: '' });
    return;
  }
  // INFO: .valueは不要 (computedはRefオブジェクトを返すため)
  const master = characterMastersMap.value.get(newId);
  if (master) {
    Object.assign(form, {
      name: master.monsterName,
      no: master.indexNumber,
      element: master.element,
      type: master.type,
      gacha: master.ejectionGacha
    });
  }
});

/**
 * [概要] マスター情報を更新する。
 */
const handleUpdateMaster = async () => {
  if (!form.selectedMasterId || !form.name) return alert('キャラを選択し名前を入力してください。');
  
  isUpdating.value = true;
  try {
    const updatedData = {
      monsterName: form.name,
      indexNumber: form.no ? Number(form.no) : 0,
      element: form.element,
      type: form.type,
      ejectionGacha: form.gacha
    };
    await databaseService.updateCharacterMaster(form.selectedMasterId, updatedData);
    
    alert('マスター情報を更新しました。ページをリロードしてください。');
    emit('master-updated');

  } catch (e) {
    alert('更新に失敗: ' + e.message);
  } finally {
    isUpdating.value = false;
  }
};
</script>
