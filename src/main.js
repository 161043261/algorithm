/**
 * @param {string[][]} matrix
 * @return {number}
 */
const maximalSquare = function (matrix) {
  let ans = 0;
  const cache = new Map();
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      if (matrix[y][x] === "1") {
        const ret = edgeLen(
          matrix,
          [[y, x]].flatMap((item) => [item, item, item, item]),
          cache,
        );
        ans = Math.max(1, ans, ret * ret);
      }
    }
  }
  return ans;
};

/**
 *
 * @param {number[][]} matrix
 * @param {number[][]} pos
 * @param {Map<string, number>} cache
 */
const edgeLen = (matrix, pos, cache) => {
  const [lt, rt, lb, rb] = pos;
  const key = [lt.join(","), rt.join(","), lb.join(","), rb.join(",")].join(
    ";",
  );
  if (cache.has(key)) {
    return cache.get(key);
  }

  let tok = lt[0] > 0;
  let bok = lb[0] < matrix.length - 1;

  if (tok || bok) {
    for (let i = lt[1]; i <= rt[1]; i++) {
      if (tok && matrix[lt[0] - 1][i] !== "1") {
        tok = false;
      }
      if (bok && matrix[lb[0] + 1][i] !== "1") {
        bok = false;
      }
    }
  }

  let lok = lt[1] > 0;
  let rok = rt[1] < matrix[0].length - 1;

  if (lok || rok) {
    for (let j = lt[0]; j <= lb[0]; j++) {
      if (lok && matrix[j][lt[1] - 1] !== "1") {
        lok = false;
      }
      if (rok && matrix[j][rt[1] + 1] !== "1") {
        rok = false;
      }
    }
  }

  // left top
  const [lty, ltx] = lt;
  const ltok = lok && tok && matrix[lty - 1][ltx - 1] === "1";

  // right top
  const [rty, rtx] = rt;
  const rtok = rok && tok && matrix[rty - 1][rtx + 1] === "1";

  // left bottom
  const [lby, lbx] = lb;
  const lbok = lok && bok && matrix[lby + 1][lbx - 1] === "1";

  // right bottom
  const [rby, rbx] = rb;
  const rbok = rok && bok && matrix[rby + 1][rbx + 1] === "1";

  const rets = [rtx - ltx + 1];
  // lt, rt, lb, rb
  if (ltok) {
    rets.push(
      edgeLen(
        matrix,
        [[lty - 1, ltx - 1], [rty - 1, rtx], [lby, lbx - 1], pos[3]],
        cache,
      ),
    );
  }
  if (rtok) {
    rets.push(
      edgeLen(
        matrix,
        [[lty - 1, ltx], [rty - 1, rtx + 1], pos[2], [rby, rbx + 1]],
        cache,
      ),
    );
  }
  if (lbok) {
    rets.push(
      edgeLen(
        matrix,
        [[lty, ltx - 1], pos[1], [lby + 1, lbx - 1], [rby + 1, rbx]],
        cache,
      ),
    );
  }
  if (rbok) {
    rets.push(
      edgeLen(
        matrix,
        [pos[0], [rty, rtx + 1], [lby + 1, lbx], [rby + 1, rbx + 1]],
        cache,
      ),
    );
  }
  const ret = Math.max(...rets);
  cache.set(key, ret);
  return ret;
};
