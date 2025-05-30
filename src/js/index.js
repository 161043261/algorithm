/**
 * @param {number} n
 * @return {number[]}
 */
function grayCode(n) {
  const ans = new Set([new Array(n).fill(0).join("")]);

  /**
   * @param {number[]} arr
   */
  const backtrack = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i] === 0 ? 1 : 0;
      const item = arr.join("");
      if (ans.has(item)) {
        arr[i] = arr[i] === 0 ? 1 : 0;
        continue;
      }
      ans.add(item);
      backtrack(arr);
      arr[i] = arr[i] === 0 ? 1 : 0;
    }
  };

  backtrack(new Array(n).fill(0));
  return Array.from(ans).map((item) => Number.parseInt(item, 2));
}

const ans = grayCode(3);
console.log(ans);
