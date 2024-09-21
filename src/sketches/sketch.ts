import p5 from "p5";

let sketch: p5;
let stepNum: number;
let rows: number;
let cols: number;
let cells: number[][];
let weights: number[][];
let update_weights_rule1: () => void;
let update_weights_rule2: () => void;
let update_cells: () => void;
let get_count_of_neighbours: (x: number, y: number) => number;

let speed = 1;
let continueLoop = false;
let ruleSelected = 1;

export const AttachSketchToElement = (
  sketchParent: HTMLElement | undefined
) => {
  sketch = new p5((p5) => {
    rows = 20;
    cols = 20;
    cells = Array.from({ length: rows }, () => new Array(cols).fill(0));
    weights = Array.from({ length: rows }, () => new Array(cols).fill(0));
    cells[rows / 2][cols / 2] = 1;
    const window_size = 450;
    const scale_size = window_size / rows;
    stepNum = 0;

    p5.setup = function () {
      p5.createCanvas(window_size, window_size);
      p5.frameRate(speed);
      p5.noLoop();
    };

    p5.draw = function () {
      stepNum += 1;
      console.log(stepNum);
      p5.background(255, 236, 75);

      if (ruleSelected === 1) update_weights_rule1();
      else update_weights_rule2();
      print_weights();

      //  loop to draw the hexagonal cells
      for (let x = 0; x < rows; ++x) {
        for (let y = 0; y < cols; ++y) {
          if (cells[x][y] === 1) {
            p5.fill(255, 199, 18);
            if (y % 2 === 0) {
              draw_hexagon(x * scale_size + scale_size / 2, y * scale_size);
            } else {
              draw_hexagon(x * scale_size, y * scale_size);
            }
          }
        }
      }
      update_cells();
      if (!continueLoop) {
        p5.noLoop();
      }
    };

    //  method to display weights grid on the window
    function print_weights() {
      p5.fill(0);
      for (let x = 1; x < rows - 1; ++x) {
        for (let y = 1; y < cols - 1; ++y) {
          if (cells[x][y] == 0) {
            if (y % 2 == 0) {
              p5.textSize(12);
              p5.text(
                weights[x][y].toFixed(1),
                x * scale_size + scale_size / 2 - 10,
                y * scale_size + 10
              );
              //  textSize(15)
              //  text(str(x)+" "+str(y),x*scale_size+scale_size/2-10,y*scale_size+15)
            } else {
              p5.textSize(12);
              p5.text(
                weights[x][y].toFixed(1),
                x * scale_size - 10,
                y * scale_size + 10
              );
              //  textSize(15)
              //  text(str(x)+" "+str(y),x*scale_size-10,y*scale_size+15)}
            }
          }
        }
      }
    }

    // method to draw a hexagon with midpoint x,y
    /**
     * @param {number} x
     * @param {number} y
     */
    function draw_hexagon(x: number, y: number) {
      let angle = p5.TWO_PI / 6;
      p5.beginShape();
      let a = p5.TWO_PI / 12;
      while (a < p5.TWO_PI + p5.TWO_PI / 12) {
        let sx = x + (p5.cos(a) * scale_size) / 2;
        let sy = y + (p5.sin(a) * scale_size) / 2;
        p5.vertex(sx, sy);
        a += angle;
      }
      p5.endShape(p5.CLOSE);
    }

    //  method to calculate weights at each grid position and update it in weights list
    //  rule - weight is calculated based on number of immediate weights
    update_weights_rule1 = () => {
      weights = Array.from({ length: rows }, () => new Array(cols).fill(0));

      for (let x = 1; x < rows - 1; ++x) {
        for (let y = 1; y < cols - 1; ++y) {
          if (cells[x][y] === 0) {
            weights[x][y] = get_count_of_neighbours(x, y);
          }
        }
      }
    };

    // method to calculate weights based on neighbours and neighbours of neighbours
    // weight of immediate neighbours is 0.7 and that of neighbours of neighbours is 0.3
    update_weights_rule2 = () => {
      weights = Array.from({ length: rows }, () => new Array(cols).fill(0));
      for (let x = 1; x < rows - 1; x += 1) {
        for (let y = 1; y < cols - 1; y += 1) {
          if (cells[x][y] === 0) {
            weights[x][y] = get_count_of_neighbours(x, y) * 0.2;
            if (y % 2 === 0) {
              weights[x][y] += get_count_of_neighbours(x - 1, y) * 0.8;
              weights[x][y] += get_count_of_neighbours(x + 1, y) * 0.8;
              weights[x][y] += get_count_of_neighbours(x, y - 1) * 0.8;
              weights[x][y] += get_count_of_neighbours(x, y + 1) * 0.8;
              weights[x][y] += get_count_of_neighbours(x + 1, y - 1) * 0.8;
              weights[x][y] += get_count_of_neighbours(x + 1, y + 1) * 0.8;
            } else {
              weights[x][y] += get_count_of_neighbours(x - 1, y) * 0.8;
              weights[x][y] += get_count_of_neighbours(x + 1, y) * 0.8;
              weights[x][y] += get_count_of_neighbours(x, y - 1) * 0.8;
              weights[x][y] += get_count_of_neighbours(x, y + 1) * 0.8;
              weights[x][y] += get_count_of_neighbours(x - 1, y - 1) * 0.8;
              weights[x][y] += get_count_of_neighbours(x - 1, y + 1) * 0.8;
            }
          }
        }
      }
    };

    //method to return count of neighbours at a position
    get_count_of_neighbours = (x: number, y: number) => {
      let weight;
      if (y % 2 === 0) {
        weight =
          cells[p5.constrain(x - 1, 0, rows - 1)][
            p5.constrain(y, 0, cols - 1)
          ] +
          cells[p5.constrain(x + 1, 0, rows - 1)][
            p5.constrain(y, 0, cols - 1)
          ] +
          cells[p5.constrain(x, 0, rows - 1)][
            p5.constrain(y - 1, 0, cols - 1)
          ] +
          cells[p5.constrain(x, 0, rows - 1)][
            p5.constrain(y + 1, 0, cols - 1)
          ] +
          cells[p5.constrain(x + 1, 0, rows - 1)][
            p5.constrain(y - 1, 0, cols - 1)
          ] +
          cells[p5.constrain(x + 1, 0, rows - 1)][
            p5.constrain(y + 1, 0, cols - 1)
          ];
      } else {
        weight =
          cells[p5.constrain(x - 1, 0, rows - 1)][
            p5.constrain(y, 0, cols - 1)
          ] +
          cells[p5.constrain(x + 1, 0, rows - 1)][
            p5.constrain(y, 0, cols - 1)
          ] +
          cells[p5.constrain(x - 1, 0, rows - 1)][
            p5.constrain(y - 1, 0, cols - 1)
          ] +
          cells[p5.constrain(x - 1, 0, rows - 1)][
            p5.constrain(y + 1, 0, cols - 1)
          ] +
          cells[p5.constrain(x, 0, rows - 1)][
            p5.constrain(y - 1, 0, cols - 1)
          ] +
          cells[p5.constrain(x, 0, rows - 1)][p5.constrain(y + 1, 0, cols - 1)];
      }
      return weight;
    };
    // method to find which position has the highest weights and add a cell there
    update_cells = () => {
      let max_x_list: number[], max_y_list: number[], max_neighbor;
      max_x_list = [];
      max_y_list = [];
      max_neighbor = 0;
      for (let x = 0; x < rows; ++x) {
        for (let y = 0; y < cols; ++y) {
          if (weights[x][y] > max_neighbor) {
            max_neighbor = weights[x][y];
            max_x_list = [x];
            max_y_list = [y];
          } else if (weights[x][y] === max_neighbor) {
            max_x_list.push(x);
            max_y_list.push(y);
          }
        }
      }
      let maxIndex = Math.floor(Math.random() * max_x_list.length);
      cells[max_x_list[maxIndex]][max_y_list[maxIndex]] = 1;
    };
  }, sketchParent);
  return () => sketch.remove();
  // }
};

