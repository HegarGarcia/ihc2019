const speechRec = new p5.SpeechRec();
const width = 1900;
const height = 950;

const actionsRegex = /\b(move|move to|go to|go|descent|ascent)\b/g;
const hasDirectionsRegex = /\b(move|move to|go to|go)\s(the|to|to the|to my)?\s?(right|left|up|down)\b/g;
const directionsRegex = /\b(right|left|up|down|descent|ascent)\b/g;
const hasNegationRegex = /\b(do not|don't|not)\s(move|go to|go)\b/g;

let recordBtn = {};
let character = {};

function preload() {
  character = new Character({
    spritePath: "./assets/hegar_small.jpeg",
    canvasWidth: width,
    canvasHeight: height
  });

  recordBtn = new Button({
    action: () => speechRec.start(),
    radius: 50,
    x: width,
    y: height
  });
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
  character.move();
}

function mousePressed() {
  recordBtn.clicked();
}

function gotSpeech() {
  if (!speechRec.resultValue) {
    return;
  }

  console.log(speechRec.resultString);

  const speech = speechRec.resultString.toLowerCase();

  const hasAction = actionsRegex.test(speech);
  const hasNegation = hasNegationRegex.test(speech);
  const hasDirection = hasDirectionsRegex.test(speech);

  if (!hasAction || hasNegation || !hasDirection) {
    return;
  }

  const direction = directionsRegex.exec(speech);

  console.log("Moving...");

  if (direction) {
    character.move(direction[0]);
  }
}
