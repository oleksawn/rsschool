import { DomEl } from './dom';
import { Page } from './page';

const baseUrl = 'http://127.0.0.1:3000';

export const controller = {
  garageRoute() {
    const container = new DomEl(document.body, 'container').el;
    const header = new DomEl(container, 'header').el;

    const garage = new DomEl(container, 'garage_container').el;

    const carsControls = new DomEl(garage, 'controls_container').el;

    const pageNum = 1;
    fetch(`${baseUrl}/garage?_page=${pageNum}&_limit=7`)
      .then((response) => {
        console.log(response);
        const carsNum = response.headers.get('X-Total-Count');
        const carsAmount = new DomEl(garage, 'cars_amount', 'h2', `Garage (${carsNum})`).el;
        return response.json();
      })
      .then((cars) => {
        console.log(cars);
        const page = new Page(pageNum, cars, garage);
        page.addPage();
      });

  }
}
