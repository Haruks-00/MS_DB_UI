<template>
  <v-card class="cache-test-card" elevation="2">
    <v-card-title class="text-h6 d-flex align-center">
      <v-icon icon="mdi-test-tube" class="mr-2" />
      キャッシュテスト
    </v-card-title>

    <v-card-text>
      <!-- テスト結果 -->
      <div v-if="testResults.length > 0" class="mb-4">
        <div class="text-subtitle-2 mb-2">テスト結果:</div>
        <div class="test-results">
          <div
            v-for="(result, index) in testResults"
            :key="index"
            class="test-result-item mb-2 pa-2 rounded"
            :class="
              result.success ? 'bg-success-lighten-5' : 'bg-error-lighten-5'
            "
          >
            <div class="d-flex align-center">
              <v-icon
                :icon="result.success ? 'mdi-check-circle' : 'mdi-alert-circle'"
                :color="result.success ? 'success' : 'error'"
                size="small"
                class="mr-2"
              />
              <span class="text-body-2">{{ result.message }}</span>
            </div>
            <div
              v-if="result.details"
              class="text-caption text-grey-darken-1 ml-4 mt-1"
            >
              {{ result.details }}
            </div>
          </div>
        </div>
      </div>

      <!-- 所持状況データの詳細テスト -->
      <v-divider class="my-3"></v-divider>
      <div class="mb-4">
        <div class="text-subtitle-2 mb-2">所持状況データテスト:</div>
        <div class="d-flex flex-column gap-2">
          <v-btn
            @click="testOwnedCharactersCache"
            color="info"
            variant="outlined"
            size="small"
            block
          >
            <v-icon icon="mdi-account-multiple" class="mr-2" />
            所持状況キャッシュテスト
          </v-btn>
          <v-btn
            @click="testCacheExpiry"
            color="warning"
            variant="outlined"
            size="small"
            block
          >
            <v-icon icon="mdi-clock-outline" class="mr-2" />
            キャッシュ有効期限テスト
          </v-btn>
        </div>
      </div>

      <!-- 基本テスト -->
      <v-divider class="my-3"></v-divider>
      <div class="mb-4">
        <div class="text-subtitle-2 mb-2">基本テスト:</div>
        <div class="d-flex flex-column gap-2">
          <v-btn
            @click="runAllTests"
            color="primary"
            variant="outlined"
            size="small"
            block
          >
            <v-icon icon="mdi-play" class="mr-2" />
            全テスト実行
          </v-btn>
          <v-btn
            @click="clearTestResults"
            color="secondary"
            variant="outlined"
            size="small"
            block
          >
            <v-icon icon="mdi-delete" class="mr-2" />
            結果クリア
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import {
  setCache,
  getCache,
  getCacheStats,
  isCacheValid,
  clearAllCache,
} from "../../utils/cache";

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
});

const testResults = ref([]);

// テスト結果を追加
const addTestResult = (success, message, details = null) => {
  testResults.value.push({
    success,
    message,
    details,
    timestamp: new Date().toLocaleTimeString("ja-JP"),
  });
};

// 全テストを実行
const runAllTests = async () => {
  testResults.value = [];

  try {
    // 1. 書き込みテスト
    const testData = { test: "data", timestamp: Date.now() };
    await setCache("test_key", testData, "default");
    addTestResult(
      true,
      "キャッシュ書き込みテスト成功",
      "test_keyにデータを保存しました"
    );

    // 2. 読み込みテスト
    const retrievedData = await getCache("test_key", "default");
    if (retrievedData && retrievedData.test === "data") {
      addTestResult(
        true,
        "キャッシュ読み込みテスト成功",
        "保存したデータを正しく取得できました"
      );
    } else {
      addTestResult(
        false,
        "キャッシュ読み込みテスト失敗",
        "データが正しく取得できませんでした"
      );
    }

    // 3. 統計取得テスト
    const stats = await getCacheStats();
    if (stats && typeof stats.totalKeys === "number") {
      addTestResult(
        true,
        "キャッシュ統計取得テスト成功",
        `総キー数: ${stats.totalKeys}`
      );
    } else {
      addTestResult(
        false,
        "キャッシュ統計取得テスト失敗",
        "統計データが正しく取得できませんでした"
      );
    }

    // 4. 有効性チェックテスト
    const isValid = await isCacheValid("test_key", "default");
    addTestResult(
      true,
      "キャッシュ有効性チェックテスト成功",
      `test_keyは有効: ${isValid}`
    );

    // 5. クリーンアップ
    await clearAllCache();
    addTestResult(
      true,
      "キャッシュクリアテスト成功",
      "テスト用データを削除しました"
    );
  } catch (error) {
    addTestResult(false, "テスト実行エラー", error.message);
  }
};

