import stylesUrl from './NumberPad.css?url';

class NumberPad extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.timeout = null;
    this.onKeyDownBound = this.onKeyDown.bind(this);
    this.onKeyupBound = this.onKeyup.bind(this);
  }

  connectedCallback() {
    this.render();
    document.addEventListener('keydown', this.onKeyDownBound);
    document.addEventListener('keyup', this.onKeyupBound);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.onKeyDownBound);
    document.removeEventListener('keyup', this.onKeyupBound);
  }

  onTap(e) {
    const el = e.currentTarget;
    clearTimeout(this.timeout);
    el.classList.add('pressed');
    this.timeout = setTimeout(() => {
      el.classList.remove('pressed');
    }, 200);
    this.dispatchEvent(new CustomEvent('tapped-button', { detail: el.innerText.trim() }));
  }

  onKeyup(e) {
    const isBackspace = e.key === 'Backspace';
    const isEnter = e.key === 'Enter';
    const isNumber = this.isNumberKey(e.key);
    if (isNumber) {
      this.dispatchEvent(new CustomEvent('tapped-button', { detail: e.key }));
    }
    if (isBackspace) {
      this.dispatchEvent(new CustomEvent('tapped-button', { detail: '<' }));
    }
    if (isEnter) {
      this.dispatchEvent(new CustomEvent('tapped-button', { detail: 'Enter' }));
    }
    if (isNumber || isBackspace || isEnter) {
      const key = isBackspace ? 'Backspace' : isEnter ? 'Enter' : e.key;
      const buttonEl = this.shadowRoot.querySelector(`.button-${key}`);
      if (buttonEl) {
        buttonEl.classList.add('pressed');
        setTimeout(() => {
          buttonEl.classList.remove('pressed');
        }, 200);
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  onKeyDown(_e) {}

  isNumberKey(value) {
    var reg = new RegExp('^[0-9]+$');
    return reg.test(value);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${stylesUrl}">
      <div class="NumberPad">
        <div class="button-row">
          <div class="button button-7">7</div>
          <div class="button button-8">8</div>
          <div class="button button-9">9</div>
        </div>
        <div class="button-row">
          <div class="button button-4">4</div>
          <div class="button button-5">5</div>
          <div class="button button-6">6</div>
        </div>
        <div class="button-row">
          <div class="button button-1">1</div>
          <div class="button button-2">2</div>
          <div class="button button-3">3</div>
        </div>
        <div class="button-row">
          <div class="button clear button-Backspace">&lt;</div>
          <div class="button button-0">0</div>
          <div class="button enter button-Enter">Enter</div>
        </div>
      </div>
    `;
    this.shadowRoot.querySelectorAll('.button').forEach((button) => {
      button.addEventListener('click', this.onTap);
    });
  }
}

customElements.define('number-pad', NumberPad);
