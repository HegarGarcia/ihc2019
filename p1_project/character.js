class Character {
  x = 0;
  y = 0;
  distance = 50;
  sprite = {};
  limit = { width: 0, height: 0 };

  constructor({spritePath, canvasWidth, canvasHeight}) {
    this.limit.width = canvasWidth - this.distance;
    this.limit.height = canvasHeight - this.distance;
    this.sprite = loadImage(spritePath);
  }

  update() {
    this.checkSafeZone();
    image(this.sprite, this.x, this.y, 50, 50);
  }

  checkSafeZone() {
    this.x =
      this.x < 0 ? 0 : this.x >= this.limit.width ? this.limit.width : this.x;
    this.y =
      this.y < 0 ? 0 : this.y >= this.limit.height ? this.limit.height : this.y;
  }

  right() {
    this.x += this.distance;
  }

  left() {
    this.x -= this.distance;
  }

  up() {
    this.y -= this.distance;
  }

  down() {
    this.y += this.distance;
  }

  move(direction) {
    switch (direction || keyCode) {
      case LEFT_ARROW:
      case "left":
        this.left();
        break;
      case RIGHT_ARROW:
      case "right":
        this.right();
        break;
      case UP_ARROW:
      case "up":
        this.up();
        break;
      case DOWN_ARROW:
      case "down":
      case "descent":
        this.down();
        break;
    }
  }
}
