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

        .AboutSection {
          position: absolute;
          width: 0;
          height: 0;
          z-index: 1;
          right: 0;
          bottom: 0;
          z-index: 2;
        }

        .AboutSection.showOptions {
          z-index: 4;
        }

        .overlay {
          transform: translateX(-100vw);
        }

        .about {
          position: absolute;
          text-decoration: none;
        }

        .left-content {
          left: 0;
          width: 50vw;
          height: 100%;
          cursor: pointer;
        }

        .right-content {
          color: var(--black);
        }
      </style>
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
