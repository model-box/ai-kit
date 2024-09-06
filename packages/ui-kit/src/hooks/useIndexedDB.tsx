import { useState, useEffect } from 'react';
import { get, add, save, remove, clear } from '../utils/indexedDB';

export const useIndexedDB = (storageKey: string) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await get(storageKey);
      setData(result);
    };
    fetchData();
  }, [storageKey]);

  const addItem = async (item: any) => {
    const newItems = await add(storageKey, item);
    setData(newItems);
  };

  const updateItems = async (items: any[]) => {
    const newItems = await save(storageKey, items);
    setData(newItems);
  };

  const removeItem = async (item: any) => {
    const newItems = await remove(storageKey, item);
    setData(newItems);
  };

  const clearItems = async () => {
    const newItems = await clear(storageKey);
    setData(newItems);
  };

  return { data, add: addItem, remove: removeItem, update: updateItems, clear: clearItems };
};
