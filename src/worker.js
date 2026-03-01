// worker.js
import { parentPort, workerData } from "worker_threads";
const { start, end } = workerData;

let localCount = 0;

for (let i = start; i < end; i++) {
  const x = Math.random() - 0.5;
  const y = Math.random() - 0.5;
  if (x * x + y * y < 0.25) {
    localCount++;
  }
}

parentPort.postMessage(localCount);
