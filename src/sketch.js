//  rows & cols num for the grid
// let rows, cols, cells, weights, window_size, scale_size;
const rows = 10;
const cols = 10;
//  cells - 2d list to store 1 or 0 based on presence or absence of a cell in the hive
let cells = Array.from({ length: rows }, () => new Array(cols).fill(0));
// weights - 2d list to store number of neighbouring cells at each position of the grid
let weights = Array.from({ length: rows }, () => new Array(cols).fill(0));
// initial cell is created in centre of the grid
cells[rows / 2][cols / 2] = 1;
//  set size of display window
const window_size = 300;
//  calculate scale depending on window size & num of rows in grid
const scale_size = window_size / rows;

let loopDec = true;

function setup() {
  createCanvas(window_size, window_size);
  frameRate(2);
  noStroke();
}

function draw() {
  background(255);
  //  color of cell
  fill(180, 147, 246);
  update_weights_rule1();
  print_weights();

  //  loop to draw the hexagonal cells
  for (let x = 0; x < rows; ++x) {
    for (let y = 0; y < cols; ++y) {
      if (cells[x][y] == 1) {
        fill(180, 147, 246, 100);
        if (y % 2 == 0) {
          draw_hexagon(x * scale_size + scale_size / 2, y * scale_size);
        } else {
          draw_hexagon(x * scale_size, y * scale_size);
        }
      }
    }
  }
  update_cells();
  if (!loopDec) {
    noLoop();
  }
}

function startStop() {
  //   updateLoopDec();
  if (loopDec) {
    loop();
  }
}

//  method to display weights grid on the window
function print_weights() {
  fill(0);
  for (let x = 1; x < rows - 1; ++x) {
    for (let y = 1; y < cols - 1; ++y) {
      if (y % 2 == 0) {
        textSize(32);
        text(
          weights[x][y],
          x * scale_size + scale_size / 2 - 10,
          y * scale_size + 10
        );
        //  textSize(15)
        //  text(str(x)+" "+str(y),x*scale_size+scale_size/2-10,y*scale_size+15)
      } else {
        textSize(32);
        text(weights[x][y], x * scale_size - 10, y * scale_size + 10);
        //  textSize(15)
        //  text(str(x)+" "+str(y),x*scale_size-10,y*scale_size+15)}
      }
    }
  }
}

// method to draw a hexagon with midpoint x,y
/**
 * @param {number} x
 * @param {number} y
 */
function draw_hexagon(x, y) {
  let angle = TWO_PI / 6;
  beginShape();
  let a = TWO_PI / 12;
  while (a < TWO_PI + TWO_PI / 12) {
    let sx = x + (cos(a) * scale_size) / 2;
    let sy = y + (sin(a) * scale_size) / 2;
    vertex(sx, sy);
    a += angle;
  }
  endShape(CLOSE);
}

//  method to calculate weights at each grid position and update it in weights list
//  rule - weight is calculated based on number of immediate weights
function update_weights_rule1() {
  weights = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (let x = 1; x < rows - 1; ++x) {
    for (let y = 1; y < cols - 1; ++y) {
      if (cells[x][y] == 0) {
        if (y % 2 == 0) {
          weights[x][y] =
            cells[x - 1][y] +
            cells[x + 1][y] +
            cells[x][y - 1] +
            cells[x][y + 1] +
            cells[x + 1][y - 1] +
            cells[x + 1][y + 1];
        } else {
          weights[x][y] =
            cells[x - 1][y] +
            cells[x + 1][y] +
            cells[x - 1][y - 1] +
            cells[x - 1][y + 1] +
            cells[x][y - 1] +
            cells[x][y + 1];
        }
      }
    }
  }
}

// method to find which position has the highest weights and add a cell there
function update_cells() {
  let max_x, max_y, max_neighbor;
  max_x = 0;
  max_y = 0;
  max_neighbor = 0;
  for (let x = 0; x < rows; ++x) {
    for (let y = 0; y < cols; ++y) {
      if (weights[x][y] > max_neighbor) {
        max_neighbor = weights[x][y];
        max_x = x;
        max_y = y;
      }
    }
  }
  cells[max_x][max_y] = 1;
}
