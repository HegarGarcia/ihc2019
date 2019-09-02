class Button {
  constructor(speech) {
    this.radius = 50;
    this.x = width - 50;
    this.y = height - 50;
    this.speech = speech;
  }

  clicked() {
    const distance = dist(mouseX, mouseY, this.x, this.y);

    if (distance < this.radius) {
      this.speech.start();
    }
  }

  draw() {
    circle(this.x, this.y, this.radius);
    noStroke();
    fill(255, 0, 0);
  }
}
