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

        .DownloadAppSection {
          position: absolute;
          width: 0;
          height: 0;
          z-index: 2;
          right: 0;
          top: 0;
        }

        .DownloadAppSection.showOptions {
          z-index: 4;
        }

        .DownloadAppSection.showOptions .overlay {
          transform: translateX(-100vw);
        }

        .download-app {
          position: absolute;
          text-decoration: none;
          color: var(--black);
          font-size: 28px;
          top: 4vw;
          right: 5vw;
          z-index: 0;
          white-space: nowrap;
        }

        .download-app:hover {
          color: var(--red);
        }

        .overlay {
          position: absolute;
          left: 0;
          top: 0;
          width: 100vw;
          height: 100vh;
          transition: 500ms ease;
          transform: translateX(0vw);
          background: url('/desktop_bg.png') 76% center no-repeat;
          background-size: cover;
        }

        .left-content {
          position: absolute;
          left: 0;
          width: 50vw;
          height: 100%;
          cursor: pointer;
          cursor: url('/cursor-cross-red.png'), auto;
        }

        .right-content {
          width: 50vw;
          position: absolute;
          right: 0;
          height: 100%;
          background-color: var(--red);
          text-align: left;
          padding: 2vw 7vw;
          box-sizing: border-box;
          cursor: url('/cursor-black.png'), auto;
        }

        .link {
          font-size: 128px;
          text-decoration: none;
          display: block;
          color: var(--black);
          position: absolute;
        }

        .link:hover {
          color: var(--white);
          cursor: url('/cursor-black.png'), auto;
        }

        .link.desktop {
          left: 7vw;
          top: 3vw;
        }

        .link.mobile {
          left: 7vw;
          bottom: 3vw;
        }
      </style>
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
