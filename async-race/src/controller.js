import { DomEl } from './dom';

export const controller = {
  render() {
    const container = new DomEl(document.body, 'container').el;

    const header = new DomEl(container, 'header').el;
    const garage = new DomEl(container, 'garage_container').el;

    const carsControls = new DomEl(garage, 'controls_container').el;
    const carsNum = 4;
    const carsAmount = new DomEl(garage, 'cars_amount', 'h2', `Garage (${carsNum})`).el;
    const pageNum = 1;
    const carsPage = new DomEl(garage, 'cars_page').el;

    const garagePageNum = new DomEl(carsPage, 'garage_page-num', 'h3', `Page #${pageNum}`).el;
    const carsContainer = new DomEl(carsPage, 'cars_container').el;

    const carContainer = new DomEl(carsContainer, 'car_container').el;

    const carControls = new DomEl(carContainer, 'car_controls').el;
    const carTrack = new DomEl(carContainer, 'car_track').el;

    const carN = 'Tesla';
    const carName = new DomEl(carControls, 'car_name', 'p', `${carN}`).el;

    const carImg = new DomEl(carTrack, 'car_img', 'object').el;
  }
}
