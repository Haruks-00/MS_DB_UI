<template>
  <div>
    <h2>所持キャラクター追加</h2>
    <v-form @submit.prevent="handleAddCharacter">
      <v-container class="pa-0">
        <v-row>
          <v-col cols="12">
            <!-- INFO: 検索ボックスをv-text-fieldに置き換え -->
            <v-text-field
              v-model="search"
              label="キャラクター名で検索"
              variant="outlined"
              clearable
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <!-- 
              INFO: リストボックスはv-listで表現します。
              v-cardで囲むことで、境界線と高さを設定しやすくなります。
            -->
            <v-card variant="outlined">
              <v-list
                v-model:selected="selectedMasterIdProxy"
                style="height: 400px; overflow-y: auto"
              >
                <v-list-item
                  v-for="master in addableCharacters"
                  :key="master.id"
                  :value="master.id"
                >
                  <v-list-item-title>
                    [{{ master.indexNumber || "?" }}] {{ master.monsterName }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    所持数: {{ getOwnedCountForMaster(master.id) }} / 2
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn
              :loading="isAdding"
              :disabled="!selectedMasterId || isAdding"
              @click="handleAddCharacter"
              color="primary"
              size="large"
              block
            >
              {{
                isAdding ? "追加中..." : "このキャラクターを所持リストに追加"
              }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import firebase from "firebase/compat/app"; // INFO: serverTimestampのために必要
import { databaseService } from "../../services/database.js";

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
const search = ref("");
const selectedMasterId = ref(null);
const isAdding = ref(false);

/**
 * [概要] v-listのv-model(配列)と、既存のロジック(文字列)の差異を吸収するプロキシ。
 * @note INFO: v-listのv-model:selectedは選択された項目のvalueを配列で返します。
 *       このプロパティが、その配列と単一のID(文字列)を相互に変換します。
 */
const selectedMasterIdProxy = computed({
  get() {
    return selectedMasterId.value ? [selectedMasterId.value] : [];
  },
  set(value) {
    selectedMasterId.value = value[0] || null;
  },
});

/**
 * [概要] 検索条件と所持状況に基づき、追加可能なキャラクターのリストを返す。
 * @returns {Array<Object>} 追加可能なキャラクターの配列
 */
const addableCharacters = computed(() => {
  if (!props.selectedAccountId) return [];

  const lowerSearch = search.value.toLowerCase();
  return props.characterMasters.filter((master) => {
    const isNotFull = getOwnedCountForMaster(master.id) < 2;
    const matchesSearch =
      !lowerSearch || master.monsterName.toLowerCase().includes(lowerSearch);
    return isNotFull && matchesSearch;
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
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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
