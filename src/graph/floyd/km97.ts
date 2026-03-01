import { createInterface } from "readline";

let vertexNum = 0; // 1
let edgeNum = 0; // 1
let grid: number[][]; // 2 ~ 1 + edgeNum
let taskNum = 0; // 2 + edgeNum
const taskList: [start: number, end: number][] = []; // 3 + edgeNum ~ 2 + edgeNum + taskNum

// ====================
let path: number[][];
// ====================

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineno = 0;

rl.on("line", (line) => {
  lineno++;

  if (lineno === 1) {
    [vertexNum, edgeNum] = line
      .trim()
      .split(" ")
      .map((item) => Number.parseInt(item));

    grid = Array.from(
      {
        length: vertexNum + 1,
      },
      (_, y) =>
        Array.from(
          {
            length: vertexNum + 1,
          },
          (_, x) => (y === x ? 0 : Infinity),
        ),
    );

    // ========================================
    path = Array.from({ length: vertexNum + 1 }, () =>
      new Array<number>(vertexNum + 1).fill(-1),
    );
    // ========================================
    return;
  }

  if (lineno <= 1 + edgeNum) {
    const [left, right, len] = line
      .trim()
      .split(" ")
      .map((item) => Number.parseInt(item));
    grid[left][right] = len;
    grid[right][left] = len;

    return;
  }

  if (lineno === 2 + edgeNum) {
    taskNum = Number.parseInt(line.trim());
    return;
  }

  const [start_, end_] = line
    .trim()
    .split(" ")
    .map((item) => Number.parseInt(item));
  taskList.push([start_, end_]);

  if (lineno === 2 + edgeNum + taskNum) {
    main();
    rl.close();
  }
});

function main() {
  // console.log("vertexNum", vertexNum);
  // console.log("edgeNum", edgeNum);
  // console.log("grid", grid);
  // console.log("taskNum", taskNum);
  // console.log("taskList", taskList);

  // 必须是 k-i-j 三层循环, k 是中转点
  for (let k = 1; k <= vertexNum; k++) {
    for (let i = 1; i <= vertexNum; i++) {
      for (let j = 1; j <= vertexNum; j++) {
        if (
          grid[i][k] !== Infinity &&
          grid[k][j] !== Infinity &&
          grid[i][k] + grid[k][j] < grid[i][j]
        ) {
          grid[i][j] = grid[i][k] + grid[k][j];
          path[i][j] = k;
        }
      }
    }
  }

  for (const [start, end] of taskList) {
    if (grid[start][end] === Infinity) {
      console.log(-1);
    } else {
      console.log(grid[start][end]);
    }
  }
}
