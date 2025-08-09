<template>
  <div>
    <h2>キャラクターマスター編集</h2>
    <v-form>
      <v-container class="pa-0">
        <!-- #region [Selection Area] -->
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.search  "
              label="編集したいキャラクター名で検索"
              variant="outlined"
              clearable
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-card variant="outlined">
              <v-list v-model:selected="selectedMasterIdProxy" style="height: 300px; overflow-y: auto;">
                <v-list-item
                  v-for="master in editableMasters"
                  :key="master.id  "
                  :value="master.id"
                >
                  <v-list-item-title>[{{ master.indexNumber || '?' }}] {{ master.monsterName }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
        <!-- #endregion -->
        
        <!-- #region [Edit Form Area] -->
        <v-row v-if="form.selectedMasterId">
          <v-col cols="12">
            <v-card variant="outlined">
              <v-card-title>編集フォーム</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field v-model.number="form.no   " label="図鑑番号" type="number" variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model.trim="form.name   " label="キャラクター名" required variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model.trim="form.element" label="属性" variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model.trim="form.type" label="分類" variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="form.gacha"
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
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :loading="isUpdating"
                  :disabled="!form.selectedMasterId || isUpdating"
                  @click="handleUpdateMaster"
                  color="primary"
                  size="large"
                  class="ma-2"
                >
                  マスター情報を更新
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <!-- #endregion -->
      </v-container>
    </v-form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { databaseService } from '../../services/database.js';

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
 * [概要] v-listのv-model(配列)と、フォームのselectedMasterId(文字列)の差異を吸収するプロキシ。
 */
const selectedMasterIdProxy = computed({
  get() {
    return form.selectedMasterId ? [form.selectedMasterId] : [];
  },
  set(value) {
    form.selectedMasterId = value[0] || null;
  }
});
// #endregion

// #region [Watchers]
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
