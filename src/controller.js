// get model from db + put into view 
import { view } from './view';
import { templates } from './templates';
import { form } from './valid';
import { model } from './model';

export const controller = {
  aboutRoute() {
    console.log("about route");
    const page = document.getElementById('#page');
    page.innerHTML = view.render(templates.about);
  },
  formRoute() {
    console.log("form route");
    const page = document.getElementById('#page');
    page.innerHTML = view.render(templates.form);

    // form validation
    const inputs = document.querySelectorAll('.logForm .wrapper input');
    console.log("inputs", inputs);
    inputs.forEach((el) => {
      console.log("add event listener", el);
      el.addEventListener('input', form.validateInput);
    });

    // add new player
    const addBtn = document.querySelector('#addButton');
    addBtn.addEventListener('click', () => {
      console.log("router.formRoute() addbutton.onclick");
      if (form.validateForm()) {
        const data = form.getDataFromForm();
        model.addPlayerintoDb(data);
      }
    });

    // clean form button
    const cleanBtn = document.querySelector('#cleanButton');
    cleanBtn.addEventListener('click', form.cleanForm);
  },
  settingsRoute() {
    console.log("settings route");
    const page = document.getElementById('#page');
    page.innerHTML = view.render(templates.settings);
  },
  gameRoute() {
    console.log("game route");
    const page = document.getElementById('#page');
    page.innerHTML = view.render(templates.game);
  },
  scoresRoute() {
    console.log("scores route");
    const amountPlayers = 10;
    model.getBestPlayers(amountPlayers, model.settingsObj.difficulty);
  }
};