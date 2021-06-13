export class DomEl {
  constructor(parentEl, classEl, tagEl = 'div', contentEl = '') {
    const el = document.createElement(tagEl);
    parentEl.appendChild(el);
    el.className = classEl;
    el.innerHTML = contentEl;
    this.el = el;
  }
}