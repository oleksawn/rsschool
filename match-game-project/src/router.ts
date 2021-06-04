// handlehash# - init Controller.methods() e.g. Controller.scores 
import { controller } from './controller';
import { view } from './view';
import { templates } from './templates';

function getHash() : string {
  const hash : string = window.location.hash.slice(1);
  return hash;
}

function highlightRoute(hash: string) {
  // remove .active route state from all routes
  const navItemArr = document.querySelectorAll('.nav__item');
  navItemArr.forEach((el) => {
    if (el.classList.contains('nav__item_active')) {
      el.classList.remove('nav__item_active');
    }
  });
  // set .active route state to route with location.hash
  const route = `.nav__${hash}`;
  const routeNavItem = document.querySelector(route);
  if (routeNavItem != null) {
    routeNavItem.classList.add('nav__item_active');
  }
}

function handleHash() {
  const name : string = getHash();
  const routeName = `${name}Route`;
  highlightRoute(name);
  controller[routeName]();
}

export const router = {
  changePageByHash() : void {
    document.body.innerHTML = view.render(templates.header, []);
    window.addEventListener('hashchange', handleHash);
    const form: HTMLElement = document.querySelector('.header__btn_form') as HTMLElement;
    form.addEventListener('click', () => {
      window.location.hash = '#aboutr';
    });
    if (window.location.hash.slice(1) === '') {
      window.location.hash = '#about';
    }
  }
};