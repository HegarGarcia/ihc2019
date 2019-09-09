export default class Button {
  constructor({ action, radius, x, y, p5 }) {
    this.p5 = p5;
    this.radius = radius;
    this.x = x - this.radius;
    this.y = y - this.radius;
    this.action = action;
  }

  clicked() {
    const distance = this.p5.dist(
      this.p5.mouseX,
      this.p5.mouseY,
      this.x,
      this.y
    );

    if (distance < this.radius) {
      this.action();
    }
  }

  draw() {
    this.p5.circle(this.x, this.y, this.radius);
    this.p5.noStroke();
    this.p5.fill(255, 0, 0);
  }
}
