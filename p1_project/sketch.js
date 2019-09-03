const speechRec = new p5.SpeechRec();
const width = 1900;
const height = 975;

const actionsRegex = /\b(move|move to|go to|go)\b/g;
const hasDirectionsRegex = /\b(move|move to|go to|go)\s(the)?\s?(right|left|up|down)\b/g;
const directionsRegex = /\b(right|left|up|down)\b/g;
const negationRegex = /\b(do not|don't|not)\s(move|go to|go)\b/g;

const actions = ["move", "go to", "go"];
const directions = ["up", "down", "left", "right"];
const negations = ["not", "do not ", "don't"];

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

  console.log(speechRec.resultString);
  const speech = speechRec.resultString.toLowerCase();
  const action = actionsRegex.exec(speech);

  if (!action) {
    return;
  }

  const hasNegation = negationRegex.test(speech);

  if (hasNegation) {
    return;
  }

  const hasDirection = hasDirectionsRegex.test(speech);

  if (!hasDirection) {
    return;
  }

  const direction = directionsRegex.exec(speech)

  moveCharacter(direction[0]);
}

function mousePressed() {
  recordBtn.clicked();
}

function moveCharacter(direction) {
  switch (direction) {
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
