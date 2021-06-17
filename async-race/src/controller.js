import { GaragePage } from './page';

const baseUrl = 'http://127.0.0.1:3000';

export const controller = {
  garageRoute() {
    console.log("entry: garageRoute()");
    const garagePage = new GaragePage();

    function fetchData(page, notRendered) {
      console.log("controller: fetchData(1page, notRendered)");
      fetch(`${baseUrl}/garage?_page=${page}&_limit=7`)
        .then((response) => {
          console.log(response);
          const carsNum = Number(response.headers.get('X-Total-Count'));
          garagePage.pageNum = page;
          garagePage.carsAmount = carsNum;
          console.log("controller: center fetchData(), pageNum, carsAmount");
          return response.json();
        })
        .then((carsArr) => {
          console.log('after fetch', carsArr);
          garagePage.updateData(carsArr);
          if (notRendered) {
            console.log("controller: end fetchData(), if notRendered: renderPage()");
            garagePage.renderPage();
          }
          console.log("controller: end fetchData()");
        });
    };

    garagePage.getPrevBtn().onclick = () => {
      let page = garagePage.getPageNum();
      if (page > 1) {
        page -= 1;
        fetchData(page, true);
      }
    };
    garagePage.getNextBtn().onclick = () => {
      let page = garagePage.getPageNum();
      const carsAmount = garagePage.getCarsAmount();
      if (carsAmount - (7 * page) > 0) {
        page += 1;
        fetchData(page, true);
      }
    };

    fetchData(1, true);
  }
}
