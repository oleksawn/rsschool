// methods for getting data from db
import { view } from './view';
import { templates } from './templates';

interface Settings {
  difficulty: number;
  theme: string;
}
interface Model {
  isLogged: boolean;
  loggedGamer: { [key: string]: string };
  settings: Settings;
  indexedDBOk(): unknown;
  db: IDBDatabase;
  addPlayerintoDb(data: unknown): void;
  addPerson(person: unknown): void;
  getBestPlayers(amount: number, difficulty: number): void;
}

export const model: Model = {
  isLogged: false,
  loggedGamer: {
    fname: '',
    lname: '',
    email: '',
    score: '0'
  },
  settings: {
    theme: 'underwater',
    difficulty: 16
  },
  db: ({} as IDBDatabase),
  indexedDBOk() {
    return "indexedDB" in window;
  },
  addPlayerintoDb(data: unknown) {
    console.log('model.addPlayerIntoDb()');
    model.addPerson(data);
  },
  addPerson(person: unknown) {
    const transaction = model.db.transaction(["players"], "readwrite");
    const store = transaction.objectStore("players");
    const request = store.add(person);
    request.onerror = function () {
      console.log("Error adding into DB");
    }
    request.onsuccess = function () {
      console.log("score success added into DB");
    }
  },
  getBestPlayers(amount: number, difficulty: number) {
    const transaction = model.db.transaction(["players"], "readonly");
    const store = transaction.objectStore("players");
    const index = store.index("score_idx");
    let count = 0;
    const request = index.openCursor(IDBKeyRange.lowerBound(0), "prev");
    const playersArr: Array<unknown> = [];
    request.onsuccess = function (e: Event) {
      const cursor = (e.target as IDBRequest).result;
      console.log("success db get", cursor);
      if (cursor && count < 10) {
        // cursor.key ** cursor.value[field]
        playersArr.push(cursor.value);
        count++;
        console.log("### Data from DB + count", playersArr, count);
        cursor.continue();
      }
      else {
        const page: HTMLElement = document.getElementById('#page') as HTMLElement;
        page.innerHTML = `<div class="scores-container">${view.render(templates.scores, playersArr)}</div>`;
      }
    }
  }
}
