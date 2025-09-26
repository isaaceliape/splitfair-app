import globalStore from '../store/globalStore.js';

import styles from './App.css?raw';

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
    this.onFocusFirstSalaryBound = this.onFocusFirstSalary.bind(this);
    this.onFocusSecondSalaryBound = this.onFocusSecondSalary.bind(this);
    this.onFocusExpensesBound = this.onFocusExpenses.bind(this);
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
      <style>${styles}</style>
      <div class="App">
        <div class="bg"></div>
        <header>
          <div class="wrap-logo">
            <div class="block block-02"></div>
             <div class="block block-03">
                <img src="/splitfair-app/logo.svg" alt="logo" class="logo" />
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
      .addEventListener('focus', this.onFocusFirstSalaryBound);
    this.shadowRoot
      .querySelector('.secondSalaryField')
      .addEventListener('focus', this.onFocusSecondSalaryBound);
    this.shadowRoot
      .querySelector('.expensesField')
      .addEventListener('focus', this.onFocusExpensesBound);

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
