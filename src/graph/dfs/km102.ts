// 简单用一下 TypeScript
import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const step: [number, number][] = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

let rowNum = 0;
let colNum = 0;

const grid: number[][] = [];
let visit: boolean[][] = [];
const isolatedPos: [number, number][] = [];

let lineno = 0;

rl.on("line", (line: string) => {
  lineno++;

  if (lineno === 1) {
    [rowNum, colNum] = line
      .trim()
      .split(" ")
      .map((item) => Number.parseInt(item, 10));
    visit = Array.from({ length: rowNum }, () => new Array(colNum).fill(false));
    return;
  }

  grid.push(
    line
      .trim()
      .split(" ")
      .map((item) => Number.parseInt(item, 10)),
  );

  if (lineno === rowNum + 1) {
    islandArea();
    rl.close();
  }
});

function islandArea() {
  const dfs = (y: number, x: number): [[number, number][], boolean] => {
    visit[y][x] = true;
    const pos: [number, number][] = [[y, x]];
    let isIsolated: boolean =
      y > 0 && y < rowNum - 1 && x > 0 && x < colNum - 1;

    for (const [dy, dx] of step) {
      const nextY = y + dy;
      const nextX = x + dx;
      if (
        nextY >= 0 &&
        nextY < rowNum &&
        nextX >= 0 &&
        nextX < colNum &&
        grid[nextY][nextX] === 1 &&
        !visit[nextY][nextX]
      ) {
        const [p, i] = dfs(nextY, nextX);
        pos.push(...p);
        isIsolated = isIsolated && i;
      }
    }

    return [pos, isIsolated];
  };

  for (let y = 0; y < rowNum; y++) {
    for (let x = 0; x < colNum; x++) {
      if (grid[y][x] === 1 && !visit[y][x]) {
        const [pos, isolated] = dfs(y, x);
        if (isolated) {
          isolatedPos.push(...pos);
        }
      }
    }
  }

  for (const [y, x] of isolatedPos) {
    grid[y][x] = 0;
  }

  for (const item of grid) {
    console.log(item.join(" "));
  }
}
