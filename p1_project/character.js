class Character {
  x = 0;
  y = 0;
  distance = 50;
  sprite = {};
  limit = { width: 0, height: 0 };

  constructor(spritePath) {
    this.limit.width = width - this.distance;
    this.limit.height = height - this.distance;
    this.sprite = loadImage(spritePath);
  }

  update() {
    image(this.sprite, this.x, this.y, 50, 50);
  }

  right() {
    this.x += this.distance;

    if (this.x >= this.limit.width) {
      this.x = this.limit.width;
    }
  }

  left() {
    this.x -= this.distance;
    if (this.x < 0) this.x = 0;
  }

  up() {
    this.y -= this.distance;
    if (this.y < 0) this.y = 0;
  }

  down() {
    this.y += this.distance;

    if (this.y >= this.limit.height) {
      this.y = this.limit.height;
    }
  }
}
