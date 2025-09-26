import globalStore from '../store/globalStore.js';

class App extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.firstSalary = '0';
    this.secondSalary = '0';
    this.expenses = '0';
    this.selectedField = 'firstSalary';
    this.showCanvas = false;
    this.store = globalStore;
  }

  connectedCallback() {
    this.render();
  }

  onInputFirstName(e) {
    this.store.mutations.updateFirstPerson({ name: e.target.value });
    this.render();
  }

  onInputSecondName(e) {
    this.store.mutations.updateSecondPerson({ name: e.target.value });
    this.render();
  }

  onFocusFirstSalary() {
    this.setSelectedField('firstSalary');
  }

  onFocusSecondSalary() {
    this.setSelectedField('secondSalary');
  }

  onFocusExpenses() {
    this.setSelectedField('expenses');
  }

  onTapButtonNumberpad(e) {
    const tappedButton = e.detail;
    if (tappedButton === '<') {
      if (this.selectedField === 'firstSalary') {
        this.firstSalary = '0';
      } else if (this.selectedField === 'secondSalary') {
        this.secondSalary = '0';
      } else if (this.selectedField === 'expenses') {
        this.expenses = '0';
      }
      this.render();
      return;
    }
    if (tappedButton === 'Enter') {
      return;
    }
    if (this.selectedField === 'firstSalary') {
      if (this.firstSalary.length > 7) return;
      this.firstSalary = this.firstSalary === '0' ? tappedButton : this.firstSalary + tappedButton;
    } else if (this.selectedField === 'secondSalary') {
      if (this.secondSalary.length > 7) return;
      this.secondSalary =
        this.secondSalary === '0' ? tappedButton : this.secondSalary + tappedButton;
    } else if (this.selectedField === 'expenses') {
      if (this.expenses.length > 7) return;
      this.expenses = this.expenses === '0' ? tappedButton : this.expenses + tappedButton;
    }
    this.render();
  }

  calculate() {
    if (this.firstSalary === '0' || this.secondSalary === '0' || this.expenses === '0') return;
    let sum = 0;
    let incrementPercent = 0;
    const format = (val, decimals = 1) => parseFloat(val.toFixed(decimals));
    const p1 = {
      salary: this.firstSalary,
      total: 0,
    };
    const p2 = {
      salary: this.secondSalary,
      total: 0,
    };
    while (sum <= parseFloat(this.expenses)) {
      p1.total = format((Number(this.firstSalary) / 100) * incrementPercent, 0);
      p2.total = format((Number(this.secondSalary) / 100) * incrementPercent, 0);
      sum = p1.total + p2.total;
      incrementPercent += 0.01;
    }
    this.store.mutations.setDebts(parseFloat(this.expenses));
    this.store.mutations.setBasePercentage(format(incrementPercent));
    this.store.mutations.updateFirstPerson(p1);
    this.store.mutations.updateSecondPerson(p2);
    this.render();
  }

  onClickClear() {
    this.firstSalary = '0';
    this.secondSalary = '0';
    this.expenses = '0';
    this.store.mutations.reset();
    this.render();
  }

  onClickShare() {
    this.showCanvas = true;
    this.render();
  }

  setSelectedField(field) {
    this.selectedField = field;
    this.render();
  }

  render() {
    const firstPerson = this.store.state.firstPerson;
    const secondPerson = this.store.state.secondPerson;
    const currency = this.store.state.currency;
    const basePercentage = this.store.state.basePercentage;
    const shouldShowResults = basePercentage !== 0;
    const firstPersonResultName = firstPerson.name ? firstPerson.name : 'First person';
    const secondPersonResultName = secondPerson.name ? secondPerson.name : 'Second person';

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

        @keyframes blink-animation {
          to {
            visibility: hidden;
          }
        }

        .App {
          width: 400px;
        }

        :host(.menuOpened) .App {
          transform: translate3d(-25vw, -50%, 0);
        }

        .bg {
          display: none;
          background-color: var(--black);
          width: 100%;
          max-width: 414px;
          margin: 0 auto;
          padding: 3px;
          box-sizing: border-box;
          font-family: Helvetica;
          font-size: 24px;
          border-radius: 9px;
          padding-bottom: 38px;
          position: relative;
          border: 10px solid var(--light-bg);
          box-shadow: 0px 0px 40px var(--white);
          transform: translate3d(-50%, -50%, 0);
          transition: transform 500ms ease;
          left: 50%;
          top: 50%;
          position: absolute;
        }

        .App .bg {
          background-color: var(--black);
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: -1;
          border-radius: 9px;
          left: 0;
          top: 0;
        }

        .App header {
          margin-bottom: 3px;
          border-radius: 10px 10px 0 0;
          overflow: hidden;
        }

        .App header .wrap-logo {
          display: grid;
          width: 100%;
          grid-gap: 3px;
          grid-template-columns: 1fr 1fr 1fr;
        }

        .App header .wrap-logo .logo {
          height: 70%;
        }

        .App .block {
          background-color: white;
          box-sizing: border-box;
          border-radius: 9px;
          padding: 0 29px;
          display: flex;
          height: var(--block-height);
          min-height: var(--block-min-height);
          max-height: var(--block-max-height);
          justify-content: center;
          align-items: center;
        }

        .App .input {
          background-color: transparent;
          border: 0;
          width: 100%;
          height: 100%;
          text-align: center;
          font-size: 24px;
          outline: none;
          position: relative;
        }

        .App .input::-webkit-outer-spin-button,
        .App .input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .App .input[type='number'] {
          -moz-appearance: textfield;
          appearance: textfield;
        }

        .App .input::placeholder {
          color: var(--gray);
        }

        .App .input.firstSalaryField,
        .App .input.secondSalaryField {
          color: var(--green);
        }

        .App .input.expensesField {
          color: var(--red);
        }

        .App .split-btn {
          height: var(--block-height);
          min-height: var(--block-min-height);
          max-height: var(--block-max-height);
          width: 100%;
          font-style: normal;
          font-weight: normal;
          font-size: 24px;
          line-height: 24px;
          text-align: center;
          background-color: var(--blue);
          color: var(--light-bg);
          border: 0;
          outline: 0;
          margin-bottom: 3px;
           cursor: url(/splitfair-pwa/cursor-red.png), auto;
        }

        .App .split-btn:hover,
        .App .split-btn:focus {
          background-color: #0a8ac5;
        }

        .incomings {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .wrap-income {
          display: grid;
          grid-gap: 3px;
          grid-template-columns: minmax(43%, 1fr) minmax(calc(57% - 3px), 1fr);
          height: var(--block-height);
          min-height: var(--block-min-height);
          max-height: var(--block-max-height);
          margin-bottom: 3px;
        }

        .label,
        .income {
          display: flex;
          align-items: center;
          font-style: normal;
          font-weight: normal;
          font-size: 24px;
          line-height: 24px;
          text-align: center;
        }

        .label {
          justify-content: center;
        }

        .income {
          color: var(--green);
          justify-content: flex-end;
        }

        .expenses {
          display: grid;
          grid-gap: 3px;
          grid-template-columns: minmax(43%, 1fr) minmax(calc(57% - 3px), 1fr);
          height: var(--block-height);
          min-height: var(--block-min-height);
          max-height: var(--block-max-height);
          margin-bottom: 3px;
        }

        .expenses.active .value::before {
          opacity: 1;
          animation: blink-animation 1s steps(5, start) infinite;
        }

        .expenses .label {
          background-color: var(--red);
          color: var(--black);
        }

        .expenses .value {
          background-color: var(--black);
          color: var(--red);
          justify-content: flex-end;
          position: relative;
        }

        .expenses .value::before {
          content: '';
          width: 4px;
          height: 40px;
          background-color: var(--red);
          margin-right: 5px;
          opacity: 0;
          display: inline-block;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }

        .results {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .results .title {
          margin-bottom: 3px;
        }

        .results .wrap-results {
          display: grid;
          grid-gap: 3px;
          grid-template-columns: minmax(43%, 1fr) minmax(calc(57% - 3px), 1fr);
          height: var(--block-height);
          min-height: var(--block-min-height);
          max-height: var(--block-max-height);
          margin-bottom: 3px;
        }

        .results .wrap-results .value {
          justify-content: flex-end;
          color: var(--blue);
        }

        .results .percent-each {
          margin-bottom: 3px;
        }

        .results .wrap-buttons {
          display: grid;
          grid-gap: 3px;
          grid-template-columns: minmax(calc(67% - 3px), 1fr) minmax(33%, 1fr);
          height: var(--block-height);
          min-height: var(--block-min-height);
          max-height: var(--block-max-height);
          margin-bottom: 3px;
        }

        .results .wrap-buttons .share {
          background-color: var(--blue);
          color: var(--white);
        }

        .results .wrap-buttons .clear {
          background-color: var(--red);
          color: var(--black);
        }
      </style>
      <div class="App">
        <div class="bg"></div>
        <header>
          <div class="wrap-logo">
            <div class="block block-02"></div>
             <div class="block block-03">
               <img src="/splitfair-pwa/logo.svg" alt="logo" class="logo" />
             </div>
            <div class="block block-04"></div>
          </div>
        </header>
        <section class="incomings">
          <div class="wrap-income">
            <h2 class="block label">
              <input
                value="${firstPerson.name}"
                type="text"
                placeholder="Name"
                tabindex="1"
                class="input"
                autofocus
              />
            </h2>
            <div class="block income ${this.selectedField === 'firstSalary' ? 'active' : ''}">
              ${this.firstSalary !== '0' ? `<span>${currency}</span>` : ''}
              <input
                value="${this.firstSalary}"
                type="text"
                placeholder="salary"
                tabindex="3"
                class="input firstSalaryField"
                readonly
              />
            </div>
          </div>
          <div class="wrap-income">
            <h2 class="block label">
              <input
                value="${secondPerson.name}"
                type="text"
                placeholder="Name"
                tabindex="2"
                class="input"
              />
            </h2>
            <div class="block income ${this.selectedField === 'secondSalary' ? 'active' : ''}">
              ${this.secondSalary !== '0' ? `<span>${currency}</span>` : ''}
              <input
                value="${this.secondSalary}"
                type="number"
                placeholder="salary"
                tabindex="4"
                class="input secondSalaryField"
                readonly
              />
            </div>
          </div>
        </section>
        <section class="expenses ${this.selectedField === 'expenses' ? 'active' : ''}">
          <div class="block label">Expenses</div>
          <div class="block value">
            ${this.expenses !== '0' ? `<span>${currency}</span>` : ''}
            <input
              value="${this.expenses}"
              type="text"
              placeholder="expenses"
              tabindex="5"
              class="input expensesField"
              readonly
            />
          </div>
        </section>
        <a class="block split-btn" tabindex="6"> Split </a>
        <number-pad></number-pad>
        ${
          shouldShowResults
            ? `
        <section class="results">
          <div class="block title">Results</div>
          <div class="wrap-results">
            <div class="block label">${firstPersonResultName}</div>
            <div class="block value">${currency}${firstPerson.total}</div>
          </div>
          <div class="wrap-results">
            <div class="block label">${secondPersonResultName}</div>
            <div class="block value">${currency}${secondPerson.total}</div>
          </div>
          <div class="block percent-each">%${basePercentage} each</div>
          <div class="wrap-buttons">
            <div class="block share">Share</div>
            <div class="block clear">Clear</div>
          </div>
        </section>
        `
            : ''
        }
        ${this.showCanvas ? `<share-canvas first-person='${JSON.stringify(firstPerson)}' second-person='${JSON.stringify(secondPerson)}' currency='${currency}'></share-canvas>` : ''}
      </div>
    `;

    // Add event listeners
    const inputs = this.shadowRoot.querySelectorAll('input[placeholder="Name"]');
    inputs[0].addEventListener('input', this.onInputFirstName);
    inputs[1].addEventListener('input', this.onInputSecondName);

    this.shadowRoot
      .querySelector('.firstSalaryField')
      .addEventListener('focus', this.onFocusFirstSalary);
    this.shadowRoot
      .querySelector('.secondSalaryField')
      .addEventListener('focus', this.onFocusSecondSalary);
    this.shadowRoot.querySelector('.expensesField').addEventListener('focus', this.onFocusExpenses);

    this.shadowRoot.querySelector('.split-btn').addEventListener('click', this.calculate);

    this.shadowRoot
      .querySelector('number-pad')
      .addEventListener('tapped-button', this.onTapButtonNumberpad);

    if (shouldShowResults) {
      this.shadowRoot.querySelector('.clear').addEventListener('click', this.onClickClear);
      this.shadowRoot.querySelector('.share').addEventListener('click', this.onClickShare);
    }
  }
}

customElements.define('app-component', App);
