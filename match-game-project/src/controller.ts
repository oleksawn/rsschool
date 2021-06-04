// get model from db + put into view 
import { view } from './view';
import { templates } from './templates';
import { form } from './valid';
import { model } from './model';

export const controller: {[key: string] : () => void} = {
  aboutRoute() : void {
    console.log("about route");
    const page: HTMLElement = document.getElementById('#page') as HTMLElement;
    page.innerHTML = view.render(templates.about, []);
  },
  aboutrRoute() : void {
    console.log("form popup");
    const page: HTMLElement = document.getElementById('#page') as HTMLElement;
    page.innerHTML = view.render(templates.about, []);
    page.innerHTML += view.render(templates.form, []);
    // form validation
    const inputs : NodeListOf<HTMLInputElement> = document.querySelectorAll('.logForm .wrapper input');
    console.log("inputs", inputs);
    inputs.forEach((el) => {
      console.log("add event listener", el);
      el.addEventListener('input', form.validateInput);
    });
    // add new player as logged gamer
    const addBtn : HTMLElement = document.querySelector('#addButton') as HTMLElement;
    addBtn.addEventListener('click', () => {
      console.log("router.formRoute() addbutton.onclick");
      if (form.validateForm()) {
        console.log("form is valid");
        const data : {[index : string]: string} = form.getDataFromForm();
        Object.keys(data).forEach((key) => {
          model.loggedGamer[key] = data[key];
        });
        model.isLogged = true;
        console.log("loggedGamer after add user button on form = ", model.loggedGamer);
        const loggedPlayer : HTMLElement = document.querySelector('.loggedGamer__data') as HTMLElement;
        loggedPlayer.innerHTML = `<p class="name">${model.loggedGamer.fname} ${model.loggedGamer.lname}</p><p class="email">${model.loggedGamer.email}</p>`;
        // show NEW GAME button in header
        const gameNav: HTMLElement = document.querySelector('.header__btn_game') as HTMLElement;
        console.log("show new game button in header", gameNav);
        gameNav.classList.remove('hidden');
      }
    });
    // clean form button
    const cleanBtn : HTMLElement = document.querySelector('#cleanButton') as HTMLElement;
    cleanBtn.addEventListener('click', form.cleanForm);
  },
  settingsRoute() : void {
    console.log("settings route");
    const page: HTMLElement = document.getElementById('#page') as HTMLElement;
    page.innerHTML = view.render(templates.settings,[]);
    const selectDifficulty : HTMLInputElement = document.querySelector('#select-difficulty') as HTMLInputElement;
    const selectTheme : HTMLInputElement = document.querySelector('#select-theme') as HTMLInputElement;
    selectDifficulty.value = String(model.settings.difficulty);
    selectTheme.value = model.settings.theme;
    selectDifficulty.addEventListener('change', (el) => {
      model.settings.difficulty = Number((el.target as HTMLInputElement).value);
    });
    selectTheme.addEventListener('change', (el) => {
      model.settings.theme = (el.target as HTMLInputElement).value;
    });
  },
  gameRoute() : void {
    console.log("game route");
    // render game page
    const page: HTMLElement = document.getElementById('#page') as HTMLElement;
    page.innerHTML = view.render(templates.game,[]);
    // render cards in the field accordings to settings
    const field : HTMLElement = document.querySelector('.game-cards') as HTMLElement;
    field.classList.remove("game-cards_16", "game-cards_32", "game-cards_64");
    const cl = `game-cards_${model.settings.difficulty}`;
    field.classList.add(cl);
    for (let i = 0; i < model.settings.difficulty; i++) {
      field.innerHTML += view.render(templates.card,[]);
    }

    // start game with start button
    const startBtn: HTMLElement = document.querySelector('.game-buttons .game-btn_start') as HTMLElement;
    const stopBtn: HTMLElement = document.querySelector('.game-buttons .game-btn_stop') as HTMLElement;
    const timerMinEl: HTMLElement = document.querySelector('.timer-min') as HTMLElement;
    const timerSecEl: HTMLElement = document.querySelector('.timer-sec') as HTMLElement;
    let clickcount = 0;
    let samecount = 0;
    let prevEl : HTMLElement;
    let prevCode : number;
    let thisCode;
    startBtn.addEventListener('click', () => {
      console.log("start!!!", startBtn, stopBtn);
      startBtn.classList.add('hidden');
      stopBtn.classList.remove('hidden');
      let sec = 0;
      const timer = setInterval(() => {
        window.addEventListener('hashchange', () => {
          clearInterval(timer);
        });
        sec++;
        console.log(sec);
        timerSecEl.innerHTML = String(sec % 60).length === 1 ? `0${String(sec % 60)}` : String(sec % 60);
        timerMinEl.innerHTML = String(Math.floor(sec / 60)).length === 1 ? `0${String(Math.floor(sec / 60))}` : String(Math.floor(sec / 60));
      }, 1000);
      stopBtn.addEventListener('click', () => {
        stopBtn.classList.add('hidden');
        startBtn.classList.remove('hidden');
        clearInterval(timer);
        controller.gameRoute();
      });
      field.addEventListener('click', (e) => {
        console.log("click on cards field => on card__back");
        if ((e.target as HTMLElement).classList.contains('card__back')) {
          ((e.target as HTMLElement).parentElement as HTMLElement).classList.add('flipped');
          clickcount++;
          if (clickcount % 2 === 1) {
            prevEl = (e.target as HTMLElement);
            console.log("Test = ", (prevEl.previousElementSibling as HTMLElement).style.backgroundImage);
            const execRes = Number(/[0-9]+/.exec((prevEl.previousElementSibling as HTMLElement).style.backgroundImage));
            console.log("res odd", execRes);
            prevCode = execRes;
          }
          else {
            const execRes = Number(/[0-9]+/.exec(((e.target as HTMLElement).previousElementSibling as HTMLElement).style.backgroundImage));
            console.log("res even", execRes);
            thisCode = execRes;
            if (thisCode === prevCode) {
              samecount++;
              (prevEl.previousElementSibling as HTMLElement).style.backgroundColor = 'rgb(142, 202, 142)';
              ((e.target as HTMLElement).previousElementSibling as HTMLElement).style.backgroundColor = 'rgb(142, 202, 142)';
              if (samecount === model.settings.difficulty / 2) {
                // found all matches Congratulations!!!
                clearInterval(timer);
                const scoreEl : HTMLElement = document.querySelector('.game-buttons .score') as HTMLElement;
                const score = (((clickcount / 2) - ((clickcount / 2) - samecount)) * 100) - (sec * 10);
                console.log("Score = ", score, "clicks = ", clickcount, "same = ", samecount, "sec = ", sec,);
                // show score on game field
                scoreEl.innerHTML = `Score: ${score > 0 ? score : 0}`;
                field.innerHTML += view.render(templates.congrat,[]);
                // add score to loggedGamer
                if (model.isLogged) {
                  model.loggedGamer.score = score > 0 ? String(score) : '0';
                  console.log("loggedGamer after congratulations");
                  // add loggedGamer with this score into DB
                  interface Player {
                    fname: string,
                    lname: string,
                    email: string,
                    score: number
                  }
                  const player : Player = {
                    fname: '',
                    lname: '',
                    email: '',
                    score: 0
                  };
                  player.fname = model.loggedGamer.fname;
                  player.lname = model.loggedGamer.lname;
                  player.email = model.loggedGamer.email;
                  player.score = Number(model.loggedGamer.score);
                  model.addPlayerintoDb(player);
                }
              }
            }
            else {
              console.log("not same");
              (prevEl.previousElementSibling as HTMLElement).style.backgroundColor = 'rgb(219, 138, 158)';
              ((e.target as HTMLElement).previousElementSibling as HTMLElement).style.backgroundColor = 'rgb(219, 138, 158)';
              setTimeout((el1, el2) => {
                console.log(el1);
                console.log(el2);
                el1.parentElement.classList.remove('flipped');
                el2.parentElement.classList.remove('flipped');
                el1.previousElementSibling.style.backgroundColor = '';
                el2.previousElementSibling.style.backgroundColor = '';
              }, 800, prevEl, e.target);
              // 

            }

          }
        }
      });
    });


    const cardsArr : NodeListOf<HTMLElement> = document.querySelectorAll('.card__front');
    const numArr : Array<number>= [];
    for (let i = 0; i < model.settings.difficulty; i++) {
      numArr.push(i + 1);
    }
    let count = 0;
    function random() {
      count++;
      return Math.random() - 0.5;
    }
    numArr.sort(random);
    console.log("sorted num arr", numArr);
    const frontimages : Array<number> = [];
    for (let i = 0; i < numArr.length; i++) {
      if (numArr[i] <= model.settings.difficulty / 2) {
        frontimages[i] = numArr[i];
      }
      else {
        frontimages[i] = numArr[i] - model.settings.difficulty / 2;
      }
    }
    console.log("sorted num arr", frontimages);
    let i = 0;
    cardsArr.forEach((card) => {
      card.style.backgroundImage = `url('./assets/${model.settings.theme}/${frontimages[i]}.png')`;
      console.log(card.style.backgroundImage);
      i++;
    });
  },
  scoresRoute() : void {
    console.log("scores route");
    const amountPlayers = 10;
    model.getBestPlayers(amountPlayers, model.settings.difficulty);
  }
};