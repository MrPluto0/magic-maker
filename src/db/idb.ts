/**
 * IndexedDB 薄封装
 *
 * store 划分：
 * - projects：项目 JSON（keyPath: id）
 * - meta：键值元数据（当前项目指针、导出计数等）
 * - blobs：二进制占位（当前 OPFS 承担媒体二进制，此 store 预留给
 *   无法写入 OPFS 的场景，如导出计数快照附带的小文件）
 */

const DB_NAME = "magic-maker";
const DB_VERSION = 1;

export const PROJECT_STORE = "projects";
export const META_STORE = "meta";
export const BLOB_STORE = "blobs";

let dbPromise: Promise<IDBDatabase> | null = null;

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) {
    return dbPromise;
  }
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(PROJECT_STORE)) {
        db.createObjectStore(PROJECT_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE);
      }
      if (!db.objectStoreNames.contains(BLOB_STORE)) {
        db.createObjectStore(BLOB_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      dbPromise = null;
      reject(request.error);
    };
  });
  return dbPromise;
}

function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore<T>(
  storeName: string,
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest | void
): Promise<T> {
  const db = await openDB();
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);
    let result: unknown;
    const request = fn(store);
    if (request) {
      request.onsuccess = () => {
        result = request.result;
      };
    }
    tx.oncomplete = () => resolve(result as T);
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

/** 读取全部项目记录 */
export async function loadProjects<T = unknown>(): Promise<T[]> {
  return withStore<T[]>(PROJECT_STORE, "readonly", (store) => store.getAll());
}

/** 写入（put）单条项目记录 */
export async function saveProjectRecord<T extends { id: string }>(
  record: T
): Promise<void> {
  await withStore(PROJECT_STORE, "readwrite", (store) => store.put(record));
}

/** 删除单条项目记录 */
export async function deleteProjectRecord(id: string): Promise<void> {
  await withStore(PROJECT_STORE, "readwrite", (store) => store.delete(id));
}

/** 读取 meta 键值 */
export async function getMeta<T = unknown>(key: string): Promise<T | undefined> {
  return withStore<T | undefined>(META_STORE, "readonly", (store) =>
    store.get(key)
  );
}

/** 写入 meta 键值 */
export async function setMeta(key: string, value: unknown): Promise<void> {
  await withStore(META_STORE, "readwrite", (store) => store.put(value, key));
}

/** 读取二进制 */
export async function getBlob(key: string): Promise<Blob | undefined> {
  return withStore<Blob | undefined>(BLOB_STORE, "readonly", (store) =>
    store.get(key)
  );
}

/** 写入二进制 */
export async function putBlob(key: string, blob: Blob): Promise<void> {
  await withStore(BLOB_STORE, "readwrite", (store) => store.put(blob, key));
}
