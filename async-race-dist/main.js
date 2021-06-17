(()=>{"use strict";var e={11:(e,t,a)=>{e.exports=a.p+"assets/car.svg"}},t={};function a(o){var s=t[o];if(void 0!==s)return s.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,a),r.exports}a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var e;a.g.importScripts&&(e=a.g.location+"");var t=a.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var o=t.getElementsByTagName("script");o.length&&(e=o[o.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),a.p=e})(),(()=>{a(11);class e{constructor(e,t,a="div",o=""){const s=document.createElement(a);s.classList=t,s.innerHTML=o,this.el=s,this.parent=e}}class t{constructor(t){this.pageCar=new e(t,["page__car"]),this.carControls=new e(this.pageCar.el,["car__controls"]),this.controlsCarName=new e(this.carControls.el,["controls__car-name"],"p"),this.controlsLine=new e(this.carControls.el,["car__controls_line"]),this.controlsCarDelete=new e(this.controlsLine.el,["controls__car-delete"],"button","delete"),this.controlsCarGo=new e(this.controlsLine.el,["controls__car-go"],"button","Go"),this.controlsCarStop=new e(this.controlsLine.el,["controls__car-stop"],"button","Stop"),this.controlsCarUpdate=new e(this.carControls.el,["controls__car-update"],"button","update"),this.carTrack=new e(this.pageCar.el,["car__track"]),this.trackCarImg=new e(this.carTrack.el,["track__car-img"],"object"),this.trackCarImg.el.setAttribute("type","image/svg+xml"),this.trackCarImg.el.setAttribute("data","assets/car.svg")}}const o="http://127.0.0.1:3000";class s{constructor(){console.log("page: constructor()"),this.pageNum=1,this.carsAmount=0,this.carsArr=[],this.nodes={},this.nodes.container=new e(document.body,["container"]),this.nodes.header=new e(this.nodes.container.el,["header"]),this.nodes.garage=new e(this.nodes.container.el,["garage"]),this.nodes.garageCarsAmount=new e(this.nodes.garage.el,["garage__cars-amount"],"h2",`Garage: ${this.carsAmount} cars`),this.nodes.garagePageControls=new e(this.nodes.garage.el,["garage__page-controls"]),this.nodes.pageControlsPrevBtn=new e(this.nodes.garagePageControls.el,["page-controls__btn page-controls__btn_prev"],"button","prev"),this.nodes.pageControlsPrevBtn.el.onclick=()=>{let e=this.pageNum;e>1&&(e-=1,console.log("click prev btn - if page > 1 - go to page ",e),this.fetchData(e,!0))},this.nodes.pageControlsPageNum=new e(this.nodes.garagePageControls.el,["page-controls__page-number"],"h3",`Page #${this.pageNum}`),this.nodes.pageControlsNextBtn=new e(this.nodes.garagePageControls.el,["page-controls__btn page-controls__btn_next"],"button","next"),this.nodes.pageControlsNextBtn.el.onclick=()=>{let e=this.pageNum;this.carsAmount-7*e>0&&(e+=1,console.log("click prev btn - if page < end page - go to page ",e),this.fetchData(e,!0))},this.nodes.garageCarsControls=new e(this.nodes.garage.el,["garage__cars-controls-container"]),this.nodes.CarsControlsAddOne=new e(this.nodes.garageCarsControls.el,["cars-controls__btn"],"button","add one car"),this.nodes.CarsControlsAddOne.el.onclick=e=>{console.log("click add one btn"),fetch(`${o}/garage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:"Added car",color:"#88f"})}).then((e=>{console.log("add",e),this.fetchData(this.pageNum,!0)}))},this.nodes.CarsControlsAddHundred=new e(this.nodes.garageCarsControls.el,["cars-controls__btn"],"button","add hundred cars"),this.nodes.garagePage=new e(this.nodes.garage.el,["garage__page"]),this.nodes.cars=[];for(let e=0;e<7;e++)this.nodes.cars.push(new t(this.nodes.garagePage.el)),this.nodes.cars[e].controlsCarDelete.el.onclick=e=>{console.log("click delete btn for car #",e.target.dataset.carId),fetch(`${o}/garage/${e.target.dataset.carId}`,{method:"DELETE"}).then((e=>{console.log("delete",e),this.fetchData(this.pageNum,!0)}))}}renderPage(){console.log("page: renderPage()"),Object.values(this.nodes).forEach((e=>{void 0===e.parent?e.forEach(((e,t)=>{t<this.carsArr.length&&Object.values(e).forEach((e=>{e.parent.appendChild(e.el)}))})):e.parent.appendChild(e.el)}))}updateData(e){console.log("page: updateData()"),this.carsArr=e,this.nodes.garageCarsAmount.el.innerText=`Garage: ${this.carsAmount} cars`,this.nodes.pageControlsPageNum.el.innerText=`Page #${this.pageNum}`,this.nodes.cars.forEach(((t,a)=>{void 0!==e[a]?(t.pageCar.el.classList.remove("hidden"),t.trackCarImg.id=e[a].id,t.controlsCarName.el.innerText=e[a].name,t.controlsCarDelete.el.dataset.carId=e[a].id,t.trackCarImg.el.color=e[a].color,t.trackCarImg.el.onload=function(){this.contentDocument.getElementsByClassName("svg")[0].setAttribute("fill",this.color)}):t.pageCar.el.classList.add("hidden")}))}fetchData(e,t){console.log(`page: fetchData(${e}, notRendered)`),fetch(`${o}/garage?_page=${e}&_limit=7`).then((t=>{console.log(t);const a=Number(t.headers.get("X-Total-Count"));return this.pageNum=e,this.carsAmount=a,console.log("page: center fetchData(), pageNum, carsAmount"),t.json()})).then((e=>{console.log("after fetch",e),this.updateData(e),t&&(console.log("page: end fetchData(), if notRendered: renderPage()"),this.renderPage()),console.log("page: end fetchData()")}))}}({garageRoute(){console.log("entry: garageRoute()"),(new s).fetchData(1,!0)}}).garageRoute()})()})();