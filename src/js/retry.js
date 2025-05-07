/* eslint-disable @typescript-eslint/no-unused-vars */

// 场景: 接口请求失败时, 每隔 delay 秒重试, 最多 cnt 次重试
function retry(fn, delay, cnt) {
  return new Promise((resolve, reject) => {
    const fn_ = Promise.resolve(fn())
      .then((res) => resolve(res))
      .catch((err) => {
        if (cnt > 0) {
          setTimeout(fn_, delay);
          cnt--;
        } else {
          reject(err);
        }
      });
    fn_();
  });
}
