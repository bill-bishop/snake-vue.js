class Grid extends Array {
  constructor(size, valueFn) {
    super();

    for (var i = 0; i < size; i++) {
      this[i] = [];
      for (var j = 0; j < size; j++) {
        this[i][j] = valueFn(i, j);
      }
    }
  }

  // problems with extending array
  static random(grid) {
    var x = Math.floor(Math.random() * grid.length);
    var y = Math.floor(Math.random() * grid[x].length);
    return grid[x][y];
  }
}

export default Grid;
