// setTimeout 模拟 setInterval
function setInterval_(fn, delay) {
  let timer = null;

  const loopFn = () => {
    fn();
    timer = setTimeout(loopFn, delay);
  };
  loopFn();

  return {
    // clear 清除定时器
    clear() {
      clearTimeout(timer);
    },
  };
}

let cnt = 0;
const { clear } = setInterval_(() => console.log(cnt++), 1000);
setTimeout(clear, 7000);

export default {}