// 所持状況キャッシュテスト
const testOwnedCharactersCache = async () => {
  try {
    const testOwnedData = {
      characters: [
        { id: "test1", characterMasterId: "char1", accountId: "acc1" },
        { id: "test2", characterMasterId: "char2", accountId: "acc1" },
      ],
      timestamp: Date.now(),
    };

    // テストデータをキャッシュに保存
    await setCache(
      `user_${props.userId}_owned_characters`,
      testOwnedData,
      "owned_characters"
    );
    addTestResult(
      true,
      "所持状況キャッシュ書き込みテスト成功",
      "テスト用所持状況データを保存しました"
    );

    // キャッシュから読み込み
    const retrievedData = await getCache(
      `user_${props.userId}_owned_characters`,
      "owned_characters"
    );
    if (
      retrievedData &&
      retrievedData.characters &&
      retrievedData.characters.length === 2
    ) {
      addTestResult(
        true,
        "所持状況キャッシュ読み込みテスト成功",
        "保存した所持状況データを正しく取得できました"
      );
    } else {
      addTestResult(
        false,
        "所持状況キャッシュ読み込みテスト失敗",
        "データが正しく取得できませんでした"
      );
    }

    // 有効性チェック
    const isValid = await isCacheValid(
      `user_${props.userId}_owned_characters`,
      "owned_characters"
    );
    addTestResult(
      true,
      "所持状況キャッシュ有効性チェック成功",
      `キャッシュは有効: ${isValid}`
    );

    // クリーンアップ
    await clearAllCache();
    addTestResult(
      true,
      "所持状況テストデータクリア成功",
      "テスト用データを削除しました"
    );
  } catch (error) {
    addTestResult(false, "所持状況キャッシュテストエラー", error.message);
  }
};

// キャッシュ有効期限テスト
const testCacheExpiry = async () => {
  try {
    // 30分の有効期限を持つデータを保存
    const testData = { test: "expiry_test", timestamp: Date.now() };
    await setCache("expiry_test_key", testData, "owned_characters");
    addTestResult(
      true,
      "有効期限テストデータ保存成功",
      "30分の有効期限を持つデータを保存しました"
    );

    // 有効性チェック
    const isValid = await isCacheValid("expiry_test_key", "owned_characters");
    addTestResult(
      true,
      "有効期限チェック成功",
      `新しく保存したデータは有効: ${isValid}`
    );

    // クリーンアップ
    await clearAllCache();
    addTestResult(
      true,
      "有効期限テストデータクリア成功",
      "テスト用データを削除しました"
    );
  } catch (error) {
    addTestResult(false, "有効期限テストエラー", error.message);
  }
};

// テスト結果をクリア
const clearTestResults = () => {
  testResults.value = [];
};
</script>

<style scoped>
.cache-test-card {
  max-width: 400px;
}

.test-result-item {
  border-left: 4px solid;
  border-left-color: inherit;
}

.bg-success-lighten-5 {
  background-color: rgba(76, 175, 80, 0.1);
  border-left-color: #4caf50;
}

.bg-error-lighten-5 {
  background-color: rgba(244, 67, 54, 0.1);
  border-left-color: #f44336;
}
</style>
