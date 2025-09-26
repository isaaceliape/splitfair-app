class NumberPad extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.timeout = null;
  }

  connectedCallback() {
    this.render();
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyup);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyup);
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

  onKeyDown(e) {}

  isNumberKey(value) {
    var reg = new RegExp('^[0-9]+$');
    return reg.test(value);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --light-bg: #d9e4ea;
          --dark-bg: #333333;
          --gray: #bdbdbd;
          --black: #0d0b0d;
          --green: #0ecb66;
          --red: #fa4f23;
          --blue: #0b98dd;
          --white: #ffffff;
          --light-bg-02: #cbc9c9;
          --block-height: calc((100vh / 9) - 11px);
          --block-min-height: 55px;
          --block-max-height: 84px;
          --block-height-header: calc(100vh / 9);
        }

        .NumberPad {
          display: flex;
          flex-direction: column;
        }

        .button-row {
          display: grid;
          width: 100%;
          grid-gap: 3px;
          grid-template-columns: 1fr 1fr 1fr;
          margin-bottom: 3px;
          font-family: helvetica;
        }

        .button {
          height: var(--block-height);
          min-height: var(--block-min-height);
          max-height: var(--block-max-height);
          background-color: white;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 200ms ease;
          backface-visibility: hidden;
          user-select: none;
        }

        .button:hover {
          background-color: #ecf8ff;
        }

        .button.pressed {
          transform: scale(0.98);
          opacity: 0.9;
        }

        .button.clear {
          color: var(--red);
        }

        .button.enter {
          color: var(--black);
          background-color: var(--red);
        }

        .button.enter:hover {
          background-color: #fb7755;
        }
      </style>
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
