import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineno = 0;
let rowNum = 0;
let colNum = 0;

let islandIdx = 2;
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
    main();
    rl.close();
  }
});

function dfs(y: number, x: number) {
  size++;
  grid[y][x] = islandIdx;

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

function main() {
  for (let y = 0; y < rowNum; y++) {
    for (let x = 0; x < colNum; x++) {
      if (grid[y][x] === 0) {
        allIsland = false;
      }

      if (grid[y][x] === 1) {
        size = 0;
        dfs(y, x);
        island2size.set(islandIdx, size);
        islandIdx++;
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
        const islandIdxSet = new Set<number>();
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
            islandIdxSet.add(grid[siblingY][siblingX]);
          }
        }

        let cur = 1;
        for (const islandIdx of islandIdxSet) {
          cur += island2size.get(islandIdx) ?? 0;
        }

        ans = Math.max(ans, cur);
      } // if (grid[y][x] === 0)
    }
  }

  process.stdout.write(`${ans}\n`);
}
