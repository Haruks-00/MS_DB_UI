<template>
  <div id="tab-add-master" class="tab-content">
    <h2>キャラクターマスター新規追加</h2>
    <div class="form-section">
      <label>図鑑番号:</label>
      <input type="number" v-model.number="masterData.no   " placeholder="例: 1234">
      
      <label>キャラクター名:</label>
      <input type="text" v-model.trim="masterData.name    " required>
      
      <label>属性:</label>
      <input type="text" v-model.trim="masterData.element">
      
      <label>分類:</label>
      <input type="text" v-model.trim="masterData.type">
      
      <label>排出ガチャ (限定の場合):</label>
      <select v-model="masterData.gacha">
        <option value="">(限定ではない/その他)</option>
        <option v-for="gacha in gachaMasters" :key="gacha.id    " :value="gacha.name    ">{{ gacha.name }}</option>
      </select>
      
      <br><br>
      <button @click="handleSaveMaster" :disabled="!masterData.name || isSaving">
        {{ isSaving ? '追加中...' : 'マスターリストに新規追加' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { databaseService } from '../services/database.js';

/**
 * [概要] 親から渡されるガチャのマスターデータ。
 */
const props = defineProps({
  gachaMasters: {
    type: Array,
    required: true,
  },
});

/**
 * [概要] 親にマスターデータが追加されたことを通知するイベント。
 */
const emit = defineEmits(['master-added']);

/**
 * @type {Object} フォームの入力データを保持するリアクティブなオブジェクト。
 * @note INFO: 複数のプロパティを持つオブジェクトは `reactive` を使うと便利です。
 */
const masterData = reactive({
  no: '',
  name: '',
  element: '',
  type: '恒常',
  gacha: '',
});

/** @type {import('vue').Ref<boolean>} 保存処理が実行中かどうかのフラグ */
const isSaving = ref(false);

/**
 * [概要] マスターデータをDBに保存し、完了後に親に通知する。
 */
const handleSaveMaster = async () => {
  if (!masterData.name) return alert('キャラクター名は必須です。');
  
  isSaving.value = true;
  try {
    const newData = {
      indexNumber: masterData.no ? Number(masterData.no) : 0,
      monsterName: masterData.name,
      element: masterData.element || '',
      type: masterData.type || '恒常',
      ejectionGacha: masterData.gacha || ''
    };
    await databaseService.addCharacterMaster(newData);
    
    // NOTE: DB追加成功後、親コンポーネントに通知する
    alert('マスターを追加しました。ページをリロードして反映してください。');
    emit('master-added');

  } catch (e) {
    alert('エラー: ' + e.message);
  } finally {
    isSaving.value = false;
  }
};
</script>
