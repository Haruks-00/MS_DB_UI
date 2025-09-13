/**
 * データキャッシュ管理システム
 * ローカルストレージとIndexedDBを使用してデータをキャッシュし、
 * 初期読み込み時間を短縮します
 */

// キャッシュの有効期限（24時間）
const CACHE_EXPIRY_HOURS = 24;
const CACHE_PREFIX = "ms_db_cache_";

// データタイプ別の有効期限設定
const CACHE_EXPIRY_CONFIG = {
  accounts: 24, // アカウント情報は24時間
  character_masters: 168, // キャラクターマスターは1週間
  item_masters: 168, // アイテムマスターは1週間
  gacha_masters: 168, // ガチャマスターは1週間
  teams: 1, // チーム情報は1時間
  owned_characters: 0.5, // 所持キャラクターは30分（より頻繁に更新）
  default: 24, // デフォルトは24時間
};

/**
 * キャッシュキーの生成
 * @param {string} userId - ユーザーID
 * @param {string} dataType - データタイプ
 * @returns {string} キャッシュキー
 */
const generateCacheKey = (userId, dataType) => {
  return `${CACHE_PREFIX}${userId}_${dataType}`;
};

/**
 * キャッシュデータの構造
 * @typedef {Object} CacheData
 * @property {any} data - キャッシュされたデータ
 * @property {number} timestamp - キャッシュされた時刻（Unix timestamp）
 * @property {string} version - データバージョン
 */

/**
 * ローカルストレージにデータをキャッシュ
 * @param {string} key - キャッシュキー
 * @param {any} data - キャッシュするデータ
 * @param {string} version - データバージョン
 */
export const setCache = (key, data, version = "1.0") => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
      version,
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
    console.log(`Cache set: ${key}`);
  } catch (error) {
    console.error("Cache set error:", error);
  }
};

/**
 * ローカルストレージからキャッシュデータを取得
 * @param {string} key - キャッシュキー
 * @param {string} dataType - データタイプ（有効期限判定用）
 * @returns {any|null} キャッシュされたデータ、またはnull
 */
export const getCache = (key, dataType = null) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const cacheData = JSON.parse(cached);
    const now = Date.now();

    // データタイプに応じた有効期限を取得
    const expiryHours = dataType
      ? CACHE_EXPIRY_CONFIG[dataType] || CACHE_EXPIRY_CONFIG.default
      : CACHE_EXPIRY_HOURS;
    const expiryTime = cacheData.timestamp + expiryHours * 60 * 60 * 1000;

    // キャッシュが期限切れかチェック
    if (now > expiryTime) {
      localStorage.removeItem(key);
      console.log(`Cache expired: ${key} (${expiryHours}h)`);
      return null;
    }

    console.log(`Cache hit: ${key} (${expiryHours}h remaining)`);
    return cacheData.data;
  } catch (error) {
    console.error("Cache get error:", error);
    return null;
  }
};

/**
 * 特定のユーザーのデータをキャッシュ
 * @param {string} userId - ユーザーID
 * @param {string} dataType - データタイプ
 * @param {any} data - キャッシュするデータ
 * @param {string} version - データバージョン
 */
export const setUserCache = (userId, dataType, data, version = "1.0") => {
  const key = generateCacheKey(userId, dataType);
  setCache(key, data, version);
};

/**
 * 特定のユーザーのキャッシュデータを取得
 * @param {string} userId - ユーザーID
 * @param {string} dataType - データタイプ
 * @returns {any|null} キャッシュされたデータ、またはnull
 */
export const getUserCache = (userId, dataType) => {
  const key = generateCacheKey(userId, dataType);
  return getCache(key, dataType);
};

/**
 * 特定のユーザーのキャッシュを削除
 * @param {string} userId - ユーザーID
 * @param {string} dataType - データタイプ
 */
export const clearUserCache = (userId, dataType) => {
  try {
    const key = generateCacheKey(userId, dataType);
    localStorage.removeItem(key);
    console.log(`Cache cleared: ${key}`);
  } catch (error) {
    console.error("Cache clear error:", error);
  }
};

/**
 * 特定のユーザーの全キャッシュを削除
 * @param {string} userId - ユーザーID
 */
export const clearAllUserCache = (userId) => {
  try {
    const keys = Object.keys(localStorage);
    const userKeys = keys.filter((key) =>
      key.startsWith(`${CACHE_PREFIX}${userId}_`)
    );

    userKeys.forEach((key) => {
      localStorage.removeItem(key);
      console.log(`Cache cleared: ${key}`);
    });
  } catch (error) {
    console.error("Clear all user cache error:", error);
  }
};

/**
 * キャッシュの有効性をチェック
 * @param {string} key - キャッシュキー
 * @param {string} dataType - データタイプ（有効期限判定用）
 * @returns {boolean} キャッシュが有効かどうか
 */
export const isCacheValid = (key, dataType = null) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return false;

    const cacheData = JSON.parse(cached);
    const now = Date.now();

    // データタイプに応じた有効期限を取得
    const expiryHours = dataType
      ? CACHE_EXPIRY_CONFIG[dataType] || CACHE_EXPIRY_CONFIG.default
      : CACHE_EXPIRY_HOURS;
    const expiryTime = cacheData.timestamp + expiryHours * 60 * 60 * 1000;

    return now <= expiryTime;
  } catch (error) {
    return false;
  }
};

/**
 * キャッシュ統計情報を取得
 * @returns {Object} キャッシュの統計情報
 */
export const getCacheStats = () => {
  try {
    const keys = Object.keys(localStorage);
    const cacheKeys = keys.filter((key) => key.startsWith(CACHE_PREFIX));

    const stats = {
      totalKeys: cacheKeys.length,
      totalSize: 0,
      expiredKeys: 0,
      validKeys: 0,
    };

    cacheKeys.forEach((key) => {
      const cached = localStorage.getItem(key);
      if (cached) {
        stats.totalSize += cached.length;

        // キーからデータタイプを抽出
        const keyParts = key.replace(CACHE_PREFIX, "").split("_");
        const userId = keyParts[0];
        const dataType = keyParts.slice(1).join("_");

        if (isCacheValid(key, dataType)) {
          stats.validKeys++;
        } else {
          stats.expiredKeys++;
        }
      }
    });

    return stats;
  } catch (error) {
    console.error("Get cache stats error:", error);
    return { totalKeys: 0, totalSize: 0, expiredKeys: 0, validKeys: 0 };
  }
};

/**
 * 全キャッシュをクリア（デバッグ用）
 */
export const clearAllCache = () => {
  try {
    const keys = Object.keys(localStorage);
    const cacheKeys = keys.filter((key) => key.startsWith(CACHE_PREFIX));

    cacheKeys.forEach((key) => {
      localStorage.removeItem(key);
    });

    console.log(`All cache cleared: ${cacheKeys.length} keys`);
  } catch (error) {
    console.error("Clear all cache error:", error);
  }
};
