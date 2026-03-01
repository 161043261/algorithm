// main.js
import { Worker } from "worker_threads";
import { cpus } from "os";
import { join } from "path";

const N = 2 ** 31 - 1;

function calc() {
  const numCPU = cpus().length;
  const batchSize = Math.floor(N / numCPU);
  const workers = [];
  const promises = [];

  for (let workerID = 0; workerID < numCPU; workerID++) {
    const start = workerID * batchSize;
    const end = workerID === numCPU - 1 ? N : start + batchSize;
    promises.push(
      new Promise((resolve, reject) => {
        const worker = new Worker(join(import.meta.dirname, "./worker.js"), {
          workerData: { start, end },
        });
        workers.push(worker);
        worker.on("message", resolve);
        worker.on("error", reject);
        worker.on("exit", (code) => {
          if (code !== 0) {
            reject(new Error(`Worker exited with code ${code}`));
          }
        });
      }),
    );
  }

  return Promise.all(promises).then((results) => {
    const totalCount = results.reduce((a, b) => a + b, 0);
    const pi = (totalCount / N) * 4.0;
    console.log(`π ≈ ${pi.toFixed(15)}`);
  });
}

function measureTime(fn) {
  const start = Date.now();
  return fn().then(() => {
    const elapsed = Math.floor((Date.now() - start) / 1000);
    console.log(`Execution Time: ${elapsed} Secs.`);
  });
}

measureTime(calc);
