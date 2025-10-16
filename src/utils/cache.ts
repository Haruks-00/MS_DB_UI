/**
 * データキャッシュ管理システム
 * ローカルストレージを使用してデータをキャッシュし、
 * 初期読み込み時間を短縮します
 */

// キャッシュの有効期限（24時間）
const CACHE_EXPIRY_HOURS = 24;
const CACHE_PREFIX = "ms_db_cache_";

// データタイプの定義
export type CacheDataType =
  | "accounts"
  | "character_masters"
  | "item_masters"
  | "gacha_masters"
  | "teams"
  | "owned_characters";

// データタイプ別の有効期限設定（時間単位）
const CACHE_EXPIRY_CONFIG: Record<CacheDataType | "default", number> = {
  accounts: 24, // アカウント情報は24時間
  character_masters: 168, // キャラクターマスターは1週間
  item_masters: 168, // アイテムマスターは1週間
  gacha_masters: 168, // ガチャマスターは1週間
  teams: 1, // チーム情報は1時間
  owned_characters: 0.5, // 所持キャラクターは30分（より頻繁に更新）
  default: 24, // デフォルトは24時間
};

/**
 * キャッシュデータの構造
 */
interface CacheData<T = unknown> {
  data: T;
  timestamp: number;
  version: string;
}

/**
 * キャッシュ統計情報
 */
export interface CacheStats {
  totalKeys: number;
  totalSize: number;
  expiredKeys: number;
  validKeys: number;
}

/**
 * キャッシュキーの生成
 * @param userId - ユーザーID
 * @param dataType - データタイプ
 * @returns キャッシュキー
 */
const generateCacheKey = (userId: string, dataType: string): string => {
  return `${CACHE_PREFIX}${userId}_${dataType}`;
};

/**
 * ローカルストレージにデータをキャッシュ
 * @param key - キャッシュキー
 * @param data - キャッシュするデータ
 * @param version - データバージョン
 */
export const setCache = <T = unknown>(
  key: string,
  data: T,
  version: string = "1.0"
): void => {
  try {
    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now(),
      version,
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
    if (import.meta.env.DEV) {
      console.log(`Cache set: ${key}`);
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("Cache set error:", error);
    }
  }
};

/**
 * ローカルストレージからキャッシュデータを取得
 * @param key - キャッシュキー
 * @param dataType - データタイプ（有効期限判定用）
 * @returns キャッシュされたデータ、またはnull
 */
export const getCache = <T = unknown>(
  key: string,
  dataType: CacheDataType | null = null
): T | null => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const cacheData: CacheData<T> = JSON.parse(cached);
    const now = Date.now();

    // データタイプに応じた有効期限を取得
    const expiryHours = dataType
      ? CACHE_EXPIRY_CONFIG[dataType] || CACHE_EXPIRY_CONFIG.default
      : CACHE_EXPIRY_HOURS;
    const expiryTime = cacheData.timestamp + expiryHours * 60 * 60 * 1000;

    // キャッシュが期限切れかチェック
    if (now > expiryTime) {
      localStorage.removeItem(key);
      if (import.meta.env.DEV) {
        console.log(`Cache expired: ${key} (${expiryHours}h)`);
      }
      return null;
    }

    if (import.meta.env.DEV) {
      console.log(`Cache hit: ${key} (${expiryHours}h remaining)`);
    }
    return cacheData.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("Cache get error:", error);
    }
    return null;
  }
};

/**
 * 特定のユーザーのデータをキャッシュ
 * @param userId - ユーザーID
 * @param dataType - データタイプ
 * @param data - キャッシュするデータ
 * @param version - データバージョン
 */
export const setUserCache = <T = unknown>(
  userId: string,
  dataType: string,
  data: T,
  version: string = "1.0"
): void => {
  const key = generateCacheKey(userId, dataType);
  setCache(key, data, version);
};

/**
 * 特定のユーザーのキャッシュデータを取得
 * @param userId - ユーザーID
 * @param dataType - データタイプ
 * @returns キャッシュされたデータ、またはnull
 */
export const getUserCache = <T = unknown>(
  userId: string,
  dataType: CacheDataType
): T | null => {
  const key = generateCacheKey(userId, dataType);
  return getCache<T>(key, dataType);
};

/**
 * 特定のユーザーのキャッシュを削除
 * @param userId - ユーザーID
 * @param dataType - データタイプ
 */
export const clearUserCache = (userId: string, dataType: string): void => {
  try {
    const key = generateCacheKey(userId, dataType);
    localStorage.removeItem(key);
    if (import.meta.env.DEV) {
      console.log(`Cache cleared: ${key}`);
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("Cache clear error:", error);
    }
  }
};

/**
 * 特定のユーザーの全キャッシュを削除
 * @param userId - ユーザーID
 */
export const clearAllUserCache = (userId: string): void => {
  try {
    const keys = Object.keys(localStorage);
    const userKeys = keys.filter((key) =>
      key.startsWith(`${CACHE_PREFIX}${userId}_`)
    );

    userKeys.forEach((key) => {
      localStorage.removeItem(key);
      if (import.meta.env.DEV) {
        console.log(`Cache cleared: ${key}`);
      }
    });
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("Clear all user cache error:", error);
    }
  }
};

/**
 * キャッシュの有効性をチェック
 * @param key - キャッシュキー
 * @param dataType - データタイプ（有効期限判定用）
 * @returns キャッシュが有効かどうか
 */
export const isCacheValid = (
  key: string,
  dataType: CacheDataType | null = null
): boolean => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return false;

    const cacheData: CacheData = JSON.parse(cached);
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
 * @returns キャッシュの統計情報
 */
export const getCacheStats = (): CacheStats => {
  try {
    const keys = Object.keys(localStorage);
    const cacheKeys = keys.filter((key) => key.startsWith(CACHE_PREFIX));

    const stats: CacheStats = {
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
        const dataType = keyParts.slice(1).join("_") as CacheDataType;

        if (isCacheValid(key, dataType)) {
          stats.validKeys++;
        } else {
          stats.expiredKeys++;
        }
      }
    });

    return stats;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("Get cache stats error:", error);
    }
    return { totalKeys: 0, totalSize: 0, expiredKeys: 0, validKeys: 0 };
  }
};

/**
 * 全キャッシュをクリア（デバッグ用）
 */
export const clearAllCache = (): void => {
  try {
    const keys = Object.keys(localStorage);
    const cacheKeys = keys.filter((key) => key.startsWith(CACHE_PREFIX));

    cacheKeys.forEach((key) => {
      localStorage.removeItem(key);
    });

    if (import.meta.env.DEV) {
      console.log(`All cache cleared: ${cacheKeys.length} keys`);
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("Clear all cache error:", error);
    }
  }
};
