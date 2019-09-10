import Cell from "./cell";

export default class Maze {
  constructor({ width, height, cellWidth = 50, p5 }) {
    this.dimensions = {
      width: width / cellWidth,
      height: height / cellWidth
    };
    this.p5 = p5;
    this.availableCells = this.dimensions.width * this.dimensions.height;
    this.visitedCells = 0;

    this.grid = Array.from({ length: this.dimensions.height }, (_, y) =>
      Array.from(
        { length: this.dimensions.width },
        (_, x) => new Cell({ x, y, p5 })
      )
    );

    this.generate();
  }

  generate() {
    let current = this.grid[0][0];
    const stack = [];

    current.visited = true;
    this.visitedCells += 1;

    while (this.visitedCells !== this.availableCells) {
      const next = this.getNextNeighbor(current);

      if (next) {
        next.visited = true;

        stack.push(current);

        next.removeWalls(current);
        current.removeWalls(next);

        current = next;
        this.visitedCells += 1;
      } else if (stack.length > 0) {
        current = stack.pop();
      }
    }
  }

  getNextNeighbor(cell) {
    const { x, y } = cell.index;
    const neighbors = [];

    const left = x - 1 >= 0 && this.grid[y][x - 1];
    const right = x + 1 < this.dimensions.width && this.grid[y][x + 1];
    const top = y - 1 >= 0 && this.grid[y - 1][x];
    const bottom = y + 1 < this.dimensions.height && this.grid[y + 1][x];

    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (right && !right.visited) {
      neighbors.push(right);
    }

    if (top && !top.visited) {
      neighbors.push(top);
    }

    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }

    return neighbors[Math.floor(this.p5.random(0, neighbors.length))];
  }

  canMove({ from, direction }) {
    const cell = this.grid[from.y][from.x];

    return !cell.hasWall[direction];
  }

  show() {
    this.grid.forEach(row => row.forEach(cell => cell.show()));
  }
}
