export default class Cell {
  constructor({ x, y, width = 50, p5 }) {
    this.index = {
      x,
      y
    };
    this.coords = {
      x: x * width,
      y: y * width
    };
    this.width = width;
    this.p5 = p5;
    this.visited = false;
    this.hasWall = { up: true, down: true, right: true, left: true };
  }

  show() {
    const { x, y } = this.coords;

    this.p5.strokeWeight(2);
    this.p5.stroke(255);

    if (this.hasWall.up) {
      this.p5.line(x, y, x + this.width, y);
    }

    if (this.hasWall.right) {
      this.p5.line(x + this.width, y, x + this.width, y + this.width);
    }

    if (this.hasWall.down) {
      this.p5.line(x + this.width, y + this.width, x, y + this.width);
    }

    if (this.hasWall.left) {
      this.p5.line(x, y + this.width, x, y);
    }
  }

  removeWalls(cell) {
    const x = this.index.x - cell.index.x;
    const y = this.index.y - cell.index.y;

    if (x === 1) {
      this.hasWall.left = false;
    } else if (x === -1) {
      this.hasWall.right = false;
    }

    if (y === 1) {
      this.hasWall.up = false;
    } else if (y === -1) {
      this.hasWall.down = false;
    }
  }
}
