import Konva from 'konva';

const LIGHT_BG = '#D9E4EA';
const DARK_BG = '#333333';
const GAP = 3;
const CANVAS_WIDTH = 414;
const CANVAS_HEIGHT = 788;
const HEIGHT = 84;
const HEADER_HEIGHT = 126;
const FONT_SIZE = 24;

const DEFAULT_BOX = {
  stroke: LIGHT_BG,
  strokeWidth: 2,
  cornerRadius: 9,
};

const DEFAULT_TEXT = {
  fontSize: FONT_SIZE,
  fontFamily: 'Helvetica',
  fill: LIGHT_BG,
  align: 'center',
};

const SMALL_BOX = {
  ...DEFAULT_BOX,
  width: 85,
  height: HEADER_HEIGHT,
};

const MEDIUM_BOX = {
  ...DEFAULT_BOX,
  width: 173,
  height: HEIGHT,
};

const LARGE_BOX = {
  ...DEFAULT_BOX,
  width: 230,
  height: HEIGHT,
};

const LOGO = {
  ...DEFAULT_BOX,
  width: 228,
  height: HEADER_HEIGHT,
  x: SMALL_BOX.width + 8,
  y: GAP,
};

import styles from './ShareCanvas.css?raw';

class ShareCanvas extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.firstPerson = { name: '', salary: '' };
    this.secondPerson = { name: 'person 1', salary: '' };
    this.expenses = '0';
    this.currency = '$';
    this.stage = null;
    this.layer = null;
  }

  static get observedAttributes() {
    return ['first-person', 'second-person', 'expenses', 'currency'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'first-person') {
      this.firstPerson = JSON.parse(newValue);
    } else if (name === 'second-person') {
      this.secondPerson = JSON.parse(newValue);
    } else if (name === 'expenses') {
      this.expenses = newValue;
    } else if (name === 'currency') {
      this.currency = newValue;
    }
    if (this.stage) {
      this.draw();
    }
  }

  connectedCallback() {
    this.render();
    this.initCanvas();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="ShareCanvas"></div>
    `;
  }

  initCanvas() {
    const container = this.shadowRoot.querySelector('.ShareCanvas');
    this.stage = new Konva.Stage({
      container: container,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    const bg = new Konva.Rect({
      x: 0,
      y: 0,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      fill: DARK_BG,
    });
    this.layer.add(bg);

    this.drawHeader();
    this.drawRow1();
    this.drawRow2();

    this.layer.draw();
  }

  drawHeader() {
    const smallBox1 = new Konva.Rect({ ...SMALL_BOX, x: GAP, y: GAP });
    const logo = new Konva.Rect(LOGO);
    const smallBox2 = new Konva.Rect({
      ...SMALL_BOX,
      x: SMALL_BOX.width + LOGO.width + 13,
      y: GAP,
    });

    Konva.Image.fromURL(`${import.meta.env.BASE_URL}img/logo.ea9ec231.svg`, (image) => {
      image.setAttrs({
        x: CANVAS_WIDTH / 2 - 20,
        y: 35,
        scaleX: 1,
      });
      this.layer.add(image);
      this.layer.draw();
    });

    this.layer.add(smallBox1);
    this.layer.add(logo);
    this.layer.add(smallBox2);
  }

  drawRow1() {
    const ROW_1_COL_1 = {
      ...MEDIUM_BOX,
      x: 3,
      y: HEADER_HEIGHT + 8,
    };

    const ROW_1_COL_2 = {
      ...LARGE_BOX,
      x: ROW_1_COL_1.width + 8,
      y: HEADER_HEIGHT + 8,
    };

    const FIRST_NAME = {
      ...DEFAULT_TEXT,
      width: ROW_1_COL_1.width,
      height: ROW_1_COL_1.height,
      x: ROW_1_COL_1.x,
      y: ROW_1_COL_1.y + ROW_1_COL_1.height / 2 - FONT_SIZE / 2,
      text: this.firstPerson.name,
    };

    const FIRST_SALARY = {
      ...DEFAULT_TEXT,
      width: ROW_1_COL_2.width,
      height: ROW_1_COL_2.height,
      x: ROW_1_COL_2.x,
      y: ROW_1_COL_2.y + ROW_1_COL_2.height / 2 - FONT_SIZE / 2,
      text: `${this.currency}${this.firstPerson.salary}`,
    };

    this.layer.add(new Konva.Rect(ROW_1_COL_1));
    this.layer.add(new Konva.Rect(ROW_1_COL_2));
    this.layer.add(new Konva.Text(FIRST_NAME));
    this.layer.add(new Konva.Text(FIRST_SALARY));
  }

  drawRow2() {
    const ROW_2_COL_1 = {
      ...MEDIUM_BOX,
      x: 3,
      y: HEADER_HEIGHT + 8 + HEIGHT + 5,
    };

    const ROW_2_COL_2 = {
      ...LARGE_BOX,
      x: ROW_2_COL_1.width + 8,
      y: HEADER_HEIGHT + 8 + HEIGHT + 5,
    };

    const SECOND_NAME = {
      ...DEFAULT_TEXT,
      width: ROW_2_COL_1.width,
      height: ROW_2_COL_1.height,
      x: ROW_2_COL_1.x,
      y: ROW_2_COL_1.y + ROW_2_COL_1.height / 2 - FONT_SIZE / 2,
      text: this.secondPerson.name,
    };

    const SECOND_SALARY = {
      ...DEFAULT_TEXT,
      width: ROW_2_COL_2.width,
      height: ROW_2_COL_2.height,
      x: ROW_2_COL_2.x,
      y: ROW_2_COL_2.y + ROW_2_COL_2.height / 2 - FONT_SIZE / 2,
      text: `${this.currency}${this.secondPerson.salary}`,
    };

    this.layer.add(new Konva.Rect(ROW_2_COL_1));
    this.layer.add(new Konva.Rect(ROW_2_COL_2));
    this.layer.add(new Konva.Text(SECOND_NAME));
    this.layer.add(new Konva.Text(SECOND_SALARY));
  }

  draw() {
    // Redraw if needed
    this.layer.draw();
  }
}

customElements.define('share-canvas', ShareCanvas);
