import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineno = 0;

let vertexNum = 0;
let edgeNum = 0;

let inDegree: number[] = [];
const edges: Map<number /** src */, number[] /** dst */> = new Map<
  number, // src
  number[] // dst
>();

const idxQueue: number[] = [];
const ans: number[] = [];

rl.on("line", (line) => {
  lineno++;

  if (lineno === 1) {
    [vertexNum, edgeNum] = line
      .trim()
      .split(" ")
      .map((item) => Number.parseInt(item));

    // initialize
    inDegree = new Array(vertexNum).fill(0);
    return;
  }

  const [start, end] = line
    .trim()
    .split(" ")
    .map((item) => Number.parseInt(item));
  inDegree[end]++;

  if (edges.has(start)) {
    edges.get(start)?.push(end);
  } else {
    edges.set(start, [end]);
  }

  if (lineno === 1 + edgeNum) {
    main();
    rl.close();
  }
});

function main() {
  for (let i = 0; i < vertexNum; i++) {
    if (inDegree[i] === 0) {
      idxQueue.push(i);
    }
  }

  while (idxQueue.length) {
    const head = idxQueue[0];
    idxQueue.shift();
    ans.push(head);

    const dst = edges.get(head);
    if (dst) {
      for (const item of dst) {
        inDegree[item]--;
        if (inDegree[item] === 0) {
          idxQueue.push(item);
        }
      }
    }
  }

  if (ans.length === vertexNum) {
    console.log(ans.map((item) => item.toString()).join(" "));
  } else {
    console.log(-1);
  }
}
