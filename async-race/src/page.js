import { DomEl } from './dom';
import { Car } from './car';

export class Page {
  constructor(pageNum, carsArr, pageParent) {
    this.parentNode = pageParent;
    this.pageNum = pageNum;
    this.carsArr = carsArr;
  }

  addPage() {
    const carsPage = new DomEl(this.parentNode, 'cars_page').el;
    const garagePageNum = new DomEl(carsPage, 'garage_page-num', 'h3', `Page #${this.pageNum}`).el;
    const carsContainer = new DomEl(carsPage, 'cars_container').el;
    this.carsArr.map(it => {
      const car = new Car(it.name, it.color, carsContainer);
      car.addCar();
      return car;
    });
  }
}