import { GaragePage } from './page';

export const controller = {
  garageRoute() {
    console.log("entry: garageRoute()");
    const garagePage = new GaragePage();
    garagePage.fetchData(garagePage.pageNum, true);
  }
}
