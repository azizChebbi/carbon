import eventMatches from '../polyfills/event-matches';
import '../polyfills/array-from';
import '../polyfills/object-assign';
import ContentSwitcher from './content-switcher';

export default class Tab extends ContentSwitcher {
  constructor(element, options = {}) {
    super(element, Object.assign({
      selectorMenu: '.bx--tabs__nav',
      selectorTrigger: '.bx--tabs__trigger',
      selectorTriggerText: '.bx--tabs__trigger-text',
      selectorButton: '.bx--tabs__nav-item',
      selectorButtonSelected: '.bx--tabs__nav-item.bx--tabs--selected',
      classActive: 'bx--tabs--selected',
      classHidden: 'bx--tabs--hidden',
      eventBeforeSelected: 'tab-beingselected',
      eventAfterSelected: 'tab-selected',
    }, options));

    const selected = this.element.querySelector(this.options.selectorButtonSelected);
    if (selected) {
      this.updateTriggerText(selected);
    }
  }

  static init(target = document, options) {
    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
    }
    if (target.nodeType === Node.ELEMENT_NODE && target.dataset.tabs !== undefined) {
      this.create(target, options);
    } else {
      [... target.querySelectorAll('[data-tabs]')].forEach(element => this.create(element, options));
    }
  }

  handleClick(event) {
    const button = eventMatches(event, this.options.selectorButton);
    const trigger = eventMatches(event, this.options.selectorTrigger);
    if (button) {
      super.handleClick(event);
      this.updateMenuState();
      this.updateTriggerText(button);
    }
    if (trigger) {
      this.updateMenuState();
    }
  }

  updateMenuState() {
    this.element.querySelector(this.options.selectorMenu).classList.toggle(this.options.classHidden);
  }

  updateTriggerText(target) {
    this.element.querySelector(this.options.selectorTriggerText).textContent = target.textContent;
  }
}

Tab.components = new WeakMap();
