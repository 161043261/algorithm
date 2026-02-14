import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineno = 0;
let vertexNum = 0;
let edgeNum = 0;
let edges: number[][] = [];

let minDist: number[] = [];
let inTree: boolean[] = [];

rl.on("line", (line) => {
  lineno++;

  if (lineno === 1) {
    [vertexNum, edgeNum] = line
      .trim()
      .split(" ")
      .map((item) => Number.parseInt(item));

    edges = Array.from({ length: vertexNum + 1 }, () =>
      Array.from<number>({ length: vertexNum + 1 }).fill(Infinity),
    );

    // minDist = Array.from({ length: vertexNum + 1 }, () => Infinity);
    minDist = Array.from({ length: vertexNum + 1 }, () => Infinity);
    minDist[1] = 0;

    inTree = Array.from<boolean>({ length: vertexNum + 1 }).fill(false);

    return;
  }

  const [left, right, len] = line
    .trim()
    .split(" ")
    .map((item) => Number.parseInt(item));

  edges[left][right] = len;
  edges[right][left] = len;

  if (lineno === 1 + edgeNum) {
    main();
    rl.close();
  }
});

function main() {
  for (let i = 0; i < vertexNum - 1; i++) {
    let candidate = -1;
    let minVal = Infinity;

    for (let j = 1; j <= vertexNum; j++) {
      if (!inTree[j] && minDist[j] < minVal) {
        candidate = j;
        minVal = minDist[j];
      }
    }

    inTree[candidate] = true;

    for (let j = 1; j <= vertexNum; j++) {
      if (!inTree[j] && edges[j][candidate] < minDist[j]) {
        minDist[j] = edges[j][candidate];
      }
    }
  }

  let ans = 0;
  for (const item of minDist.slice(1)) {
    ans += item;
  }

  console.log(ans);
}
