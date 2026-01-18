function findRightInterval(intervals: number[][]): number[] {
  const wm = new WeakMap<number[], number>();
  for (let i = 0; i < intervals.length; i++) {
    wm.set(intervals[i], i);
  }
  intervals.sort((a, b) => a[0] - b[0]);
  const ans: number[] = new Array<number>(intervals.length);
  for (let i = 0; i < intervals.length; i++) {
    // [i, intervals.length - 1]
    const range = intervals.slice(i, intervals.length);
    const target = intervals[i][1];
    // r 和 r 右侧的数都 >= target (r = range.length)
    // l 和 l 左侧的数都 < target (l = -1)
    // let l = -1,
    //   r = range.length;
    // while (l + 1 < r) {
    //   const m = l + Math.floor((r - l) / 2);
    //   if (range[m][0] >= target) {
    //     r = m;
    //   } else {
    //     // range[m][0] > target
    //     l = m;
    //   }
    // }
    // // console.log(l, r);
    // if (r < 0 || r >= range.length) {
    //   ans[wm.get(intervals[i])!] = -1;
    // } else {
    //   ans[wm.get(intervals[i])!] = wm.get(intervals[i + r])!;
    // }

    // r 右侧的数 >= target (r = range.length - 1)
    // l 左侧的数 < target (l = 0)
    // let l = 0,
    //   r = range.length - 1;
    // while (l <= r) {
    //   const m = l + Math.floor((r - l) / 2);
    //   if (range[m][0] >= target) {
    //     r = m - 1;
    //   } else {
    //     l = m + 1;
    //   }
    // }
    // r = r + 1;
    // if (r < 0 || r >= range.length) {
    //   ans[wm.get(intervals[i])!] = -1;
    // } else {
    //   ans[wm.get(intervals[i])!] = wm.get(intervals[i + r])!;
    // }

    // r 和 r 右侧的数都 >= target (r = range.length)
    // l 左侧的数 < target (l = 0)
    // l 到 r 的左侧, 左闭右开, 向下取整 Math.floor
    // let l = 0,
    //   r = range.length;
    // while (l < r) {
    //   const m = l + Math.floor((r - l) / 2);
    //   if (range[m][0] >= target) {
    //     r = m;
    //   } else {
    //     l = m + 1;
    //   }
    // }
    // if (r < 0 || r >= range.length) {
    //   ans[wm.get(intervals[i])!] = -1;
    // } else {
    //   ans[wm.get(intervals[i])!] = wm.get(intervals[i + r])!;
    // }

    // r 右侧的数 >= target (r = range.length - 1)
    // l 和 l 左侧的数都 < target (l = -1)
    // l 的右侧到 r, 左开右闭, 向上取整 Math.ceil
    let l = -1,
      r = range.length - 1;
    while (l < r) {
      const m = l + Math.ceil((r - l) / 2);
      if (range[m][0] >= target) {
        r = m - 1;
      } else {
        l = m;
      }
    }
    r = r + 1;
    if (r < 0 || r >= range.length) {
      ans[wm.get(intervals[i]) ?? -1] = -1;
    } else {
      ans[wm.get(intervals[i]) ?? -1] = wm.get(intervals[i + r]) ?? -1;
    }
  }
  return ans;
}

export default findRightInterval;
