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
            this.fetchData(this.pageNum, true);
          });;
      }
    }

    this.nodes.carsControlsRaceForm = new DomEl(this.nodes.garageCarsControls.el, ['cars-controls__race-form']);
    this.nodes.raceFormRace = new DomEl(this.nodes.carsControlsRaceForm.el, ['race-form__btn'], 'button', 'race');
    this.nodes.raceFormRace.el.onclick = () => {
      this.nodes.raceFormRace.el.setAttribute('disabled', 'disabled');
      this.nodes.raceFormReset.el.removeAttribute('disabled');
      this.stopAllCars([], () => {
        console.log("click RACE btn");
        this.nodes.cars.forEach((obj) => {
          (function (carObj) {
            console.log(carObj.trackCarImg.id);
            carObj.controlsCarGo.el.setAttribute('disabled', 'disabled');
            carObj.controlsCarStop.el.removeAttribute('disabled');
            carObj.isStopped = false;
            carObj.isDrive = true;
            fetch(`${baseUrl}/engine?id=${carObj.trackCarImg.el.dataset.carId}&status=started`, { method: 'GET' })
              .then((response) => {
                console.log(carObj.trackCarImg.id, response);
                return response.json();
              })
              .then((res) => {
                console.log(carObj.trackCarImg.id, res.distance, res.velocity);
                let lastTime = 0;

                function step(time) {
                  if (lastTime === 0) {
                    lastTime = time;
                    if (carObj.isDrive) requestAnimationFrame(step);
                  }
                  else {
                    const progressTime = time - lastTime;
                    const progressPx = progressTime * (1120 / (res.distance / res.velocity));
                    carObj.trackCarImg.el.style.transform = `translateX(${progressPx}px)`;
                    if (carObj.isStopped) carObj.trackCarImg.el.style.transform = `translateX(0px)`;
                    if (progressPx < 1121 && carObj.isDrive) requestAnimationFrame(step);
                  }
                }
                requestAnimationFrame(step);
                console.time(carObj.trackCarImg.id);
                fetch(`${baseUrl}/engine?id=${carObj.trackCarImg.el.dataset.carId}&status=drive`)
                  .then((response) => {
                    console.timeEnd(carObj.trackCarImg.id);
                    console.log(carObj.trackCarImg.id, response, carObj.trackCarImg.el.style.transform);
                    carObj.isDrive = false; // stop animate
                  });
              });
          })(obj);
        });

      });
    }
    this.nodes.raceFormReset = new DomEl(this.nodes.carsControlsRaceForm.el, ['race-form__btn'], 'button', 'reset');
    this.nodes.raceFormReset.el.onclick = () => {
      this.nodes.raceFormReset.el.setAttribute('disabled', 'disabled');
      this.stopAllCars([], () => {
        this.nodes.raceFormRace.el.removeAttribute('disabled');
      });
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
      };

      (function (carObj) {
        carObj.isDrive = false;
        carObj.isStopped = true;
        carObj.controlsCarGo.el.onclick = (event) => {
          console.log("click GO btn for car #", event.target.dataset.carId);
          carObj.controlsCarGo.el.setAttribute('disabled', 'disabled');
          carObj.controlsCarStop.el.removeAttribute('disabled');
          carObj.isStopped = false;
          carObj.isDrive = true;
          fetch(`${baseUrl}/engine?id=${event.target.dataset.carId}&status=started`, { method: 'GET' })
            .then((response) => {
              console.log("GO", response);
              return response.json();
            })
            .then((res) => {
              console.log(res.velocity, res.distance);
              let lastTime = 0;

              function step(time) {
                if (lastTime === 0) {
                  lastTime = time;
                  if (carObj.isDrive) requestAnimationFrame(step);
                }
                else {
                  const progressTime = time - lastTime;
                  const progressPx = progressTime * (1120 / (res.distance / res.velocity));
                  carObj.trackCarImg.el.style.transform = `translateX(${progressPx}px)`;
                  if (carObj.isStopped) carObj.trackCarImg.el.style.transform = `translateX(0px)`;
                  if (carObj.isDrive) requestAnimationFrame(step);
                }
              }
              requestAnimationFrame(step);
              fetch(`${baseUrl}/engine?id=${event.target.dataset.carId}&status=drive`)
                .then((response) => {
                  console.log(response);
                  carObj.isDrive = false; // stop animate
                  console.log(carObj.isDrive);
                });
            });
        }

        carObj.controlsCarStop.el.onclick = (event) => {
          console.log("click STOP btn for car #", event.target.dataset.carId);
          carObj.controlsCarStop.el.setAttribute('disabled', 'disabled');
          fetch(`${baseUrl}/engine?id=${event.target.dataset.carId}&status=stopped`, { method: 'GET' })
            .then((response) => {
              console.log("STOP", response);
              carObj.isDrive = false;
              carObj.isStopped = true; // stop animate + back to init place
              carObj.trackCarImg.el.style.transform = `translateX(0px)`;
              carObj.controlsCarGo.el.removeAttribute('disabled');
            })
        }
      })(this.nodes.cars[i]);
    }
  }

  stopAllCars(carsArr, afterStop) {
    console.log(this.nodes.cars.length)
    let notAnimated = true;
    for (let i = 0; i < this.nodes.cars.length; i++) {
      if (this.nodes.cars[i].isDrive === false && this.nodes.cars[i].isStopped === true) {
        console.log("stop all cars -- if not drive & stopped");
      }
      else {
        notAnimated = false;
      };
    }
    const promiseArr = [];
    if (notAnimated === false) {
      console.log("Animated");
      for (let i = 0; i < this.nodes.cars.length; i++) {
        this.nodes.cars[i].controlsCarStop.el.setAttribute('disabled', 'disabled');
        this.nodes.cars[i].controlsCarGo.el.removeAttribute('disabled');
        const p = fetch(`${baseUrl}/engine?id=${this.nodes.cars[i].trackCarImg.el.dataset.carId}&status=stopped`, { method: 'GET' })
          .then((response) => {
            console.log("STOP", response);
            this.nodes.cars[i].isDrive = false;
            this.nodes.cars[i].isStopped = true; // stop animate + back to init place
            this.nodes.cars[i].trackCarImg.el.style.transform = `translateX(0px)`;
          });
        promiseArr.push(p);
      }
      this.nodes.raceFormRace.el.removeAttribute('disabled');
    }
    Promise.all(promiseArr).then(() => {
      afterStop();
    }
    );
  };

  renderPage() {
    console.log('page: renderPage()');
    Object.values(this.nodes).forEach((node) => {
      if (node.parent === undefined) {
        node.forEach((carWrapper, index) => {
          if (index < this.carsArr.length) {
            Object.values(carWrapper).forEach((carNode) => {
              if (typeof carNode !== 'boolean') {
                carNode.parent.appendChild(carNode.el);
              }
            });
          };
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
    this.nodes.raceFormReset.el.setAttribute('disabled', 'disabled');
    if (this.pageNum === 1) {
      this.nodes.pageControlsPrevBtn.el.setAttribute('disabled', 'disabled');
    }
    else {
      this.nodes.pageControlsPrevBtn.el.removeAttribute('disabled');
    }
    if (this.carsAmount - (7 * this.pageNum) <= 0) {
      this.nodes.pageControlsNextBtn.el.setAttribute('disabled', 'disabled');
    }
    else {
      this.nodes.pageControlsNextBtn.el.removeAttribute('disabled');
    }

    this.nodes.cars.forEach((carWrapper, index) => {
      if (carsArr[index] !== undefined) {
        carWrapper.pageCar.el.classList.remove('hidden');
        carWrapper.trackCarImg.id = carsArr[index].id;
        carWrapper.controlsCarName.el.innerText = carsArr[index].name;
        carWrapper.controlsCarDelete.el.dataset.carId = carsArr[index].id;
        carWrapper.controlsCarGo.el.dataset.carId = carsArr[index].id;
        carWrapper.controlsCarGo.el.removeAttribute('disabled');
        carWrapper.controlsCarStop.el.dataset.carId = carsArr[index].id;
        carWrapper.controlsCarStop.el.setAttribute('disabled', 'disabled');
        carWrapper.updateFormName.el.value = carsArr[index].name;
        carWrapper.updateFormColor.el.value = carsArr[index].color;
        carWrapper.updateFormOk.el.dataset.carId = carsArr[index].id;
        carWrapper.trackCarImg.el.color = carsArr[index].color;
        carWrapper.trackCarImg.el.dataset.carId = carsArr[index].id;
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
        this.stopAllCars(carsArr, () => {
          console.log("toPageChange");
          this.updateData(carsArr);
          this.renderPage();
        });
        console.log("page: end fetchData()");
      })
  }
}
