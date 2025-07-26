/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @param {number} num
 * @return {number}
 */
function addDigits(num) {
  /**
   *
   * @param {number} oldNum
   * @return {number}
   */
  const update = (oldNum) => {
    return oldNum
      .toString()
      .split("")
      .map((item) => Number.parseInt(item))
      .reduce((a, b) => a + b);
  };

  while (num > 9) {
    num = update(num);
  }

  return num;
}
