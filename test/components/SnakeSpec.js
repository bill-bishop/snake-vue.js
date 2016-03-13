import Vue from 'vue';
import Snake from '../../src/components/Snake.vue';

var app, vm, snake, food;

describe('Snake', function () {
  beforeEach(setup);

  describe('food cell', function () {
    let cell, x, y;

    let getFoodCell = () => app.querySelector(`table tr:nth-child(${x + 1}) td:nth-child(${y + 1})`);

    beforeEach(function () {
      x = food.x;
      y = food.y;
      cell = getFoodCell();
    });

    it('should have a food class', function () {
      expect(cell.getAttribute('class')).toMatch(/food/);
    });

    it('should be the only cell with a food class', function () {
      let foodCells = app.querySelectorAll('td.food');
      expect(foodCells.length).toBe(1);
      expect(foodCells[0]).toEqual(cell);
    });

    it('should be a different cell on next tick', function () {
      vm.tick();
      Vue.nextTick(function () {
        expect(cell).not.toBe(getFoodCell());
      });
    });
  });
  describe('snake cell', function () {
    let cell, x, y;

    let getSnakeCell = () => app.querySelector(`table tr:nth-child(${x + 1}) td:nth-child(${y + 1})`);

    beforeEach(function () {
      x = snake.x;
      y = snake.y;
      cell = getSnakeCell();
    });

    it('should have a snake class', function () {
      expect(cell.getAttribute('class')).toMatch(/snake/);
    });

    it('should be the only cell with a snake class', function () {
      let foodCells = app.querySelectorAll('td.snake');
      expect(foodCells.length).toBe(1);
      expect(foodCells[0]).toEqual(cell);
    });

    it('should be a different cell on next tick', function () {
      vm.tick();
      Vue.nextTick(function () {
        expect(cell).not.toBe(getSnakeCell());
      });
    });
  });
});

function setCells() {
  vm.grid.forEach(row => {
    row.forEach(cell => {
      if (cell.snake) {
        snake = cell;
      }
      if (cell.food) {
        food = cell;
      }
    })
  });
}

function setup() {
  (app = document.createElement('div')).innerHTML = `
  <div id="app">
    <snake></snake>
  </div>
`;
  vm = (new Vue({
    el: app,
    components: {Snake}
  })).$children[0];

  setCells();
}
