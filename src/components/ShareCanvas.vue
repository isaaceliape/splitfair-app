<template>
  <div
    ref="canvas"
    class="ShareCanvas"
  />
</template>

<script>
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
  y: GAP
};

export default {
  props: {
    firstPerson: {
      type: Object,
      default: () => ({
        name: '',
      }),
    },
    secondPerson: {
      type: Object,
      default: () => ({
        name: 'person 1',
      }),
    },
    expenses: {
      type: String,
      default: '0',
    },
    currency: {
      type: String,
      default: '$',
    },
  },
  mounted() {
    const { canvas } = this.$refs;

    this.stage = new Konva.Stage({
      container: canvas,
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
  },
  methods: {
    drawHeader() {
      const smallBox1 = new Konva.Rect({...SMALL_BOX, x: GAP, y: GAP});
      const logo = new Konva.Rect(LOGO);
      const smallBox2 = new Konva.Rect({...SMALL_BOX,
        x: SMALL_BOX.width + LOGO.width + 13,
        y: GAP
      });

      Konva.Image.fromURL('/img/logo.ea9ec231.svg', (image) => {
        image.setAttrs({
          x: (CANVAS_WIDTH / 2) - 20,
          y: 35,
          scaleX: 1,
        });
        this.layer.add(image);
        this.layer.draw();
      });

      this.layer.add(smallBox1);
      this.layer.add(logo);
      this.layer.add(smallBox2);
    },
    drawRow1() {
      this.ROW_1_COL_1 = {
        ...MEDIUM_BOX,
        x: 3,
        y: HEADER_HEIGHT + 8,
      };

      this.ROW_1_COL_2 = {
        ...LARGE_BOX,
        x: this.ROW_1_COL_1.width + 8,
        y: HEADER_HEIGHT + 8,
      };

      const FIRST_NAME = {
        ...DEFAULT_TEXT,
        width: this.ROW_1_COL_1.width,
        height: this.ROW_1_COL_1.height,
        x: this.ROW_1_COL_1.x,
        y: this.ROW_1_COL_1.y + (this.ROW_1_COL_1.height / 2) - (FONT_SIZE / 2),
        text: this.firstPerson.name,
      };

      const FIRST_SALARY = {
        ...DEFAULT_TEXT,
        width: this.ROW_1_COL_2.width,
        height: this.ROW_1_COL_2.height,
        x: this.ROW_1_COL_2.x,
        y: this.ROW_1_COL_2.y + (this.ROW_1_COL_2.height / 2) - (FONT_SIZE / 2),
        text: `${this.currency}${this.firstPerson.salary}`,
      };

      this.layer.add(new Konva.Rect(this.ROW_1_COL_1));
      this.layer.add(new Konva.Rect(this.ROW_1_COL_2));
      this.layer.add(new Konva.Text(FIRST_NAME));
      this.layer.add(new Konva.Text(FIRST_SALARY));
    },
    drawRow2() {
      this.ROW_2_COL_1 = {
        ...this.ROW_1_COL_1,
        y: this.ROW_1_COL_1.y + this.ROW_1_COL_1.height + 5,
      };

      this.ROW_2_COL_2 = {
        ...this.ROW_1_COL_2,
        y: this.ROW_1_COL_2.y + this.ROW_1_COL_2.height + 5,
      };

      const SECOND_NAME = {
        ...DEFAULT_TEXT,
        width: this.ROW_2_COL_1.width,
        height: this.ROW_2_COL_1.height,
        x: this.ROW_2_COL_1.x,
        y: this.ROW_2_COL_1.y + (this.ROW_2_COL_1.height / 2) - (FONT_SIZE / 2),
        text: this.secondPerson.name,
      };

      const SECOND_SALARY = {
        ...DEFAULT_TEXT,
        width: this.ROW_2_COL_2.width,
        height: this.ROW_2_COL_2.height,
        x: this.ROW_2_COL_2.x,
        y: this.ROW_2_COL_2.y + (this.ROW_2_COL_2.height / 2) - (FONT_SIZE / 2),
        text: `${this.currency}${this.secondPerson.salary}`,
      };

      this.layer.add(new Konva.Rect(this.ROW_2_COL_1));
      this.layer.add(new Konva.Rect(this.ROW_2_COL_2));
      this.layer.add(new Konva.Text(SECOND_NAME));
      this.layer.add(new Konva.Text(SECOND_SALARY));
    },
    drawRow3() {
    },
  }
};
</script>

<style lang="scss">
  .ShareCanvas {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate3d(-150%, -50%, 0);
  }
</style>