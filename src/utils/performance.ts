/**
 * パフォーマンス最適化とメトリクス収集用のユーティリティ
 */

/**
 * 遅延ローダーのオプション
 */
export interface LazyLoaderOptions<T> {
  timeout?: number;
  retryCount?: number;
  onLoad?: (result: T) => void;
  onError?: (error: Error) => void;
}

/**
 * パフォーマンス警告の閾値設定
 */
export interface PerformanceWarningThresholds {
  loadTime?: number;
  memoryUsage?: number;
}

/**
 * パフォーマンスマーカーの管理
 */
class PerformanceTracker {
  private markers: Map<string, number>;
  private measures: Map<string, number>;

  constructor() {
    this.markers = new Map();
    this.measures = new Map();
  }

  /**
   * マーカーを開始
   */
  startMarker(name: string): void {
    this.markers.set(name, performance.now());
    performance.mark(`${name}-start`);
  }

  /**
   * マーカーを終了
   */
  endMarker(name: string): number {
    const startTime = this.markers.get(name);
    if (startTime) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);

      this.measures.set(name, duration);
      if (import.meta.env.DEV) {
        console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
      }

      return duration;
    }
    return 0;
  }

  /**
   * 測定結果を取得
   */
  getMeasure(name: string): number | undefined {
    return this.measures.get(name);
  }

  /**
   * 全測定結果を取得
   */
  getAllMeasures(): Record<string, number> {
    return Object.fromEntries(this.measures);
  }

  /**
   * 測定結果をクリア
   */
  clear(): void {
    this.markers.clear();
    this.measures.clear();
  }
}

// グローバルなパフォーマンストラッカー
export const performanceTracker = new PerformanceTracker();

/**
 * 遅延読み込みの最適化
 */
export const createLazyLoader = <T>(
  importFunc: () => Promise<T>,
  options: LazyLoaderOptions<T> = {}
): (() => Promise<T>) => {
  const {
    timeout = 5000,
    retryCount = 3,
    onLoad = () => {},
    onError = () => {},
  } = options;

  let promise: Promise<T> | null = null;
  let retries = 0;

  const load = async (): Promise<T> => {
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
        if (import.meta.env.DEV) {
          console.warn(
            `遅延読み込みに失敗しました。再試行 ${retries}/${retryCount}`
          );
        }
        promise = null;
        return load();
      }
      onError(error as Error);
      throw error;
    }
  };

  return load;
};

/**
 * リソースの事前読み込み
 */
export const preloadResource = (
  href: string,
  as: "script" | "style" | "image" | "font" = "script"
): void => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
};

/**
 * 画像の遅延読み込み
 */
export const lazyLoadImage = (img: HTMLImageElement, src: string): void => {
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

/**
 * メモリ使用量の監視
 */
export const monitorMemory = (): void => {
  // performance.memory は Chrome のみで利用可能
  const performanceWithMemory = performance as Performance & {
    memory?: {
      usedJSHeapSize: number;
      totalJSHeapSize: number;
      jsHeapSizeLimit: number;
    };
  };

  if (performanceWithMemory.memory) {
    const memory = performanceWithMemory.memory;
    if (import.meta.env.DEV) {
      console.log("メモリ使用量:", {
        used: `${Math.round(memory.usedJSHeapSize / 1048576)}MB`,
        total: `${Math.round(memory.totalJSHeapSize / 1048576)}MB`,
        limit: `${Math.round(memory.jsHeapSizeLimit / 1048576)}MB`,
      });
    }
  }
};

/**
 * パフォーマンス警告の設定
 */
export const setPerformanceWarnings = (
  thresholds: PerformanceWarningThresholds = {}
): void => {
  const { loadTime = 3000, memoryUsage = 50 } = thresholds;

  // 読み込み時間の監視
  window.addEventListener("load", () => {
    const currentLoadTime = performance.now();
    if (currentLoadTime > loadTime) {
      if (import.meta.env.DEV) {
        console.warn(
          `⚠️ 読み込み時間が長すぎます: ${currentLoadTime.toFixed(2)}ms`
        );
      }
    }
  });

  // メモリ使用量の監視
  const performanceWithMemory = performance as Performance & {
    memory?: {
      usedJSHeapSize: number;
      totalJSHeapSize: number;
      jsHeapSizeLimit: number;
    };
  };

  if (performanceWithMemory.memory) {
    setInterval(() => {
      const memory = performanceWithMemory.memory;
      if (!memory) return;

      const usagePercent =
        (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
      if (usagePercent > memoryUsage) {
        if (import.meta.env.DEV) {
          console.warn(
            `⚠️ メモリ使用量が高すぎます: ${usagePercent.toFixed(1)}%`
          );
        }
      }
    }, 10000); // 10秒ごとにチェック
  }
};
