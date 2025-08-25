import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineno = 0;
let rowNum = 0;
let colNum = 0;

let mark = 2;
let size = 0;
const island2size = new Map<number, number>();

const grid: number[][] = [];

let allIsland = true;

let ans = 1;

const step: [number, number][] = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

rl.on("line", (line: string) => {
  lineno++;

  if (lineno === 1) {
    [rowNum, colNum] = line
      .trim()
      .split(" ")
      .map((item) => Number.parseInt(item));
    return;
  }

  grid.push(
    line
      .trim()
      .split(" ")
      .map((item) => Number.parseInt(item)),
  );

  if (lineno === rowNum + 1) {
    rico();
    rl.close();
  }
});

function dfs(y: number, x: number) {
  size++;
  grid[y][x] = mark;

  for (const [dy, dx] of step) {
    const nextY = y + dy;
    const nextX = x + dx;

    if (
      nextY >= 0 &&
      nextY < rowNum &&
      nextX >= 0 &&
      nextX < colNum &&
      grid[nextY][nextX] === 1
    ) {
      dfs(nextY, nextX);
    }
  }
}

function rico() {
  for (let y = 0; y < rowNum; y++) {
    for (let x = 0; x < colNum; x++) {
      if (grid[y][x] === 0) {
        allIsland = false;
      }

      if (grid[y][x] === 1) {
        size = 0;
        mark++;
        dfs(y, x);
        island2size.set(mark, size);
      }
    }
  }

  if (allIsland) {
    // console.log(rowNum * colNum)
    process.stdout.write(`${rowNum * colNum}\n`);
    process.exit(0);
  }

  for (let y = 0; y < rowNum; y++) {
    for (let x = 0; x < colNum; x++) {
      if (grid[y][x] === 0) {
        const markSet = new Set<number>();

        for (const [dy, dx] of step) {
          const siblingY = y + dy;
          const siblingX = x + dx;
          if (
            siblingY >= 0 &&
            siblingY < rowNum &&
            siblingX >= 0 &&
            siblingX < colNum &&
            grid[siblingY][siblingX] > 1
          ) {
            markSet.add(grid[siblingY][siblingX]);
          }
        }

        let cur = 1;
        for (const mark of markSet) {
          cur += island2size.get(mark) ?? 0;
        }

        ans = Math.max(ans, cur);
      }
    }
  }

  process.stdout.write(`${ans}\n`);
}
