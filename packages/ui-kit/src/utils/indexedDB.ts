const DB_NAME = 'AIKitStore';
const DB_VERSION = 1;

const randomID = () => {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

const openDB = (): Promise<IDBDatabase> => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore('data', { keyPath: 'storageKey' });
    };
  });
};

export const save = async (storageKey: string, data: any[]): Promise<any[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['data'], 'readwrite');
    const store = transaction.objectStore('data');
    const request = store.put({ storageKey, data });

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(get(storageKey));
  });
};

export const get = async (storageKey: string): Promise<any[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['data'], 'readonly');
    const store = transaction.objectStore('data');
    const request = store.get(storageKey);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      if (request.result) {
        resolve(request.result.data);
      } else {
        resolve([]);
      }
    };
  });
};

export const add = async (storageKey: string, item: any): Promise<any[]> => {
  const data = await get(storageKey);
  const newData = [
    {
      ...item,
      ckStoreKey: randomID(),
      timestamp: new Date(),
    },
    ...data,
  ];
  return save(storageKey, newData);
};

export const remove = async (storageKey: string, item: any): Promise<any[]> => {
  const data = await get(storageKey);
  const newData = data.filter((i: any) => i.ckStoreKey !== item.ckStoreKey);
  return save(storageKey, newData);
};

export const clear = async (storageKey: string): Promise<any[]> => {
  return save(storageKey, []);
};
