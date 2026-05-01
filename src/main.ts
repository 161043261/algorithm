const dirs = [
  [], // Street 0
  [
    [0, -1],
    [0, 1],
  ], // Street 1
  [
    [-1, 0],
    [1, 0],
  ], // Street 2
  [
    [0, -1],
    [1, 0],
  ], // Street 3
  [
    [0, 1],
    [1, 0],
  ], // Street 4
  [
    [0, -1],
    [-1, 0],
  ], // Street 5
  [
    [0, 1],
    [-1, 0],
  ], // Street 6
];

function contains(street: number, dx: number, dy: number): boolean {
  return dirs[street].some(([dirX, dirY]) => dirX === dx && dirY === dy);
}

function hasValidPath(grid: number[][]): boolean {
  const m = grid.length;
  const n = grid[0].length;
  const vis = Array.from({ length: m }, () => new Array(n).fill(false));

  const dfs = (x: number, y: number) => {
    if (x === m - 1 && y === n - 1) {
      return true;
    }
    vis[x][y] = true;
    for (const [dx, dy] of dirs[grid[x][y]]) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || nx >= m || ny < 0 || ny >= n || vis[nx][ny]) {
        continue;
      }
      if (contains(grid[nx][ny], -dx, -dy) && dfs(nx, ny)) {
        return true;
      }
    }
    return false;
  };

  return dfs(0, 0);
}
