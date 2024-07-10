const DB_NAME = 'BikeRoutesDB';
const STORE_NAME = 'routes';
const CATALOG_STORE = 'catalog';

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 8);
    
    request.onerror = (event) => {
      console.error("Database error: " + event.target.error);
      reject("Error opening DB: " + event.target.error);
    };
    
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('version', 'version', { unique: false });
      }
      if (!db.objectStoreNames.contains(CATALOG_STORE)) {
        db.createObjectStore(CATALOG_STORE, { keyPath: 'id' });
      }
    };
  });
}

export function saveRoute(route) {
  return new Promise((resolve, reject) => {
    openDB().then(db => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(route);
      
      request.onerror = () => reject("Error saving route");
      request.onsuccess = () => resolve();
    }).catch(reject);
  });
}

export function getRoute(id) {
  return new Promise((resolve, reject) => {
    openDB().then(db => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);
      
      request.onerror = () => reject("Error getting route");
      request.onsuccess = () => resolve(request.result);
    }).catch(reject);
  });
}

export function getRouteVersion(id) {
  return new Promise((resolve, reject) => {
    openDB().then(db => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);
      
      request.onerror = () => reject("Error getting route version");
      request.onsuccess = () => resolve(request.result ? request.result.version : null);
    }).catch(reject);
  });
}

export function saveCatalog(catalog) {
  return new Promise((resolve, reject) => {
    openDB().then(db => {
      const transaction = db.transaction(CATALOG_STORE, 'readwrite');
      const store = transaction.objectStore(CATALOG_STORE);
      const request = store.put({ id: 'main', data: catalog });
      
      request.onerror = () => reject("Error saving catalog");
      request.onsuccess = () => resolve();
    }).catch(reject);
  });
}

export function getCatalog() {
  return new Promise((resolve, reject) => {
    openDB().then(db => {
      const transaction = db.transaction(CATALOG_STORE, 'readonly');
      const store = transaction.objectStore(CATALOG_STORE);
      const request = store.get('main');
      
      request.onerror = () => reject("Error getting catalog");
      request.onsuccess = () => resolve(request.result ? request.result.data : null);
    }).catch(reject);
  });
}