import { DomEl } from './dom';
import { CarNode } from './car';

const baseUrl = 'http://127.0.0.1:3000';

export class GaragePage {
  constructor() {
    console.log('page: constructor()');
    this.pageNum = 1;
    this.carsAmount = 0;
    this.carsArr = [];

    this.nodes = {};
    this.nodes.container = new DomEl(document.body, ['container']);
    // header
    this.nodes.header = new DomEl(this.nodes.container.el, ['header']);
    // main page
    this.nodes.garage = new DomEl(this.nodes.container.el, ['garage']);

    // main page: cars amount section
    this.nodes.garageCarsAmount = new DomEl(this.nodes.garage.el, ['garage__cars-amount'], 'h2', `Garage: ${this.carsAmount} cars`);

    // main page: pagination section
    this.nodes.garagePageControls = new DomEl(this.nodes.garage.el, ['garage__page-controls']);
    this.nodes.pageControlsPrevBtn = new DomEl(this.nodes.garagePageControls.el, ['page-controls__btn page-controls__btn_prev'], 'button', 'prev');
    this.nodes.pageControlsPrevBtn.el.onclick = () => {
      let page = this.pageNum;
      if (page > 1) {
        page -= 1;
        console.log("click prev btn - if page > 1 - go to page ", page);
        this.fetchData(page, true);
      }
    };
    this.nodes.pageControlsPageNum = new DomEl(this.nodes.garagePageControls.el, ['page-controls__page-number'], 'h3', `Page #${this.pageNum}`);
    this.nodes.pageControlsNextBtn = new DomEl(this.nodes.garagePageControls.el, ['page-controls__btn page-controls__btn_next'], 'button', 'next');
    this.nodes.pageControlsNextBtn.el.onclick = () => {
      let page = this.pageNum;
      if (this.carsAmount - (7 * page) > 0) {
        page += 1;
        console.log("click prev btn - if page < end page - go to page ", page);
        this.fetchData(page, true);
      }
    };

    // main page: cars controls section: creating / race
    this.nodes.garageCarsControls = new DomEl(this.nodes.garage.el, ['garage__cars-controls-container']);
    this.nodes.carsControlsAddOneForm = new DomEl(this.nodes.garageCarsControls.el, ['cars-controls__form']);
    this.nodes.addOneFormName = new DomEl(this.nodes.carsControlsAddOneForm.el, ['cars-controls-form__name'], 'input');
    this.nodes.addOneFormName.el.setAttribute('type', 'text');
    this.nodes.addOneFormColor = new DomEl(this.nodes.carsControlsAddOneForm.el, ['cars-controls-form__color'], 'input');
    this.nodes.addOneFormColor.el.setAttribute('type', 'color');
    this.nodes.addOneFormOk = new DomEl(this.nodes.carsControlsAddOneForm.el, ['cars-controls-form__btn'], 'button', 'add car');
    this.nodes.addOneFormOk.el.onclick = (event) => {
      console.log("click add one btn");
      fetch(`${baseUrl}/garage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.nodes.addOneFormName.el.value,
          color: this.nodes.addOneFormColor.el.value
        })
      })
        .then((response) => {
          console.log("add", response);

          this.fetchData(this.pageNum, true);
        });;
    }
    this.nodes.carsControlsAddHundred = new DomEl(this.nodes.garageCarsControls.el, ['cars-controls__btn'], 'button', 'add hundred cars');
    const nameArr = ['Tesla', 'BMW', 'Audi', 'Bentley', 'Chevrolet', 'Citroen', 'Fiat', 'Ferrari', 'Ford', 'Honda'];
    const modelArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const charArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    this.nodes.carsControlsAddHundred.el.onclick = () => {
      console.log("click add-100-cars button");
      for (let i = 0; i < 100; i++) {
        const randomName = `${nameArr[Math.floor(Math.random() * nameArr.length)]} ${modelArr[Math.floor(Math.random() * modelArr.length)]}`;
        const randomColor = `#${charArr[Math.floor(Math.random() * charArr.length)]}${charArr[Math.floor(Math.random() * charArr.length)]}${charArr[Math.floor(Math.random() * charArr.length)]}${charArr[Math.floor(Math.random() * charArr.length)]}${charArr[Math.floor(Math.random() * charArr.length)]}${charArr[Math.floor(Math.random() * charArr.length)]}`;
        fetch(`${baseUrl}/garage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: randomName,
            color: randomColor
          })
        })
          .then((response) => {
            console.log("add random", response);

            this.fetchData(this.pageNum, true);
          });;
      }
    }

    // main page: cars section: cars list
    this.nodes.garagePage = new DomEl(this.nodes.garage.el, ['garage__page']);
    this.nodes.cars = [];
    for (let i = 0; i < 7; i++) {
      this.nodes.cars.push(new CarNode(this.nodes.garagePage.el));

      this.nodes.cars[i].controlsCarDelete.el.onclick = (event) => {
        console.log("click delete btn for car #", event.target.dataset.carId);
        fetch(`${baseUrl}/garage/${event.target.dataset.carId}`, { method: 'DELETE' })
          .then((response) => {
            console.log("delete", response);
            this.fetchData(this.pageNum, true);
          });;
      }
      this.nodes.cars[i].updateFormOk.el.onclick = (event) => {
        console.log("click update btn for car #", event.target.dataset.carId);
        fetch(`${baseUrl}/garage/${event.target.dataset.carId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: this.nodes.cars[i].updateFormName.el.value,
            color: this.nodes.cars[i].updateFormColor.el.value
          })
        })
          .then((response) => {
            console.log("update", response);
            this.fetchData(this.pageNum, true);
          });;
      }
    }
  }

  renderPage() {
    console.log('page: renderPage()');
    Object.values(this.nodes).forEach((node) => {
      if (node.parent === undefined) {
        node.forEach((carWrapper, index) => {
          if (index < this.carsArr.length) {
            Object.values(carWrapper).forEach((carNode) => {
              carNode.parent.appendChild(carNode.el);
            });
          }
        });
      }
      else {
        node.parent.appendChild(node.el);
      }
    });
  }

  updateData(carsArr) {
    console.log('page: updateData()');
    this.carsArr = carsArr;
    this.nodes.garageCarsAmount.el.innerText = `Garage: ${this.carsAmount} cars`;
    this.nodes.pageControlsPageNum.el.innerText = `Page #${this.pageNum}`;

    this.nodes.cars.forEach((carWrapper, index) => {
      if (carsArr[index] !== undefined) {
        carWrapper.pageCar.el.classList.remove('hidden');
        carWrapper.trackCarImg.id = carsArr[index].id;
        carWrapper.controlsCarName.el.innerText = carsArr[index].name;
        carWrapper.controlsCarDelete.el.dataset.carId = carsArr[index].id;
        carWrapper.updateFormName.el.value = carsArr[index].name;
        carWrapper.updateFormColor.el.value = carsArr[index].color;
        carWrapper.updateFormOk.el.dataset.carId = carsArr[index].id;
        carWrapper.trackCarImg.el.color = carsArr[index].color;
        carWrapper.trackCarImg.el.onload = function () {
          this.contentDocument.getElementsByClassName("svg")[0].setAttribute('fill', this.color);
        };
      }
      else {
        carWrapper.pageCar.el.classList.add('hidden');
      }
    });
  }

  fetchData(page, notRendered) {
    console.log(`page: fetchData(${page}, notRendered)`);
    fetch(`${baseUrl}/garage?_page=${page}&_limit=7`)
      .then((response) => {
        console.log(response);
        const carsNum = Number(response.headers.get('X-Total-Count'));
        this.pageNum = page;
        this.carsAmount = carsNum;
        console.log("page: center fetchData(), pageNum, carsAmount");
        return response.json();
      })
      .then((carsArr) => {
        console.log('after fetch', carsArr);
        this.updateData(carsArr);
        if (notRendered) {
          console.log("page: end fetchData(), if notRendered: renderPage()");
          this.renderPage();
        }
        console.log("page: end fetchData()");
      })
  }
}
