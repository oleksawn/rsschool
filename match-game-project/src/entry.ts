// render header(Model.methods() + View.methods()) + go to #form hash (Router.init())
import './main.css';
import { model } from './model';
import { router } from './router';


function openDB() {
  if (!model.indexedDBOk) {
    console.log('window.indexedDB - false')
    return false;
  }
  const openRequest: IDBOpenDBRequest  = indexedDB.open("oleksawn", 1);
  openRequest.onupgradeneeded = function (e) {
    const thisDB: IDBDatabase = (e.target as IDBOpenDBRequest).result;
    // create store "players"
    if (!thisDB.objectStoreNames.contains("players")) {
      const playersStore: IDBObjectStore = thisDB.createObjectStore("players", { autoIncrement: true });
      playersStore.createIndex("score_idx", "score", { unique: false });
    }
  }
  openRequest.onsuccess = function (e) {
    console.log("running DB onsuccess");
    model.db = (e.target as IDBOpenDBRequest).result;
    router.changePageByHash();
  }
  openRequest.onerror = function (e) {
    console.log("running DB onerror");
  }
  return true;
}
openDB();
