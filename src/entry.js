// render header(Model.methods() + View.methods()) + go to #form hash (Router.init())
import './main.css';
import { model } from './model';
import { templates } from './templates';
import { view } from './view';
import { router } from './router';

document.body.innerHTML = view.render(templates.header);
function openDB() {
  if (!model.indexedDBOk) {
    console.log('window.indexedDB - false')
    return false;
  }
  const openRequest = indexedDB.open("oleksawn", 1);
  openRequest.onupgradeneeded = function (e) {
    const thisDB = e.target.result;
    // create store "players"
    if (!thisDB.objectStoreNames.contains("players")) {
      const playersStore = thisDB.createObjectStore("players", { autoIncrement: true });
      playersStore.createIndex("score_idx", "score", { unique: false });
    }
  }
  openRequest.onsuccess = function (e) {
    console.log("running DB onsuccess");
    model.db = e.target.result;
    router.changePageByHash();
  }
  openRequest.onerror = function (e) {
    console.log("running DB onerror");
  }
  return true;
}
openDB();
