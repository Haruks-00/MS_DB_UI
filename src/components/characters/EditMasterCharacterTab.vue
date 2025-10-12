<template>
  <div class="pa-6">
    <!-- INFO: より洗練された見出しデザイン -->
    <div class="d-flex align-center mb-6">
      <v-icon
        icon="mdi-account-edit"
        size="32"
        color="primary"
        class="mr-3"
      ></v-icon>
      <h2 class="text-h4 font-weight-bold text-primary">
        キャラクターマスター編集
      </h2>
    </div>

    <!-- INFO: より美しいフォーム -->
    <v-form>
      <v-container class="pa-0">
        <v-row>
          <v-col cols="12">
            <!-- INFO: より美しいキャラクターセレクター -->
            <v-card elevation="2" rounded="lg" class="mb-4">
              <v-card-title class="bg-primary text-white pa-4">
                <v-icon icon="mdi-account-search" class="mr-2"></v-icon>
                編集対象キャラクター選択
              </v-card-title>
              <v-card-text class="pa-4">
                <CharacterSelector
                  v-model="form.selectedMasterId"
                  :items="dataStore.characterMasters"
                  :item-title="
                    (master) =>
                      `[${master.indexNumber || '?'}] ${master.monsterName}`
                  "
                  label="編集したいキャラクター名で検索"
                  list-height="300px"
                  color="primary"
                  prepend-inner-icon="mdi-account-search"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-if="form.selectedMasterId" class="mt-4">
          <v-col cols="12">
            <!-- INFO: より美しい編集フォーム -->
            <v-card elevation="3" rounded="lg">
              <v-card-title class="bg-secondary text-white pa-4">
                <v-icon icon="mdi-account-edit" class="mr-2"></v-icon>
                編集フォーム
              </v-card-title>
              <v-card-text class="pa-6">
                <v-container>
                  <v-row>
                    <!-- INFO: より美しい図鑑番号フィールド -->
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model.number="form.no"
                        label="図鑑番号"
                        type="number"
                        variant="outlined"
                        color="primary"
                        prepend-inner-icon="mdi-numeric"
                        class="mb-4"
                      ></v-text-field>
                    </v-col>

                    <!-- INFO: より美しいキャラクター名フィールド -->
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model.trim="form.name"
                        label="キャラクター名"
                        required
                        variant="outlined"
                        color="primary"
                        prepend-inner-icon="mdi-account"
                        class="mb-4"
                      ></v-text-field>
                    </v-col>

                    <!-- INFO: より美しい属性フィールド -->
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="form.element"
                        :items="['火', '水', '木', '光', '闇']"
                        label="属性"
                        variant="outlined"
                        color="primary"
                        prepend-inner-icon="mdi-fire"
                        clearable
                        class="mb-4"
                      ></v-select>
                    </v-col>

                    <!-- INFO: より美しい分類フィールド -->
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="form.type"
                        :items="['恒常', '限定', 'コラボ', 'イベント']"
                        label="分類"
                        variant="outlined"
                        color="primary"
                        prepend-inner-icon="mdi-tag"
                        class="mb-4"
                      ></v-select>
                    </v-col>

                    <!-- INFO: より美しいガチャフィールド -->
                    <v-col cols="12">
                      <v-select
                        v-model="form.gacha"
                        :items="dataStore.gachaMasters"
                        item-title="name"
                        item-value="name"
                        label="排出ガチャ (限定の場合)"
                        placeholder="(限定ではない/その他)"
                        clearable
                        variant="outlined"
                        color="primary"
                        prepend-inner-icon="mdi-gift"
                        class="mb-4"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <!-- INFO: より美しいアクションボタン -->
              <v-card-actions class="pa-6 bg-grey-lighten-5">
                <v-spacer></v-spacer>
                <v-btn
                  :loading="isUpdating"
                  :disabled="!form.selectedMasterId || isUpdating"
                  @click="handleUpdateMaster"
                  color="primary"
                  size="large"
                  variant="elevated"
                  prepend-icon="mdi-content-save"
                  class="px-8"
                >
                  {{ isUpdating ? "更新中..." : "マスター情報を更新" }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script setup>
import { reactive, computed, watch, ref } from "vue";
import { databaseService } from "../../services/database.ts";
import { useDataStore } from "@/stores/data";
import { useUIStore } from "@/stores/ui";
import CharacterSelector from "../shared/CharacterSelector.vue";

// Pinia Storeを使用
const dataStore = useDataStore();
const uiStore = useUIStore();

const emit = defineEmits(["master-updated"]);

/**
 * @type {Object} フォームの検索、選択、入力データを保持するリアクティブなオブジェクト
 */
const form = reactive({
  search: "",
  selectedMasterId: null,
  no: "",
  name: "",
  element: "",
  type: "",
  gacha: "",
});

/** @type {import('vue').Ref<boolean>} 更新処理が実行中かどうかのフラグ */
const isUpdating = ref(false);

// INFO: characterMastersMapはdataStoreから直接取得するため、computed不要

// INFO: フィルタリングとプロキシ用のcomputedは不要になったため削除
// (editableMasters, selectedMasterIdProxy)

/**
 * [概要] 選択されたマスターIDが変更された際にフォームを更新する。
 * @param {string | null} newId - 新しく選択されたマスターID
 */
watch(
  () => form.selectedMasterId,
  (newId) => {
    if (!newId) {
      Object.assign(form, {
        name: "",
        no: "",
        element: "",
        type: "",
        gacha: "",
      });
      return;
    }
    // INFO: dataStoreから直接characterMastersMapを取得
    const master = dataStore.characterMastersMap.get(newId);
    if (master) {
      Object.assign(form, {
        name: master.monsterName,
        no: master.indexNumber,
        element: master.element,
        type: master.type,
        gacha: master.ejectionGacha,
      });
    }
  }
);

/**
 * [概要] マスター情報を更新する。
 */
const handleUpdateMaster = async () => {
  if (!form.selectedMasterId || !form.name)
    return alert("キャラを選択し名前を入力してください。");

  isUpdating.value = true;
  try {
    const updatedData = {
      monsterName: form.name,
      indexNumber: form.no ? Number(form.no) : 0,
      element: form.element,
      type: form.type,
      ejectionGacha: form.gacha,
    };
    await databaseService.updateCharacterMaster(
      form.selectedMasterId,
      updatedData
    );

    alert("マスター情報を更新しました。ページをリロードしてください。");
    emit("master-updated");
  } catch (e) {
    alert("更新に失敗: " + e.message);
  } finally {
    isUpdating.value = false;
  }
};
</script>
