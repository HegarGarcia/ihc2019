class Button {
  constructor({action, radius, x, y}) {
    this.radius = radius;
    this.x = x - this.radius;
    this.y = y - this.radius;
    this.action = action;
  }

  clicked() {
    const distance = dist(mouseX, mouseY, this.x, this.y);

    if (distance < this.radius) {
      this.action()
    }
  }

  draw() {
    circle(this.x, this.y, this.radius);
    noStroke();
    fill(255, 0, 0);
  }
}
