import { DomEl } from './dom';

const baseUrl = 'http://127.0.0.1:3000';

export class CarNode {
  constructor(carParent) {
    this.pageCar = new DomEl(carParent, ['page__car']);
    this.carControls = new DomEl(this.pageCar.el, ['car__controls']);
    this.controlsCarName = new DomEl(this.carControls.el, ['controls__car-name'], 'p');

    this.controlsLine = new DomEl(this.carControls.el, ['car__controls_line']);
    this.controlsCarDelete = new DomEl(this.controlsLine.el, ['controls__car-delete'], 'button', 'delete');
    this.controlsCarGo = new DomEl(this.controlsLine.el, ['controls__car-go'], 'button', 'Go');
    this.controlsCarStop = new DomEl(this.controlsLine.el, ['controls__car-stop'], 'button', 'Stop');

    this.controlsUpdateForm = new DomEl(this.carControls.el, ['controls__car-update-form']);
    this.updateFormName = new DomEl(this.controlsUpdateForm.el, ['car-update-form__name'], 'input');
    this.updateFormName.el.setAttribute('type', 'text');
    this.updateFormColor = new DomEl(this.controlsUpdateForm.el, ['car-update-form__color'], 'input');
    this.updateFormColor.el.setAttribute('type', 'color');
    this.updateFormOk = new DomEl(this.controlsUpdateForm.el, ['car-update-form__btn'], 'button', 'update');

    this.carTrack = new DomEl(this.pageCar.el, ['car__track']);
    // <object type="image/svg+xml" data="car.svg"></object>
    this.trackCarImg = new DomEl(this.carTrack.el, ['track__car-img'], 'object');
    this.trackCarImg.el.setAttribute('type', 'image/svg+xml');
    this.trackCarImg.el.setAttribute('data', 'assets/car.svg');
  }
}