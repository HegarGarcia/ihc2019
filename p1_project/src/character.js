export default class Character {
  constructor({ spritePath, width, height, cellSize = 50, p5 }) {
    this.p5 = p5;
    this.sprite = this.p5.loadImage(spritePath);
    this.position = {
      x: 0,
      y: 0
    };
    this.limits = {
      width: width / cellSize - 1,
      height: height / cellSize - 1
    };
    this.distance = 50;
    this.margin = 10;
    this.size = 30;
  }

  update() {
    this.checkSafeZone();
    const x = this.position.x * this.distance + this.margin;
    const y = this.position.y * this.distance + this.margin;
    this.p5.image(this.sprite, x, y, this.size, this.size);
  }

  checkSafeZone() {
    this.position.x =
      this.position.x < 0
        ? 0
        : this.position.x > this.limits.width
        ? this.limits.width
        : this.position.x;

    this.position.y =
      this.position.y < 0
        ? 0
        : this.position.y > this.limits.height
        ? this.limits.height
        : this.position.y;
  }

  right() {
    this.position.x += 1;
  }

  left() {
    this.position.x -= 1;
  }

  up() {
    this.position.y -= 1;
  }

  down() {
    this.position.y += 1;
  }

  move(direction) {
    switch (direction) {
      case "left":
        this.left();
        break;
      case "right":
        this.right();
        break;
      case "up":
        this.up();
        break;
      case "down":
        this.down();
        break;
    }
  }
}
