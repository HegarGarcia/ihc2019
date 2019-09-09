import p5Dom from "p5";
import Character from "./character";
import Button from "./button";
import Speech from "./speech";
import Maze from "./maze";

const speech = new Speech();

const width = 1850;
const height = 950;

let recordBtn = {};
let character = {};
let maze = {};

const build = sk => {
  sk.preload = () => (speech.onResult = gotSpeech);

  sk.setup = () => {
    sk.createCanvas(width, height);

    character = new Character({
      spritePath: "../assets/hegar_small.jpeg",
      width,
      height,
      p5: sk
    });

    recordBtn = new Button({
      action: () => speech.start(),
      radius: 50,
      x: width,
      y: height,
      p5: sk
    });

    maze = new Maze({ width, height, p5: sk });
  };

  sk.draw = () => {
    sk.background(51);
    maze.show();
    character.update();
    recordBtn.draw();
  };

  sk.keyPressed = () => {
    let direction = "";

    switch (sk.keyCode) {
      case sk.LEFT_ARROW:
        direction = "left";
        break;
      case sk.RIGHT_ARROW:
        direction = "right";
        break;
      case sk.UP_ARROW:
        direction = "up";
        break;
      case sk.DOWN_ARROW:
        direction = "down";
        break;
    }

    move(direction);
  };

  sk.mousePressed = () => {
    recordBtn.clicked();
  };
};

const move = direction => {
  const canMove = maze.canMove({
    from: character.position,
    direction
  });

  if (!canMove) {
    return;
  }

  character.move(direction);
};

const gotSpeech = async () => {
  if (!speech.resultValue) {
    return;
  }

  const { intent, parameters } = await fetch("http://localhost:3000", {
    method: "post",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      text: speech.resultString
    })
  })
    .then(response => response.json())
    .catch(err => {
      console.error(err);
      return { intent: "Error", parameters: {} };
    });

  if (
    intent.displayName !== "Movement" ||
    parameters.fields.Negation.stringValue
  ) {
    return;
  }

  const { Direction } = parameters.fields;

  move(Direction.stringValue);
};

new p5Dom(build);
