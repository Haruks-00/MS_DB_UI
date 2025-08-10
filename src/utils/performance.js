/**
 * パフォーマンス最適化とメトリクス収集用のユーティリティ
 */

// パフォーマンスマーカーの管理
class PerformanceTracker {
  constructor() {
    this.markers = new Map();
    this.measures = new Map();
  }

  // マーカーを開始
  startMarker(name) {
    this.markers.set(name, performance.now());
    performance.mark(`${name}-start`);
  }

  // マーカーを終了
  endMarker(name) {
    const startTime = this.markers.get(name);
    if (startTime) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);

      this.measures.set(name, duration);
      console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);

      return duration;
    }
    return 0;
  }

  // 測定結果を取得
  getMeasure(name) {
    return this.measures.get(name);
  }

  // 全測定結果を取得
  getAllMeasures() {
    return Object.fromEntries(this.measures);
  }

  // 測定結果をクリア
  clear() {
    this.markers.clear();
    this.measures.clear();
  }
}

// グローバルなパフォーマンストラッカー
export const performanceTracker = new PerformanceTracker();

// 遅延読み込みの最適化
export const createLazyLoader = (importFunc, options = {}) => {
  const {
    timeout = 5000,
    retryCount = 3,
    onLoad = () => {},
    onError = () => {},
  } = options;

  let promise = null;
  let retries = 0;

  const load = async () => {
    if (promise) return promise;

    try {
      performanceTracker.startMarker("lazy-load");
      promise = importFunc();
      const result = await promise;
      performanceTracker.endMarker("lazy-load");
      onLoad(result);
      return result;
    } catch (error) {
      retries++;
      if (retries < retryCount) {
        console.warn(
          `遅延読み込みに失敗しました。再試行 ${retries}/${retryCount}`
        );
        promise = null;
        return load();
      }
      onError(error);
      throw error;
    }
  };

  return load;
};

// リソースの事前読み込み
export const preloadResource = (href, as = "script") => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
};

// 画像の遅延読み込み
export const lazyLoadImage = (img, src) => {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = src;
          observer.unobserve(img);
        }
      });
    });
    observer.observe(img);
  } else {
    // フォールバック
    img.src = src;
  }
};

// メモリ使用量の監視
export const monitorMemory = () => {
  if ("memory" in performance) {
    const memory = performance.memory;
    console.log("メモリ使用量:", {
      used: `${Math.round(memory.usedJSHeapSize / 1048576)}MB`,
      total: `${Math.round(memory.totalJSHeapSize / 1048576)}MB`,
      limit: `${Math.round(memory.jsHeapSizeLimit / 1048576)}MB`,
    });
  }
};

// パフォーマンス警告の設定
export const setPerformanceWarnings = (thresholds = {}) => {
  const { loadTime = 3000, memoryUsage = 50 } = thresholds;

  // 読み込み時間の監視
  window.addEventListener("load", () => {
    const loadTime = performance.now();
    if (loadTime > thresholds.loadTime) {
      console.warn(`⚠️ 読み込み時間が長すぎます: ${loadTime.toFixed(2)}ms`);
    }
  });

  // メモリ使用量の監視
  if ("memory" in performance) {
    setInterval(() => {
      const memory = performance.memory;
      const usagePercent =
        (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
      if (usagePercent > thresholds.memoryUsage) {
        console.warn(
          `⚠️ メモリ使用量が高すぎます: ${usagePercent.toFixed(1)}%`
        );
      }
    }, 10000); // 10秒ごとにチェック
  }
};
