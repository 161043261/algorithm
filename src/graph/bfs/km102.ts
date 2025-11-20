import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const next: [number, number][] = [
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
  const bfs = (y: number, x: number) => {
    const queue: [number, number][] = [];
    const partialIsolatedPos: [number, number][] = [];
    let isIsolated = true;

    queue.push([y, x]);
    visit[y][x] = true;

    while (queue.length > 0) {
      const [[headY, headX]] /** deleted elements */ = queue.splice(0, 1);
      partialIsolatedPos.push([headY, headX]);

      if (
        headY === 0 ||
        headY === rowNum - 1 ||
        headX === 0 ||
        headX === colNum - 1
      ) {
        isIsolated = false;
      }

      for (const [dy, dx] of next) {
        const nextY = headY + dy;
        const nextX = headX + dx;
        if (
          nextY >= 0 &&
          nextY < rowNum &&
          nextX >= 0 &&
          nextX < colNum &&
          grid[nextY][nextX] === 1 &&
          !visit[nextY][nextX]
        ) {
          queue.push([nextY, nextX]);
          visit[nextY][nextX] = true;
        }
      }
    }

    if (isIsolated) {
      isolatedPos.push(...partialIsolatedPos);
    }
  };

  for (let y = 0; y < rowNum; y++) {
    for (let x = 0; x < colNum; x++) {
      if (grid[y][x] === 1 && !visit[y][x]) {
        bfs(y, x);
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
