<template>
  <div class="pa-6">
    <!-- INFO: より洗練された見出しデザイン -->
    <div class="d-flex align-center mb-6">
      <v-icon
        icon="mdi-account-plus"
        size="32"
        color="primary"
        class="mr-3"
      ></v-icon>
      <h2 class="text-h4 font-weight-bold text-primary">
        キャラクターマスター新規追加
      </h2>
    </div>

    <!-- INFO: より美しいフォーム -->
    <v-form @submit.prevent="handleSaveMaster">
      <v-card elevation="3" rounded="lg">
        <v-card-title class="bg-primary text-white pa-4">
          <v-icon icon="mdi-account-plus" class="mr-2"></v-icon>
          新規キャラクター情報
        </v-card-title>

        <v-card-text class="pa-6">
          <v-container>
            <v-row>
              <!-- INFO: より美しい図鑑番号フィールド -->
              <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="masterData.no"
                  label="図鑑番号"
                  type="number"
                  placeholder="例: 1234"
                  variant="outlined"
                  color="primary"
                  prepend-inner-icon="mdi-numeric"
                  class="mb-4"
                ></v-text-field>
              </v-col>

              <!-- INFO: より美しいキャラクター名フィールド -->
              <v-col cols="12" md="6">
                <v-text-field
                  v-model.trim="masterData.name"
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
                  v-model="masterData.element"
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
                  v-model="masterData.type"
                  :items="['恒常', '限定', 'コラボ', 'α']"
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
                  v-model="masterData.gacha"
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
            :loading="isSaving"
            :disabled="!masterData.name || isSaving"
            @click="handleSaveMaster"
            color="primary"
            size="large"
            variant="elevated"
            prepend-icon="mdi-content-save"
            class="px-8"
          >
            {{ isSaving ? "追加中..." : "マスターリストに新規追加" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { databaseService } from "../../services/database";
import { useDataStore } from "@/stores/data";
import { useUIStore } from "@/stores/ui";

// Pinia Storeを使用
const dataStore = useDataStore();
const uiStore = useUIStore();

/**
 * [概要] 親にマスターデータが追加されたことを通知するイベント。
 */
const emit = defineEmits(["master-added"]);

/**
 * @type {Object} フォームの入力データを保持するリアクティブなオブジェクト。
 * @note INFO: 複数のプロパティを持つオブジェクトは `reactive` を使うと便利です。
 */
const masterData = reactive({
  no: "",
  name: "",
  element: "",
  type: "恒常",
  gacha: "",
});

/** @type {import('vue').Ref<boolean>} 保存処理が実行中かどうかのフラグ */
const isSaving = ref(false);

/**
 * [概要] マスターデータをDBに保存し、完了後に親に通知する。
 */
const handleSaveMaster = async () => {
  if (!masterData.name) return alert("キャラクター名は必須です。");

  isSaving.value = true;
  try {
    const newData = {
      indexNumber: masterData.no ? Number(masterData.no) : 0,
      monsterName: masterData.name,
      element: masterData.element || "",
      type: masterData.type || "恒常",
      ejectionGacha: masterData.gacha || "",
    };
    await databaseService.addCharacterMaster(newData);

    // NOTE: DB追加成功後、親コンポーネントに通知する
    alert("マスターを追加しました。ページをリロードして反映してください。");
    emit("master-added");
  } catch (e) {
    alert("エラー: " + e.message);
  } finally {
    isSaving.value = false;
  }
};
</script>
