import styles from './DownloadAppSection.css?raw';

class DownloadAppSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.showOptions = false;
  }

  connectedCallback() {
    this.render();
  }

  onClickDownloadApp(e) {
    e.preventDefault();
    this.showOptions = !this.showOptions;
    this.render();
    this.dispatchEvent(new CustomEvent('is-menu-open', { detail: this.showOptions }));
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <section class="DownloadAppSection ${this.showOptions ? 'showOptions' : ''}">
        <a href="#" class="download-app"> download app </a>
        <div class="overlay">
          <div class="left-content"></div>
          <div class="right-content">
            <a href="#" class="link desktop"> Desktop </a>
            <a href="#" class="link mobile"> Mobile </a>
          </div>
        </div>
      </section>
    `;
    this.shadowRoot
      .querySelector('.download-app')
      .addEventListener('click', this.onClickDownloadApp);
    this.shadowRoot
      .querySelector('.left-content')
      .addEventListener('click', this.onClickDownloadApp);
  }
}

customElements.define('download-app-section', DownloadAppSection);
