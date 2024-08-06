const storage = {
  /**
   * Retrieves a value from localStorage by its key, and parses it as type `T`.
   * @param key The key to look up in localStorage.
   * @returns The parsed value as type `T`, or `null` if no value is found or an error occurs.
   * @template T The type of the value to parse from localStorage. Defaults to `unknown`.
   */
  getItem<T = unknown>(key: string): T | null {
    try {
      const value = window.localStorage.getItem(key);
      if (!value) return null;
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(
        `Error parsing value from localStorage for key "${key}":`,
        error
      );
      return null;
    }
  },

  /**
   * Saves a value to localStorage with the given key.
   * @param key The key to use to store the value in localStorage.
   * @param value The value to save to localStorage. This value will be stringified.
   */
  setItem(key: string, value: unknown): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(
        `Error saving value to localStorage for key "${key}":`,
        error
      );
    }
  },

  /**
   * Removes a value from localStorage by its key.
   * @param key The key to remove from localStorage.
   */
  removeItem(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(
        `Error removing value from localStorage for key "${key}":`,
        error
      );
    }
  },

  /**
   * Clears all values from localStorage.
   */
  clear(): void {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

export default storage;
