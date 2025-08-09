<template>
  <div>
    <h2>キャラクターマスター新規追加</h2>
    
    <!-- INFO: Vuetifyのフォームコンポーネントで全体をラップします -->
    <v-form @submit.prevent="handleSaveMaster">
      <v-container>
        <v-row>
          <!-- INFO: 各入力項目をv-text-fieldとv-selectに置き換え -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model.number="masterData.no   "
              label="図鑑番号"
              type="number"
              placeholder="例: 1234"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model.trim="masterData.name    "
              label="キャラクター名"
              required
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model.trim="masterData.element"
              label="属性"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model.trim="masterData.type"
              label="分類"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <!-- INFO: gachaMastersから表示用の名前と値を取得します -->
            <v-select
              v-model="masterData.gacha"
              :items="gachaMasters"
              item-title="name"
              item-value="name"
              label="排出ガチャ (限定の場合)"
              placeholder="(限定ではない/その他)"
              clearable
              variant="outlined"
            ></v-select>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12">
            <!-- INFO: ボタンをv-btnに置き換え、状態を反映させます -->
            <v-btn
              :loading="isSaving"
              :disabled="!masterData.name || isSaving"
              @click="handleSaveMaster"
              color="primary"
              size="large"
              block
            >
        {{ isSaving ? '追加中...' : 'マスターリストに新規追加' }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { databaseService } from '../../services/database.js';

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
