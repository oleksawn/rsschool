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
    this.nodes.header = new DomEl(this.nodes.container.el, ['header']);
    this.nodes.garage = new DomEl(this.nodes.container.el, ['garage']);
    this.nodes.garageCarsAmount = new DomEl(this.nodes.garage.el, ['garage__cars-amount'], 'h2', `Garage: ${this.carsAmount} cars`);
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
    this.nodes.garageCarsControls = new DomEl(this.nodes.garage.el, ['garage__cars-controls-container']);
    this.nodes.CarsControlsAddOne = new DomEl(this.nodes.garageCarsControls.el, ['cars-controls__btn'], 'button', 'add one car');
    this.nodes.CarsControlsAddOne.el.onclick = (event) => {
      console.log("click add one btn");
      fetch(`${baseUrl}/garage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Added car',
          color: '#88f'
        })
      })
        .then((response) => {
          console.log("add", response);

          this.fetchData(this.pageNum, true);
        });;
    }
    this.nodes.CarsControlsAddHundred = new DomEl(this.nodes.garageCarsControls.el, ['cars-controls__btn'], 'button', 'add hundred cars');
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
      });
  };



}