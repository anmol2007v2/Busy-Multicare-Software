export function useLocalData<T>(key: string, defaultValue: T) {
  const get = (): T => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const set = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return { get, set };
}
