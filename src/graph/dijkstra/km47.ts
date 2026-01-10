import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineno = 0;

let vertexNum = 0;
let edgeNum = 0;

let grid: number[][];
let inTree: boolean[];
let minDist: number[];

let start = 0;
let end = 0;

rl.on("line", (line) => {
  lineno++;

  if (lineno === 1) {
    [vertexNum, edgeNum] = line
      .trim()
      .split(" ")
      .map((item) => Number.parseInt(item));

    start = 1;
    end = vertexNum;

    // initialize grid
    grid = Array.from({ length: vertexNum + 1 }, (_, y) =>
      Array.from({ length: vertexNum + 1 }, (_, x) => (y === x ? 0 : -1)),
    );

    // initialize inTree
    inTree = new Array<boolean>(vertexNum + 1).fill(false);
    // inTree[start] = true;

    // initialize minDist
    minDist = new Array<number>(vertexNum + 1).fill(Infinity);
    minDist[start] = 0;
    return;
  }

  const [start_, end_, len_] = line
    .trim()
    .split(" ")
    .map((item) => Number.parseInt(item));

  grid[start_][end_] = len_;
  // grid[end_][start_] = len_;

  if (lineno === edgeNum + 1) {
    main();
    rl.close();
  }
});

function main() {
  for (let i = 0; i < vertexNum - 1; i++) {
    let minVal = Infinity;
    let cur = 1; // start

    for (let idx = 1; idx <= vertexNum; idx++) {
      if (!inTree[idx] && minDist[idx] < minVal) {
        minVal = minDist[idx];
        cur = idx;
      }
    }

    inTree[cur] = true;

    for (let i = 1; i <= vertexNum; i++) {
      if (
        !inTree[i] &&
        grid[cur][i] !== -1 &&
        minDist[cur] + grid[cur][i] < minDist[i]
      ) {
        minDist[i] = minDist[cur] + grid[cur][i];
      }
    }
  }

  if (minDist[end] === Infinity) {
    console.log(-1);
  } else {
    console.log(minDist[end]);
  }
}
