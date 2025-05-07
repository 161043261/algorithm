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

function asyncLoad() {

}
