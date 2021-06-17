import { DomEl } from './dom';
import { CarNode } from './car';

export class GaragePage {
  constructor() {
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
    this.nodes.pageControlsPageNum = new DomEl(this.nodes.garagePageControls.el, ['page-controls__page-number'], 'h3', `Page #${this.pageNum}`);
    this.nodes.pageControlsNextBtn = new DomEl(this.nodes.garagePageControls.el, ['page-controls__btn page-controls__btn_next'], 'button', 'next');
    this.nodes.garageCarsControls = new DomEl(this.nodes.garage.el, ['garage__cars-controls-container']);
    this.nodes.garagePage = new DomEl(this.nodes.garage.el, ['garage__page']);
    this.nodes.cars = [];
    for (let i = 0; i < 7; i++) {
      this.nodes.cars.push(new CarNode(this.nodes.garagePage.el));
    }
  }

  getPrevBtn() {
    return this.nodes.pageControlsPrevBtn.el;
  }

  getNextBtn() {
    return this.nodes.pageControlsNextBtn.el;
  }

  getPageNum() {
    return this.pageNum;
  }

  getCarsAmount() {
    return this.carsAmount;
  }

  renderPage() {
    Object.values(this.nodes).forEach((node) => {
      if (node.parent === undefined) {
        node.forEach((carWrapper, index) => {
          console.log("this.carArr.length = ", this.carsArr.length);
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
    console.log('updateData: insert fetched data on the garage page');
    this.carsArr = carsArr;
    this.nodes.garageCarsAmount.el.innerText = `Garage: ${this.carsAmount} cars`;
    this.nodes.pageControlsPageNum.el.innerText = `Page #${this.pageNum}`;

    this.nodes.cars.forEach((carWrapper, index) => {
      if (carsArr[index] !== undefined) {
        carWrapper.pageCar.el.classList.remove('hidden');
        carWrapper.trackCarImg.id = carsArr[index].id;
        carWrapper.controlsCarName.el.innerText = carsArr[index].name;
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
}