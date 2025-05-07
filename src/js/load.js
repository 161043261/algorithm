/* eslint-disable @typescript-eslint/no-unused-vars */
// 图片懒加载

function lazyLoad() {
  // 获取所有的 img 元素
  const imgList = document.getElementsByTagName("img");

  // 目标元素与 IntersectionObserver.root 根元素的相交矩形的面积
  // 与目标元素的边界矩形的面积的比值超过阈值 threshold 时
  // 执行指定的回调函数
  const observer = new IntersectionObserver((imgList_) => {
    imgList_.forEach((item) => {
      // 判断目标元素是否在视口中
      if (item.intersectionRatio > 0) {
        // 设置 img 元素的 src 属性
        item.target.src = item.target.getAttribute("data-src");
        // 设置 src 属性后, 停止监听
        observer.unobserve(item.target);
      }
    });
  });

  for (let i = 0; i < imgList.length; i++) {
    observer.observe(imgList[i]);
  }
}

function asyncLoad(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve();
      img.onerror = () => reject();
      document.getElementById("root").appendChild(img);
    }, 5000);
  });
}

/**
 *
 * @param {Array<string>} urlList
 * @param {number} num 最大并发数
 */
function concurrent(urlList, num) {
  return new Promise((resolve, reject) => {
    let cnt = 0;
    let idleNum = num;

    const executor = () => {
      while (idleNum > 0 && urlList.length > 0) {
        const url = urlList.shift();
        const loadPromise = asyncLoad(url);
        idleNum--;
        loadPromise
          .then(() => {
            idleNum++;
            cnt++;
            if (cnt === urlList.length) {
              resolve("asyncLoad");
            } else {
              executor();
            }
          })
          .catch((err) => reject(err));
      }
    };

    executor();
  });
}

concurrent(
  [
    "https://cdn2.thecatapi.com/images/12s.jpg",
    "https://cdn2.thecatapi.com/images/1rv.jpg",
    "https://cdn2.thecatapi.com/images/2dl.jpg",
    "https://cdn2.thecatapi.com/images/7kl.jpg",
    "https://cdn2.thecatapi.com/images/a1o.jpg",
    "https://cdn2.thecatapi.com/images/bjs.jpg",
    "https://cdn2.thecatapi.com/images/c2i.jpg",
    "https://cdn2.thecatapi.com/images/cm7.jpg",
    "https://cdn2.thecatapi.com/images/e77.jpg",
  ],
  2,
).then(console.log);

export default {}
