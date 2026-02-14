function champagneTower(
  poured: number,
  query_row: number,
  query_glass: number,
): number {
  const glasses = [0, 0];
  let remain = poured;
  let cur_row = -1;
  while (remain > 0 && cur_row < query_row) {
    cur_row++;
    if (remain >= cur_row + 1) {
      remain -= cur_row + 1;
      glasses[0] = glasses[1] = 1;
      continue;
    }
    glasses[0] = remain / cur_row / 2;
    glasses[1] = remain / cur_row;
    remain = 0;
  }
  if (cur_row < query_row) {
    return 0;
  }
  if (query_glass === 0 || query_glass === query_row) {
    return glasses[0];
  }
  return glasses[1];
}

console.log(champagneTower(25, 6, 1));
