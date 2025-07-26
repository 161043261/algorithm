/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function (pattern, s) {
  const patternArr = pattern.split("");
  const sArr = s.split(" ");

  if (patternArr.length !== sArr.length) {
    return false;
  }
  const len = patternArr.length;
  const /** @type {Map<string, string>} */ pattern2s = new Map();
  const /** @type {Set<string>} */ sArrSet = new Set();

  for (let i = 0; i < len; i++) {
    if (
      pattern2s.has(patternArr[i]) &&
      pattern2s.get(patternArr[i]) !== sArr[i]
    ) {
      return false;
    }
    if (!pattern2s.has(patternArr[i])) {
      if (sArrSet.has(sArr[i])) {
        return false;
      }
      pattern2s.set(patternArr[i], sArr[i]);
      sArrSet.add(sArr[i]);
    }
  }

  return true;
};

wordPattern("abba", "dog cat cat dog");
