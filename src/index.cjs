/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  const /** @type {string[]} */ ans = [];
  const /** @type {number[]} */ segments = [];

  /**
   *
   * @param {string} s
   * @param {number} segId
   * @param {number} segStart
   */
  const dfs = (s, segId, segStart) => {
    if (segId === 4) {
      if (segStart === s.length) {
        // let ipAddr = "";
        // for (let i = 0; i < 4; ++i) {
        //   ipAddr +=
        //     i < 3 ? segments[i].toString() + "." : segments[i].toString();
        // }
        // ans.push(ipAddr);
        ans.push(segments.join("."));
      }
      return;
    }

    if (segStart === s.length) {
      return;
    }

    if (s[segStart] /** s.charAt(segStart) */ === "0") {
      segments[segId] = 0;
      dfs(s, segId + 1, segStart + 1);
      return;
    }

    let addr = 0;
    for (let segEnd = segStart; segEnd < s.length; segEnd++) {
      addr = addr * 10 + (s.charCodeAt(segEnd) - "0".charCodeAt(0));
      // addr = addr * 10 + (s.charAt(segEnd) - "0");
      if (addr > 0 && addr <= 0xff) {
        segments[segId] = addr;
        dfs(s, segId + 1, segEnd + 1);
      } else {
        break;
      }
    }
  };

  dfs(s, 0, 0);
  return ans;
};