export const startLoop = () => {
  continueLoop = true;
  sketch.loop();
};

export const stopLoop = () => {
  continueLoop = false;
  sketch.noLoop();
};

export const nextStep = () => {
  continueLoop = false;
  sketch.loop();
};

export const prevStep = () => {
  if (stepNum > 1) {
    continueLoop = false;
    stepNum -= 2;
    cells = Array.from({ length: rows }, () => new Array(cols).fill(0));
    weights = Array.from({ length: rows }, () => new Array(cols).fill(0));
    cells[rows / 2][cols / 2] = 1;
    for (let i = 0; i < stepNum; i += 1) {
      update_weights_rule1();
      update_cells();
    }
    sketch.loop();
  }
};

export const incSpeed = () => {
  speed += 1;
  sketch.frameRate(speed);
};

export const decSpeed = () => {
  if (speed > 0) speed -= 1;
  sketch.frameRate(speed);
};

export const reset = () => {
  stepNum = 0;
  continueLoop = false;
  cells = Array.from({ length: rows }, () => new Array(cols).fill(0));
  weights = Array.from({ length: rows }, () => new Array(cols).fill(0));
  cells[rows / 2][cols / 2] = 1;
  sketch.loop();
};

export const setRuleSelected = (id: number) => {
  ruleSelected = id;
  reset();
};
