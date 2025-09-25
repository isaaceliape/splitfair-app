<template>
  <div v-show="false" ref="canvas" class="ShareCanvas" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
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

const props = defineProps({
  firstPerson: {
    type: Object,
    default: () => ({ name: '' }),
  },
  secondPerson: {
    type: Object,
    default: () => ({ name: 'person 1' }),
  },
  expenses: {
    type: String,
    default: '0',
  },
  currency: {
    type: String,
    default: '$',
  },
});

const canvas = ref(null);
let stage = null;
let layer = null;
let ROW_1_COL_1 = null;
let ROW_1_COL_2 = null;
let ROW_2_COL_1 = null;
let ROW_2_COL_2 = null;

function drawHeader() {
  const smallBox1 = new Konva.Rect({ ...SMALL_BOX, x: GAP, y: GAP });
  const logo = new Konva.Rect(LOGO);
  const smallBox2 = new Konva.Rect({
    ...SMALL_BOX,
    x: SMALL_BOX.width + LOGO.width + 13,
    y: GAP,
  });

  Konva.Image.fromURL('/img/logo.ea9ec231.svg', (image) => {
    image.setAttrs({
      x: CANVAS_WIDTH / 2 - 20,
      y: 35,
      scaleX: 1,
    });
    layer.add(image);
    layer.draw();
  });

  layer.add(smallBox1);
  layer.add(logo);
  layer.add(smallBox2);
}

function drawRow1() {
  ROW_1_COL_1 = {
    ...MEDIUM_BOX,
    x: 3,
    y: HEADER_HEIGHT + 8,
  };

  ROW_1_COL_2 = {
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
    text: props.firstPerson.name,
  };

  const FIRST_SALARY = {
    ...DEFAULT_TEXT,
    width: ROW_1_COL_2.width,
    height: ROW_1_COL_2.height,
    x: ROW_1_COL_2.x,
    y: ROW_1_COL_2.y + ROW_1_COL_2.height / 2 - FONT_SIZE / 2,
    text: `${props.currency}${props.firstPerson.salary}`,
  };

  layer.add(new Konva.Rect(ROW_1_COL_1));
  layer.add(new Konva.Rect(ROW_1_COL_2));
  layer.add(new Konva.Text(FIRST_NAME));
  layer.add(new Konva.Text(FIRST_SALARY));
}

function drawRow2() {
  ROW_2_COL_1 = {
    ...ROW_1_COL_1,
    y: ROW_1_COL_1.y + ROW_1_COL_1.height + 5,
  };

  ROW_2_COL_2 = {
    ...ROW_1_COL_2,
    y: ROW_1_COL_2.y + ROW_1_COL_2.height + 5,
  };

  const SECOND_NAME = {
    ...DEFAULT_TEXT,
    width: ROW_2_COL_1.width,
    height: ROW_2_COL_1.height,
    x: ROW_2_COL_1.x,
    y: ROW_2_COL_1.y + ROW_2_COL_1.height / 2 - FONT_SIZE / 2,
    text: props.secondPerson.name,
  };

  const SECOND_SALARY = {
    ...DEFAULT_TEXT,
    width: ROW_2_COL_2.width,
    height: ROW_2_COL_2.height,
    x: ROW_2_COL_2.x,
    y: ROW_2_COL_2.y + ROW_2_COL_2.height / 2 - FONT_SIZE / 2,
    text: `${props.currency}${props.secondPerson.salary}`,
  };

  layer.add(new Konva.Rect(ROW_2_COL_1));
  layer.add(new Konva.Rect(ROW_2_COL_2));
  layer.add(new Konva.Text(SECOND_NAME));
  layer.add(new Konva.Text(SECOND_SALARY));
}

function drawRow3() {
  // Placeholder for future implementation
}

onMounted(() => {
  stage = new Konva.Stage({
    container: canvas.value,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  });

  layer = new Konva.Layer();
  stage.add(layer);

  const bg = new Konva.Rect({
    x: 0,
    y: 0,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    fill: DARK_BG,
  });
  layer.add(bg);

  drawHeader();
  drawRow1();
  drawRow2();

  layer.draw();
});
</script>

<style lang="css" scoped>
.ShareCanvas {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate3d(-150%, -50%, 0);
}
</style>
