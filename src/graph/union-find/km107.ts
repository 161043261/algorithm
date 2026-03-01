import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineno = 0;

let nodeNum = 0;
let edgeNum = 0;

const edges: [start: number, end: number][] = [];
let parents: number[] = [];
let src = 0;
let dst = 0;

rl.on("line", (line) => {
  lineno++;

  if (lineno === 1) {
    [nodeNum, edgeNum] = line
      .trim()
      .split(" ")
      .map((item) => Number.parseInt(item));
    parents = Array.from({ length: nodeNum + 1 }, (_, idx) => idx);
    return;
  }

  if (lineno == edgeNum + 2) {
    [src, dst] = line
      .trim()
      .split(" ")
      .map((item) => Number.parseInt(item));

    rl.close();
    main();
    return;
  }

  const [start, end] = line
    .trim()
    .split(" ")
    .map((item) => Number.parseInt(item));
  edges.push([start, end]);
});

function find(idx: number): number {
  if (parents[idx] === idx) {
    return idx;
  }

  const root = find(parents[idx]);
  parents[idx] = root;
  return root;
}

function union(idxA: number, idxB: number) {
  const rootA = find(idxA);
  const rootB = find(idxB);

  if (rootA === rootB) {
    return;
  }

  parents[rootA] = rootB;
}

function main() {
  for (const edge of edges) {
    union(edge[0], edge[1]);
  }

  const rootSrc = find(src);
  const rootDst = find(dst);
  console.log(rootSrc === rootDst ? 1 : 0);
}
