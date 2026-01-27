function minCost(n: number, edges: number[][]): number {
  const graph: Map<number, number>[] = Array.from(
    { length: n },
    () => new Map(),
  );
  for (const [u, v, w] of edges) {
    graph[u].set(v, Math.min(graph[u].get(v) ?? Infinity, w));
    graph[v].set(u, Math.min(graph[v].get(u) ?? Infinity, 2 * w));
  }
  const visit = new Array<boolean>(edges.length).fill(false);
  let ans = Infinity;
  const dfs = (i: number, cost: number) => {
    if (i == n - 1) {
      ans = Math.min(ans, cost);
      return;
    }
    const n2w = graph[i];
    for (const [n, w] of n2w.entries()) {
      if (visit[n]) {
        continue;
      }
      visit[n] = true;
      if (cost + w < ans) {
        dfs(n, cost + w);
      }
      visit[n] = false;
    }
  };
  dfs(0, 0);
  return ans == Infinity ? -1 : ans;
}
