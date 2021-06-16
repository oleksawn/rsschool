export class DomEl {
  constructor(nodeParent, elClasses, elTag = 'div', elContent = '') {
    const el = document.createElement(elTag);
    el.classList = elClasses;
    el.innerHTML = elContent;
    this.el = el;
    this.parent = nodeParent;
  }
}