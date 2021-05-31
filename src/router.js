// handlehash# - init Controller.methods() e.g. Controller.scores 
import { controller } from './controller'

function getHash() {
  if (window.location.hash.slice(1) === '') {
    window.location.hash = '#about';
  }
  const hash = window.location.hash.slice(1);
  return hash;
}

function highlightRoute(hash) {
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
  routeNavItem.classList.add('nav__item_active');
}

function handleHash() {
  const name = getHash();
  const routeName = `${name}Route`;
  highlightRoute(name);
  controller[routeName]();
}

export const router = {
  changePageByHash() {
    window.addEventListener('hashchange', handleHash);
    handleHash();
  }
};