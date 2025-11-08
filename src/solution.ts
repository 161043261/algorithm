function processQueries(
  c: number,
  connections: number[][],
  queries: number[][],
): number[] {
  const graph = Array.from({ length: c + 1 }, () => [] as number[]);
  for (const [x, y] of connections) {
    graph[x].push(y);
    graph[y].push(x);
  }

  const heapIdArr = Array.from({ length: c + 1 }, () => -1);

  let heapId = 0;
  const dfs = (x: number) => {
    heapIdArr[x] = heapId;
    for (const y of graph[x]) {
      if (heapIdArr[y] === -1) {
        dfs(y);
      }
    }
  };

  for (let i = 1; i <= c; i++) {
    if (heapIdArr[i] === -1) {
      dfs(i);
      heapId++;
    }
  }

  const offlineTime = Array.from({ length: c + 1 }, () => Infinity);
  for (let i = queries.length - 1; i >= 0; i--) {
    const [q0, q1] = queries[i];
    if (q0 === 2) {
      offlineTime[q1] = i;
    }
  }

  const cIdArr = Array.from({ length: heapId }, () => Infinity);

  for (let i = 1; i <= c; i++) {
    if (offlineTime[i] === Infinity) {
      const heapId = heapIdArr[i];
      cIdArr[heapId] = Math.min(cIdArr[heapId], i);
    }
  }

  const ans: number[] = [];
  for (let i = queries.length - 1; i >= 0; i--) {
    const [q0, q1] = queries[i];
    const heapId = heapIdArr[q1];

    if (q0 == 2) {
      if (offlineTime[q1] === i) {
        cIdArr[heapId] = Math.min(cIdArr[heapId], q1);
      }
    } else if (i < offlineTime[q1]) {
      ans.push(q1);
    } else if (cIdArr[heapId] !== Infinity) {
      ans.push(cIdArr[heapId]);
    } else {
      ans.push(-1);
    }
  }
  return ans.reverse();
}

export default processQueries;
