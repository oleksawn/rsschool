import { DomEl } from './dom';

export class Car {
  constructor(name, color, carParent) {
    this.name = name;
    this.color = color;
    this.carParent = carParent;
  }

  addCar() {
    const carContainer = new DomEl(this.carParent, 'car_container').el;

    const carControls = new DomEl(carContainer, 'car_controls').el;
    const carTrack = new DomEl(carContainer, 'car_track').el;

    const carName = new DomEl(carControls, 'car_name', 'p', `${this.name}`).el;

    // <object type="image/svg+xml" data="car.svg"></object>
    const carImg = new DomEl(carTrack, 'car_img', 'object').el;
    carImg.setAttribute('type', 'image/svg+xml');
    carImg.setAttribute('data', 'assets/car.svg');
    carImg.setAttribute('class', 'car_img');
    carImg.color = this.color;
    carImg.onload = function () {
      this.contentDocument.getElementsByClassName("svg")[0].setAttribute('fill', this.color);
    };
  }
}