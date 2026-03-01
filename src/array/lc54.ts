function spiralOrder(matrix: number[][]): number[] {
  let [x, y] = [0, 0];
  let [lEnd, rEnd, tEnd, bEnd] = [
    0,
    matrix[0].length - 1,
    1,
    matrix.length - 1,
  ];
  const ans: number[] = [];

  const turnTop = (end: number) => {
    while (x > end) {
      ans.push(matrix[x][y]);
      x--;
    }
    tEnd++;
  };

  const turnBottom = (end: number) => {
    while (x < end) {
      ans.push(matrix[x][y]);
      x++;
    }
    bEnd--;
  };

  const turnLeft = (end: number) => {
    while (y > end) {
      ans.push(matrix[x][y]);
      y--;
    }
    lEnd++;
  };

  const turnRight = (end: number) => {
    while (y < end) {
      ans.push(matrix[x][y]);
      y++;
    }
    rEnd--;
  };

  while (true) {
    if (lEnd <= rEnd) {
      turnRight(rEnd);
    } else {
      break;
    }
    if (tEnd <= bEnd) {
      turnBottom(bEnd);
    } else {
      break;
    }
    if (lEnd <= rEnd) {
      turnLeft(lEnd);
    } else {
      break;
    }
    if (tEnd <= bEnd) {
      turnTop(tEnd);
    } else {
      break;
    }
  }
  ans.push(matrix[x][y]);
  return ans;
}

export default spiralOrder;
