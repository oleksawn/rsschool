import './style.css';
import './assets/car.svg'
import { controller } from './controller';

const baseUrl = 'http://127.0.0.1:3000';


controller.render();
/*
class Car {
  constructor(car) {
    this.name = car.name;
    this.color = car.color;
    this.id = car.id;
  }

  drawCar() {
    const carContainerEl = document.createElement('div');
    carContainerEl.className = 'car_container';
    carsContainerEl.appendChild(carContainerEl);

    const carControlEl = document.createElement('div');
    carControlEl.className = 'car_control';
    carContainerEl.appendChild(carControlEl);

    const carName = document.createElement('p');
    carName.className = 'car_name';
    carControlEl.appendChild(carName);
    carName.innerText = this.name;

    const carTraceEl = document.createElement('div');
    carTraceEl.className = 'car_trace';
    carContainerEl.appendChild(carTraceEl);

    // <object type="image/svg+xml" data="car.svg"></object>
    const carObj = document.createElement('object');
    carObj.setAttribute('type', 'image/svg+xml');
    carObj.setAttribute('data', 'assets/car.svg');
    carObj.setAttribute('class', 'car_img');
    carObj.color = this.color;
    carTraceEl.appendChild(carObj);

    carObj.onload = function () {
      this.contentDocument.getElementsByClassName("svg")[0].setAttribute('fill', this.color);
    };
  }

  driveCar() {
    console.log('drive car ', this.name);
  }
}


// get all cars
fetch(`${baseUrl}/garage`)
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((cars) => {
    // render cars
    const carsArr = cars.map(carObj => {
      console.log("Hello");
      const car = new Car(carObj);
      car.drawCar();
      return car;
    });
  });
  */
