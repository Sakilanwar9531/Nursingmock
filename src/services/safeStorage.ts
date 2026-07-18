// Safe localStorage Wrapper with robust in-memory fallback for iframe & third-party storage restrictions
const inMemoryStorage: Record<string, string> = {};

export const safeLocalStorage = {
  getItem(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      console.warn(`[SafeStorage] localStorage.getItem failed for key "${key}", using fallback:`, e);
      return inMemoryStorage[key] || null;
    }
  },

  setItem(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`[SafeStorage] localStorage.setItem failed for key "${key}", using fallback:`, e);
      inMemoryStorage[key] = value;
    }
  },

  removeItem(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.warn(`[SafeStorage] localStorage.removeItem failed for key "${key}", using fallback:`, e);
      delete inMemoryStorage[key];
    }
  },

  clear(): void {
    try {
      window.localStorage.clear();
    } catch (e) {
      console.warn("[SafeStorage] localStorage.clear failed, using fallback:", e);
      for (const key in inMemoryStorage) {
        delete inMemoryStorage[key];
      }
    }
  }
};
