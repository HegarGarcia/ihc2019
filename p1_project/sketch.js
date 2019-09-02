const speechRec = new p5.SpeechRec();
const width = 1900;
const height = 975;
const directions = ["up", "down", "left", "right"];

let recordBtn = {};
let character = {};

function preload() {
  character = new Character("assets/hegar_small.jpeg");
  recordBtn = new Button(speechRec);
}

function setup() {
  createCanvas(width, height);
  speechRec.onResult = gotSpeech;
}

function draw() {
  background(153);
  character.update();
  recordBtn.draw();
}

function keyPressed() {
  moveCharacter();
}

function gotSpeech() {
  if (!speechRec.resultValue) {
    return;
  }

  const result = speechRec.resultString.toLowerCase();

  const direction = directions.find(
    direction => result.indexOf(direction) != -1
  );

  if (direction === -1) {
    return;
  }

  moveCharacter(direction);
}

function mousePressed() {
  recordBtn.clicked();
}

function moveCharacter(direction) {
  switch (keyCode || direction) {
    case LEFT_ARROW:
    case "left":
      character.left();
      break;
    case RIGHT_ARROW:
    case "right":
      character.right();
      break;
    case UP_ARROW:
    case "up":
      character.up();
      break;
    case DOWN_ARROW:
    case "down":
      character.down();
      break;
  }
}
