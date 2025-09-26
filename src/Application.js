class Application extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.menuOpened = false;
    this.desktopOnly = true;
  }

  connectedCallback() {
    const mql = window.matchMedia('(max-width: 600px)');
    this.desktopOnly = !mql.matches;
    mql.addEventListener('change', this.screenTest);
    this.render();
  }

  moveAppSideways(e) {
    this.menuOpened = e.detail;
    this.render();
  }

  screenTest(e) {
    this.desktopOnly = !e.matches;
    this.render();
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
          font-family: 'Avenir', Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-align: center;
          overflow-y: auto;
          overflow-x: hidden;
          width: 100vw;
          height: 100vh;
          position: relative;
           cursor: url(/splitfair-pwa/cursor-red.png), auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .Application__link {
          position: absolute;
          text-decoration: none;
          color: var(--black);
          font-size: 28px;
          z-index: 1;
          transition: opacity 250ms ease;
        }

        .Application__link.menuOpened {
          opacity: 0;
          pointer-events: none;
        }

        .Application__link.logo {
          top: 4vw;
          left: 5vw;
        }

        .Application__version {
          position: absolute;
          bottom: 4vw;
          left: 5vw;
          color: var(--black);
          font-size: 28px;
          opacity: 0.4;
          transition: opacity 250ms ease;
        }

        .Application__version.menuOpened {
          opacity: 0;
          pointer-events: none;
        }
      </style>
      ${this.desktopOnly ? `<a href="#" class="Application__link logo ${this.menuOpened ? 'menuOpened' : ''}"> splitfair </a>` : ''}
      ${this.desktopOnly ? `<span class="Application__version ${this.menuOpened ? 'menuOpened' : ''}"> v0.1 </span>` : ''}
      <app-component class="${this.menuOpened ? 'menuOpened' : ''}"></app-component>
      ${this.desktopOnly ? '<download-app-section></download-app-section>' : ''}
      ${this.desktopOnly ? '<about-section></about-section>' : ''}
    `;

    if (this.desktopOnly) {
      this.shadowRoot
        .querySelector('download-app-section')
        .addEventListener('is-menu-open', this.moveAppSideways);
      this.shadowRoot
        .querySelector('about-section')
        .addEventListener('is-menu-open', this.moveAppSideways);
    }
  }
}

customElements.define('splitfair-application', Application);
