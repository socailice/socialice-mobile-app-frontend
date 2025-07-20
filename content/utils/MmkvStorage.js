import { MMKV } from 'react-native-mmkv';

const mmkv = new MMKV();

const mmkvStorage = {
  setItem: (key, value) => {
    const val = typeof value === 'string' ? value : JSON.stringify(value);
    mmkv.set(key, val);
  },

  getItem: (key) => {
    const val = mmkv.getString(key);
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  },

  removeItem: (key) => {
    mmkv.delete(key);
  },

  clearAll: () => {
    mmkv.clearAll();
  }
};

export default mmkvStorage;
