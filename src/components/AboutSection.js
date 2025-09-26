import stylesUrl from './AboutSection.css?url';

class AboutSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.showOptions = false;
  }

  connectedCallback() {
    this.render();
  }

  onClickAboutBtn(e) {
    e.preventDefault();
    this.showOptions = !this.showOptions;
    this.render();
    this.dispatchEvent(new CustomEvent('is-menun-open', { detail: this.showOptions }));
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${stylesUrl}">
      <section class="AboutSection ${this.showOptions ? 'showOptions' : ''}">
        <a href="#" class="about"> about </a>
        <div class="overlay">
          <div class="left-content"></div>
          <div class="right-content">
            <h1 class="title">About</h1>
          </div>
        </div>
      </section>
    `;
    this.shadowRoot.querySelector('.about').addEventListener('click', this.onClickAboutBtn);
    this.shadowRoot.querySelector('.left-content').addEventListener('click', this.onClickAboutBtn);
  }
}

customElements.define('about-section', AboutSection);
