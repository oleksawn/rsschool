// methods for getting data from db
import { view } from './view';
import { templates } from './templates';

export const model = {
  isLogged: false,
  loggedGamer: {},
  indexedDBOk() {
    return "indexedDB" in window;
  },
  settingsObj: {
    difficulty: 16,
    theme: 'underwater'
  },
  db: {},
  addPlayerintoDb(data) {
    console.log('model.addPlayerIntoDb()');
    model.addPerson(data);
  },
  addPerson(person) {
    const transaction = model.db.transaction(["players"], "readwrite");
    const store = transaction.objectStore("players");
    const request = store.add(person);
    request.onerror = function (e) {
      console.log("Error", e.target.error.name);
    }
    request.onsuccess = function (e) {
      console.log("Wow! Did it");
      model.isLogged = true;
      model.loggedGamer = person;
      const loggedPlayer = document.querySelector('.loggedGamer__data');
      loggedPlayer.innerHTML = `<p class="name">${person.fname} ${person.lname}</p><p class="email">${person.email}</p>`;
      const gameNav = document.querySelector('.nav__game');
      console.log("game nav item ", gameNav);
      gameNav.classList.remove('nav__item_hidden');
    }
  },
  getBestPlayers(amount, difficulty) {
    const transaction = model.db.transaction(["players"], "readonly");
    const store = transaction.objectStore("players");
    const index = store.index("score_idx");
    let count = 0;
    const request = index.openCursor(IDBKeyRange.lowerBound(0), "prev");
    const playersArr = [];
    request.onsuccess = function (e) {
      const cursor = e.target.result;
      if (cursor && count < 10) {
        // cursor.key ** cursor.value[field]
        playersArr.push(cursor.value);
        count++;
        cursor.continue();
      }
      else {
        const page = document.getElementById('#page');
        page.innerHTML = view.render(templates.scores, playersArr);
      }
    }
  }
}
