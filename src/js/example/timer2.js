// setInterval 模拟 setTimeout

function setTimeout_(fn, delay) {
  let timer = setInterval(() => {
    clearInterval(timer);
    fn();
  }, delay);
}

setTimeout_(() => {
  console.log("setTimeout_");
}, 3000);

export default {};
