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
        所持キャラクター追加
      </h2>
    </div>

    <!-- INFO: より美しいフォーム -->
    <v-form @submit.prevent="handleAddCharacter">
      <v-card elevation="3" rounded="lg">
        <v-card-title class="bg-primary text-white pa-4">
          <v-icon icon="mdi-account-search" class="mr-2"></v-icon>
          キャラクター選択
        </v-card-title>

        <v-card-text class="pa-6">
          <v-container class="pa-0">
            <v-row>
              <v-col cols="12">
                <!-- INFO: より美しいキャラクターセレクター -->
                <div class="mb-4">
                  <div class="d-flex align-center mb-3">
                    <v-icon
                      icon="mdi-account-search"
                      color="primary"
                      class="mr-2"
                    ></v-icon>
                    <h6 class="text-h6 font-weight-medium">
                      追加するキャラクター
                    </h6>
                  </div>
                  <CharacterSelector
                    v-model="selectedMasterId"
                    :items="addableCharacters"
                    :item-title="formatCharacterForSelection"
                    label="追加するキャラクター名で検索"
                    list-height="400px"
                    no-data-text="追加できるキャラクターがいません"
                    color="primary"
                    prepend-inner-icon="mdi-account-search"
                  />
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <!-- INFO: より美しいアクションボタン -->
        <v-card-actions class="pa-6 bg-grey-lighten-5">
          <v-spacer></v-spacer>
          <v-btn
            :loading="isAdding"
            :disabled="!selectedMasterId || isAdding"
            @click="handleAddCharacter"
            color="primary"
            size="large"
            variant="elevated"
            prepend-icon="mdi-account-plus"
            class="px-8"
          >
            {{ isAdding ? "追加中..." : "このキャラクターを所持リストに追加" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { serverTimestamp } from "firebase/firestore";
import { databaseService } from "../../services/database.js";
import CharacterSelector from "../shared/CharacterSelector.vue"; // INFO: 共通コンポーネントをインポート

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
const emit = defineEmits(["character-added"]);

// INFO: data() は ref() を使ってリアクティブな状態として定義します
const selectedMasterId = ref(null);
const isAdding = ref(false);

/**
 * [概要] 検索条件と所持状況に基づき、追加可能なキャラクターのリストを返す。
 * @returns {Array<Object>} 追加可能なキャラクターの配列
 */
const addableCharacters = computed(() => {
  if (!props.selectedAccountId) return [];
  return props.characterMasters.filter((master) => {
    return getOwnedCountForMaster(master.id) < 2;
  });
});

/**
 * [概要] 選択中のアカウントが変更されたら、選択中のキャラをリセットする。
 * @note INFO: watchオプションはwatch関数に置き換わります
 */
watch(
  () => props.selectedAccountId,
  () => {
    selectedMasterId.value = null;
  }
);

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
 * [概要] CharacterSelectorに渡すための表示フォーマット関数。
 * @note INFO: テンプレート内のロジックをスクリプトに分離し、可読性を向上させます。
 * @param {object} master - キャラクターマスターオブジェクト
 * @returns {string} 表示用の文字列
 */
const formatCharacterForSelection = (master) => {
  const ownedCount = getOwnedCountForMaster(master.id);
  return `[${master.indexNumber || "?"}] ${
    master.monsterName
  } | 所持数: ${ownedCount} / 2`;
};

/**
 * [概要] キャラクター追加ボタンがクリックされた際の処理。
 */
const handleAddCharacter = async () => {
  if (!selectedMasterId.value || !props.selectedAccountId)
    return alert("追加するキャラとアカウントを選択してください。");
  if (getOwnedCountForMaster(selectedMasterId.value) >= 2)
    return alert("このキャラは既に2体所持しています。");

  isAdding.value = true;
  try {
    const master = props.characterMastersMap.get(selectedMasterId.value);
    if (!master) throw new Error("キャラのマスター情報が見つかりません。");

    const newOwnedCharData = {
      characterMasterId: selectedMasterId.value,
      monsterName: master.monsterName,
      items: [],
      createdAt: serverTimestamp(),
    };

    const docRef = await databaseService.addOwnedCharacter(
      props.selectedAccountId,
      newOwnedCharData
    );

    const newLocalChar = {
      ...newOwnedCharData,
      id: docRef.id,
      createdAt: { toDate: () => new Date() },
    };
    emit("character-added", {
      accountId: props.selectedAccountId,
      newCharacter: newLocalChar,
    });

    alert(`「${master.monsterName}」を所持リストに追加しました。`);
    selectedMasterId.value = null;
  } catch (error) {
    console.error("キャラ追加失敗:", error);
    alert("エラー: " + error.message);
  } finally {
    isAdding.value = false;
  }
};
</script>
