import { DomEl } from './dom';

export class CarNode {
  constructor(carParent) {
    this.pageCar = new DomEl(carParent, ['page__car']);
    this.carControls = new DomEl(this.pageCar.el, ['car__controls']);
    this.controlsCarName = new DomEl(this.carControls.el, ['controls__car-name'], 'p');
    this.carTrack = new DomEl(this.pageCar.el, ['car__track']);
    // <object type="image/svg+xml" data="car.svg"></object>
    this.trackCarImg = new DomEl(this.carTrack.el, ['track__car-img'], 'object');
    this.trackCarImg.el.setAttribute('type', 'image/svg+xml');
    this.trackCarImg.el.setAttribute('data', 'assets/car.svg');
  }
}