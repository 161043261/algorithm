/**
 *
 * @param {number} depth
 */
function myFlat(depth = 1) {
  depth = Math.max(0, depth);
  const res = [];

  /**
   *
   * @param {any[]} arr
   * @param {number} curDepth
   */
  const flatten = (arr, curDepth) => {
    for (const item of arr) {
      if (Array.isArray(item) && curDepth < depth) {
        flatten(item, curDepth + 1);
      } else {
        // !Array.isArray(item) || curDepth === depth
        res.push(item);
      }
    }
  };

  flatten(this, 0);
  return res;
}

Array.prototype.myFlat = myFlat;

const arr1 = [1, 2, [3, 4]];
console.log(arr1.myFlat()); // [1, 2, 3, 4]

const arr2 = [1, 2, [3, 4, [5, 6]]];
console.log(arr2.myFlat(1)); // [1, 2, 3, 4, [5, 6]]
console.log(arr2.myFlat(2)); // [1, 2, 3, 4, 5, 6]

const arr3 = [1, [2, [3, [4]]]];
console.log(arr3.myFlat(Infinity));
