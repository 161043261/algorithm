// 异步任务分为宏任务和微任务
// 宏任务: <script> 整体代码, setTimeout, setInterval, I/O 操作 (XMLHttpRequest, fetch, postMessage), requestAnimationFrame
// 微任务: Promise[.then, .catch, .finally], MutationObserver, process.nextTick

// 先执行一个宏任务, 再执行当前宏任务的微任务, 然后进入下一个事件循环
class Promise_ {
  constructor(executor) {
    // resolve (fulfilled) 时的回调函数列表
    this.onfulfilledCallbackList = [];
    // reject 时的回调函数列表
    this.onrejectedCallbackList = [];
    // state: 'pending' | 'fulfilled' | 'rejected'
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;

    const resolve = (value_) => {
      if (this.state !== "pending") return;
      this.state = "fulfilled"; // resolve
      this.value = value_;
      setTimeout(() => {
        console.log(
          "onfulfilledCallbackList",
          this.onfulfilledCallbackList.map((cb) => cb.toString()),
        );
        this.onfulfilledCallbackList.forEach((cb) => cb(value_));
      });
    };

    const reject = (reason_) => {
      if (this.state !== "pending") return;
      this.state = "rejected"; // reject
      this.reason = reason_;
      setTimeout(() => {
        console.log(
          "onrejectedCallbackList",
          this.onrejectedCallbackList.map((cb) => cb.toString()),
        );
        this.onrejectedCallbackList.forEach((cb) => cb(reason_));
      });
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onfulfilled, onrejected) {
    return new Promise_((resolve, reject) => {
      this.onfulfilledCallbackList.push(() => {
        const ret = onfulfilled(this.value);
        console.log("onfulfilled ret", ret);
        if (ret instanceof Promise_) {
          ret.then(resolve, reject);
        } else {
          resolve(ret);
        }
      });

      this.onrejectedCallbackList.push(() => {
        const ret = onrejected(this.reason);
        console.log("onrejected ret", ret);
        if (ret instanceof Promise_) {
          ret.then(resolve, reject);
        } else {
          resolve(ret);
        }
      });
    });
  }
}

new Promise_((resolve /* , reject */) => {
  setTimeout(() => {
    resolve(1);
  }, 3000);
})
  .then(
    (value) => {
      console.log(value);
      return new Promise_((resolve) => {
        setTimeout(() => {
          resolve(2);
        }, 7000);
      });
    } /* onfulfilled */,
  )
  .then((value) => {
    console.log("then", value);
  });

// todo Promise.race

// todo Promise.all
