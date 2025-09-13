<template>
  <v-card class="cache-status-card" elevation="2">
    <v-card-title class="text-h6 d-flex align-center">
      <v-icon icon="mdi-cached" class="mr-2" />
      キャッシュ状態
    </v-card-title>

    <v-card-text>
      <!-- 基本統計 -->
      <div class="mb-4">
        <div class="d-flex justify-space-between mb-2">
          <span class="text-body-2">総キャッシュキー:</span>
          <span class="font-weight-medium">{{ stats.totalKeys }}</span>
        </div>
        <div class="d-flex justify-space-between mb-2">
          <span class="text-body-2">有効:</span>
          <span class="text-success font-weight-medium">{{
            stats.validKeys
          }}</span>
        </div>
        <div class="d-flex justify-space-between mb-2">
          <span class="text-body-2">期限切れ:</span>
          <span class="text-warning font-weight-medium">{{
            stats.expiredKeys
          }}</span>
        </div>
        <div class="d-flex justify-space-between mb-2">
          <span class="text-body-2">総サイズ:</span>
          <span class="font-weight-medium">{{
            formatSize(stats.totalSize)
          }}</span>
        </div>
      </div>

      <!-- 所持状況データの更新状態 -->
      <v-divider class="my-3"></v-divider>
      <div class="mb-4">
        <div class="text-subtitle-2 mb-2">所持状況データ</div>
        <div class="d-flex justify-space-between mb-2">
          <span class="text-body-2">最終更新:</span>
          <span class="font-weight-medium">{{
            ownedCharactersLastUpdate || "未更新"
          }}</span>
        </div>
        <div class="d-flex justify-space-between mb-2">
          <span class="text-body-2">キャッシュ状態:</span>
          <v-chip
            :color="
              ownedCharactersCacheStatus === 'valid' ? 'success' : 'warning'
            "
            size="small"
            class="text-caption"
          >
            {{ ownedCharactersCacheStatus === "valid" ? "有効" : "期限切れ" }}
          </v-chip>
        </div>
      </div>

      <!-- 操作ボタン -->
      <v-divider class="my-3"></v-divider>
      <div class="d-flex flex-column gap-2">
        <v-btn
          @click="refreshStats"
          color="primary"
          variant="outlined"
          size="small"
          block
        >
          <v-icon icon="mdi-refresh" class="mr-2" />
          統計更新
        </v-btn>
        <v-btn
          @click="clearUserCacheHandler"
          color="warning"
          variant="outlined"
          size="small"
          block
        >
          <v-icon icon="mdi-delete" class="mr-2" />
          ユーザーキャッシュ削除
        </v-btn>
        <v-btn
          @click="clearAllCacheHandler"
          color="error"
          variant="outlined"
          size="small"
          block
        >
          <v-icon icon="mdi-delete-sweep" class="mr-2" />
          全キャッシュ削除
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import {
  getCacheStats,
  clearAllCache,
  clearUserCache,
} from "../../utils/cache.js";

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
});

const stats = ref({
  totalKeys: 0,
  validKeys: 0,
  expiredKeys: 0,
  totalSize: 0,
});

const ownedCharactersLastUpdate = ref(null);
const ownedCharactersCacheStatus = ref("unknown");

// キャッシュ統計を取得
const refreshStats = async () => {
  try {
    const cacheStats = await getCacheStats();
    stats.value = cacheStats;

    // 所持状況データのキャッシュ状態を確認
    const ownedCharactersKey = `user_${props.userId}_owned_characters`;
    const ownedCharactersData = localStorage.getItem(ownedCharactersKey);

    if (ownedCharactersData) {
      try {
        const parsed = JSON.parse(ownedCharactersData);
        if (parsed.timestamp) {
          const updateTime = new Date(parsed.timestamp);
          ownedCharactersLastUpdate.value = updateTime.toLocaleString("ja-JP");

          // キャッシュの有効性を確認（30分）
          const now = Date.now();
          const cacheAge = now - updateTime.getTime();
          const isValid = cacheAge < 30 * 60 * 1000; // 30分

          ownedCharactersCacheStatus.value = isValid ? "valid" : "expired";
        }
      } catch (e) {
        console.error("所持状況データの解析エラー:", e);
        ownedCharactersCacheStatus.value = "unknown";
      }
    } else {
      ownedCharactersCacheStatus.value = "unknown";
      ownedCharactersLastUpdate.value = null;
    }
  } catch (error) {
    console.error("キャッシュ統計の取得エラー:", error);
  }
};

// ユーザーキャッシュを削除
const clearUserCacheHandler = async () => {
  try {
    await clearUserCache(props.userId);
    await refreshStats();
    console.log("ユーザーキャッシュを削除しました");
  } catch (error) {
    console.error("ユーザーキャッシュ削除エラー:", error);
  }
};

// 全キャッシュを削除
const clearAllCacheHandler = async () => {
  try {
    await clearAllCache();
    await refreshStats();
    console.log("全キャッシュを削除しました");
  } catch (error) {
    console.error("全キャッシュ削除エラー:", error);
  }
};

// サイズをフォーマット
const formatSize = (bytes) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// コンポーネントマウント時に統計を取得
onMounted(() => {
  refreshStats();
});

// 定期的に統計を更新（1分ごと）
let intervalId;
onMounted(() => {
  intervalId = setInterval(refreshStats, 60000);
});

// コンポーネントアンマウント時にインターバルをクリア
import { onUnmounted } from "vue";
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<style scoped>
.cache-status-card {
  max-width: 350px;
}
</style>
