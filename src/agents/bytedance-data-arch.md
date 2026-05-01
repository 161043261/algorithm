# 前端面试题速查

按主题整理的前端面试知识点与手写题示例，方便复习、检索和快速回顾。

## 目录

- 计算机网络与 HTTP
- 浏览器与渲染
- CSS
- 事件与框架
- JavaScript 基础与运行机制
- 手写题与工程实践
- Go 相关

## 计算机网络与 HTTP

### 1. 进程间通信的几种方式

- 管道(Pipe)：分为匿名管道和命名管道，半双工通信。
- 消息队列(Message Queue)：消息的链表，存放在内核中并由消息队列标识符标识。
- 共享内存(Shared Memory)：映射一段能被其他进程所访问的内存，这段共享内存由一个进程创建，但多个进程都可以访问。
- 信号量(Semaphore)：一个计数器，可以用来控制多个进程对共享资源的访问，通常作为锁机制使用。
- 信号(Signal)：用于通知接收进程某个事件已经发生。
- 套接字(Socket)：可用于不同机器间的进程通信。

### 2. 进程间通信方式按性能从好到坏排序

1. 共享内存（最快，因为直接读写内存，不需要数据拷贝）
2. 消息队列
3. 命名管道/匿名管道
4. 套接字(Socket)（涉及网络协议栈，通常最慢，但本地 Socket 性能会好于网络 Socket）

### 3. TCP 如何实现可靠传输

- 序列号与确认应答 (ACK)：每个发送的数据包都有序列号，接收端收到后返回确认应答。
- 超时重传：发送数据后启动定时器，如果在规定时间内未收到确认，则重新发送。
- 校验和 (Checksum)：验证数据在传输过程中是否被损坏。
- 流量控制 (Flow Control)：通过滑动窗口机制控制发送速率，防止接收端缓冲区溢出。
- 拥塞控制 (Congestion Control)：通过慢启动、拥塞避免、快速重传和快速恢复机制，防止网络拥塞。

### 4. 使用 TCP 协议做直播可以吗

可以，但不是超低延迟直播的首选。

- 优点：TCP 保证数据按序且可靠到达，不会出现花屏、马赛克等丢包现象。
- 缺点：由于 TCP 的握手、重传和拥塞控制机制，在网络不佳时会导致较高的延迟和卡顿，不适合对实时性要求极高的场景（如视频会议、连麦）。
- 常见应用：RTMP、HLS 等直播协议底层是基于 TCP 的。但 WebRTC 等超低延迟协议通常基于 UDP，在应用层实现自己的重传和丢包恢复。

## 浏览器与渲染

### 5. 输入 URL 到服务器响应并完成页面渲染的过程

1. URL 解析：提取协议、域名、端口和路径等。
2. 缓存与 Service Worker：优先检查浏览器缓存与 Service Worker，命中则可能直接返回。
3. DNS 解析：查询缓存，递归或迭代查询，将域名转换为服务器 IP 地址。
4. 建立连接：TCP 三次握手；HTTPS 还会进行 TLS 握手与证书校验，可能复用现有连接或使用 HTTP/2 多路复用。
5. 发送 HTTP 请求：构建并发送请求报文。
6. 服务器处理并响应：服务器处理业务逻辑，返回 HTTP 响应并携带缓存控制头。
7. 浏览器解析与渲染：
   - 解析 HTML，构建 DOM 树。
   - 解析 CSS，构建 CSSOM 树。
   - 合并 DOM 树和 CSSOM 树，生成渲染树 (Render Tree)。
   - Layout（回流/布局）：计算各个节点的几何尺寸和位置。
   - Paint（重绘/绘制）：将渲染树中的节点绘制到屏幕上。
   - Composite（合成）：合成图层并显示到屏幕。

### 6. 如果打开页面时出现白屏，如何排查

1. 检查网络请求：Network 面板确认 HTML、JS、CSS 是否加载成功，是否 404、500 或被拦截。
2. 检查控制台报错：Console 是否有语法错误、未捕获异常导致挂载失败。
3. 定位白屏阶段：Performance 面板判断是加载慢还是渲染失败，是否首屏 JS 执行耗时过长。
4. 检查路由配置：SPA 路由是否匹配失败，是否路由守卫阻塞渲染。
5. 检查渲染入口：根节点是否存在、挂载是否执行、SSR 是否 hydration 失败。
6. 服务端排查：SSR 页面检查渲染服务与接口是否异常。

### 7. HTTP header 中常见的 Key, 强缓存和协商缓存

- 常见 Key：`Host`, `User-Agent`, `Accept`, `Content-Type`, `Authorization`, `Cookie`, `Cache-Control`, `ETag`, `Last-Modified`, `If-None-Match`, `If-Modified-Since`, `Content-Encoding`, `Content-Length`, `Origin`, `Referer`, `Access-Control-Allow-Origin`。
- 强缓存：浏览器直接从本地缓存读取资源，不向服务器发送请求。主要通过 `Cache-Control` (如 `max-age=3600`) 和 `Expires` 控制。`Cache-Control` 优先级更高。
- 协商缓存：当强缓存失效或设置为 `no-cache` 时，浏览器携带缓存标识符向服务器发起请求验证。
  - 使用 `If-None-Match` 请求头携带上次服务器返回的 `ETag`。
  - 使用 `If-Modified-Since` 携带上次服务器返回的 `Last-Modified`。
  - 服务器比对后，若资源未变，返回 `304 Not Modified`；若已变，返回 `200` 及新资源。

### 8. GET、POST、PUT、DELETE 等请求方式的区别，什么是 RESTful

- GET：获取资源。参数一般在 URL 中，幂等，可被缓存，受 URL 长度限制。
- POST：创建资源或提交数据。参数在请求体中，非幂等，不可缓存。
- PUT：更新资源（全量替换）。参数在请求体中，幂等。
- DELETE：删除资源。幂等。
- RESTful：一种面向资源的软件架构风格。使用 URI 定位资源，使用 HTTP 动词描述操作（增删改查），状态转移通过表示层（如 JSON 数据）完成。

### 9. HTTPS 如何保证安全性

HTTPS = HTTP + TLS/SSL。主要通过以下机制保证安全：

- 加密：混合加密机制。握手阶段使用非对称加密交换“会话密钥”（对称密钥），后续通信使用该“会话密钥”进行对称加密，兼顾安全与性能。
- 身份认证：通过数字证书（CA 签发）验证服务器的真实身份，防止中间人攻击。
- 完整性校验：通过 MAC（消息认证码）或哈希算法，防止数据在传输过程中被篡改。

### 10. 抓 HTTPS 包时为什么需要配置并信任安全证书

抓包工具（如 Charles、Fiddler）充当了客户端和服务器之间的中间人。由于 HTTPS 会校验证书，抓包工具无法提供目标服务器的合法证书。因此，必须在客户端（手机或电脑）安装并信任抓包工具自己生成的根证书（Root CA）。这样抓包工具就能动态伪造目标域名的证书骗过客户端，从而解密客户端发出的请求，再重新加密发给真正的服务器。

### 11. 什么是跨域

浏览器的同源策略 (Same-Origin Policy) 限制了从一个源加载的文档或脚本如何与另一个源的资源进行交互。当请求的协议 (Protocol)、域名 (Domain)、端口 (Port) 三者中有任何一个不同时，即为跨域。

### 12. 跨域的解决方法有哪些，原理是什么

1. CORS (跨域资源共享)：服务端在响应头中添加 `Access-Control-Allow-Origin` 等字段。复杂请求会触发预检请求（OPTIONS）以确认权限。
2. JSONP：利用 `<script>` 标签不受同源策略限制，服务端返回函数调用。只支持 GET。
3. Nginx 反向代理：同源策略只限制浏览器，服务器之间不受限制。前端请求同源 Nginx，再由 Nginx 转发到目标服务。
4. WebSocket：协议本身允许跨域，握手后双向通信。
5. postMessage：用于跨窗口或 iframe 的安全通信。

### 13. 浏览器的渲染过程

1. 解析 HTML 生成 DOM 树。
2. 解析 CSS 生成 CSSOM 树。
3. 将 DOM 树和 CSSOM 树结合，生成渲染树 (Render Tree)。
4. Layout (布局/回流)：计算节点大小与位置。
5. Paint (绘制/重绘)：把节点绘制成位图。
6. Composite (合成)：合成图层并显示到屏幕。
7. JS 执行会阻塞解析，CSS 会阻塞渲染树的生成。

### 14. 将 `document.body` 背景色从蓝色改为红色，会发生什么

只会发生重绘 (Repaint)，不会发生回流 (Reflow)。
因为修改背景颜色只改变了元素的视觉外观，并没有改变元素的几何尺寸、位置或文档布局结构。浏览器会直接跳过布局阶段，触发绘制过程，更新该区域的像素颜色。

## CSS

### 15. CSS 如何实现居中

- 水平居中：
  - 行内/行内块元素：父元素设置 `text-align: center;`
  - 块级元素：定宽，设置 `margin: 0 auto;`
- 垂直居中：
  - 单行文本：设置 `line-height` 等于容器 `height`。
- 水平垂直居中：
  1. Flexbox：`display: flex; justify-content: center; align-items: center;`
  2. 绝对定位 + Transform：`position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);`
  3. 绝对定位 + Margin Auto：`position: absolute; top: 0; right: 0; bottom: 0; left: 0; margin: auto;`
  4. Grid：`display: grid; place-items: center;`

### 16. CSS 布局方式有哪些

1. 标准流 (Normal Flow)：块级元素从上到下，行内元素从左到右排布。
2. 浮动布局 (Float)：利用 `float` 属性，主要用于实现文字环绕或传统的多列布局。需注意清除浮动。
3. 定位布局 (Position)：`relative`、`absolute`、`fixed`、`sticky`，通过坐标精确控制元素位置。
4. Flex 布局 (Flexbox)：一维布局模型，非常适合空间分配和对齐。
5. Grid 布局 (CSS Grid)：二维布局模型，适合复杂的网格状页面结构。

## 事件与框架

### 17. 事件的冒泡和捕获

DOM 事件流分为三个阶段：

1. 捕获阶段 (Capture Phase)：事件从 `Window` 对象向下传递，直到目标元素的父节点。
2. 目标阶段 (Target Phase)：事件在目标元素上触发。
3. 冒泡阶段 (Bubble Phase)：事件从目标元素向上冒泡，直到 `Window` 对象。
   默认情况下，`addEventListener` 绑定的事件处理函数在冒泡阶段执行。可以通过将其第三个参数设置为 `true`，让其在捕获阶段执行。可以使用 `e.stopPropagation()` 阻止事件的进一步传播。

### 18. 分别说明 React 和 Vue 的 diff 算法，并对比

- React diff：基于 Fiber 的同层级比较。类型不同直接替换，类型相同复用并更新 props。列表对比依赖 `key`，通常先按索引比较，再建立 key 到旧节点的映射以复用节点，最后移动或插入。
- Vue2 diff：双端比较算法。在新旧子节点列表的头尾各设置两个指针，向中间靠拢，尽量复用节点。
- Vue3 diff：快速 Diff 算法。先处理头部和尾部的相同节点，对于中间剩余的混乱节点，使用最长递增子序列算法找出最少需要移动的节点，实现最小化的 DOM 操作。
- 对比：Vue（尤其是 Vue3）在处理复杂列表的节点移动时，通过双端比较和最长递增子序列，能够做到更少的 DOM 移动操作，性能通常优于 React 的简单右移策略。

### 19. 分别说明 React 和 Vue 的组件生命周期，并对比

- React 类组件：`constructor` -> `render` -> `componentDidMount` -> `shouldComponentUpdate` -> `render` -> `componentDidUpdate` -> `componentWillUnmount`。
- React 函数组件：没有传统的生命周期，主要依赖 `useEffect` hook 模拟。`useEffect(fn, [])` 类似 `componentDidMount`；`useEffect(fn)` 类似 `componentDidMount` + `componentDidUpdate`；返回的 cleanup 函数类似 `componentWillUnmount`。
- Vue 组件：`beforeCreate` / `created` -> `beforeMount` / `mounted` -> `beforeUpdate` / `updated` -> `beforeUnmount` / `unmounted`。
- 对比：Vue 的生命周期钩子粒度更细，直接绑定在实例上，且与响应式系统结合紧密。React 的生命周期（特别是 Hooks）更强调“副作用的同步与清理”，思维模式更加函数式和数据驱动。

### 20. React 的 VDOM 数据结构是什么样的

Virtual DOM 在 React 中本质上是一个 JavaScript 对象（`ReactElement`）。核心属性包括：

- `type`：节点类型（如 `'div'` 或组件函数/类）。
- `props`：属性对象，包含 `className`、`style` 以及嵌套的 `children`。
- `key`：用于 Diff 算法的唯一标识符。
- `ref`：用于获取真实 DOM 或组件实例的引用。
  在 React 16 引入 Fiber 后，VDOM 节点被转化为 Fiber 节点，增加了 `child` (第一个子节点)、`sibling` (下一个兄弟节点)、`return` (父节点) 等指针，构成了一个可中断遍历的链表树。

### 21. `useEffect` 等 Hook 的第二个参数，详细介绍

第二个参数是依赖数组 (Dependency Array)，用于控制副作用的执行时机。

- 不传第二个参数：每次渲染后都会执行。
- 空数组 `[]`：仅在首次挂载执行一次，卸载时执行清理函数。
- 包含变量的数组 `[a, b]`：首次执行一次，之后当任一依赖通过 `Object.is` 发生变化时重新执行。
- 依赖项是对象/函数：引用变化会触发执行，通常配合 `useMemo` 或 `useCallback` 稳定引用。

### 22. zustand 对比 jotai

- Zustand：基于单一状态树（类似 Redux），但写法极其轻量。状态集中在一个 Store 中，组件通过 selector 按需订阅。支持中间件（如持久化），上手简单，适合大部分中小型甚至大型项目。
- Jotai：基于原子化状态（类似 Recoil）。状态被分散定义为独立的 Atom，组件按需引入并组合 Atom。自下而上的状态管理模式，非常适合状态依赖复杂、需要极高细粒度更新优化的场景。

### 23. 介绍 useExternalStore 这个新 hook

React 18 的官方 Hook 名称是 `useSyncExternalStore`，用于订阅外部数据源（如 Redux、Zustand、全局变量、DOM 状态等）。
它的主要目的是解决并发渲染下外部状态突变导致的撕裂（Tearing）问题，确保一次渲染周期内读取到一致的快照。
它接收三个参数：

1. `subscribe`：注册回调函数，当外部 Store 改变时触发。
2. `getSnapshot`：返回外部 Store 的当前快照。
3. `getServerSnapshot`（可选）：用于 SSR 时提供快照。

### 24. Vue2/Vue3 双向绑定原理

- Vue2：基于 `Object.defineProperty` 劫持对象的 getter 和 setter。在 getter 中进行依赖收集（Watcher 订阅 Dep），在 setter 中触发更新（Dep.notify）。缺点是无法监听对象属性的新增/删除，以及数组索引和长度的变化。
- Vue3：基于 ES6 `Proxy` 代理整个对象，配合 `Reflect` 操作。可以直接拦截对象属性的读取、设置、新增、删除等所有操作。不仅解决了 Vue2 的痛点，还支持 Map、Set 等更丰富的数据结构，且初始化性能更好（懒代理）。

### 25. Vue3 的 track/trigger; 为什么要依赖收集, 不依赖收集会怎么样

- track (追踪)：在 Proxy 的 getter 拦截器中调用，用于记录当前正在运行的副作用函数（Effect）与目标对象属性之间的依赖关系。
- trigger (触发)：在 Proxy 的 setter 拦截器中调用，当属性被修改时，找到并执行与之关联的所有副作用函数。
- 为什么要依赖收集：为了实现细粒度的精准更新。只有当某个数据在模板或计算属性中真正被访问到时，才会建立联系，数据变化时只更新依赖它的组件。
- 不依赖收集会怎么样：如果不知道谁用到了数据，那么一旦任何数据变化，就只能暴力地重新渲染整个应用（类似早期的脏检查或全量刷新），这会导致极其严重的性能浪费。

### 26. 介绍 React.memo, useMemo, useCallback 等性能优化 hook

- React.memo：高阶组件，用于对组件的 `props` 进行浅比较。只有 `props` 发生变化时，组件才会重新渲染，避免父组件更新导致的无意义的子组件重渲染。
- useMemo：缓存复杂计算的结果。接收一个工厂函数和依赖数组，只有依赖项改变时才重新计算。用于避免每次渲染时都执行昂贵的计算。
- useCallback：缓存函数的引用。接收一个回调函数和依赖数组，只有依赖项改变时才返回新的函数引用。常配合 `React.memo` 使用，防止将内联函数作为 props 传给子组件时，由于函数引用每次更新而打破 `React.memo` 的优化。

## JavaScript 基础与运行机制

### 27. JS 的数据类型有哪些

- 基本数据类型 (Primitive)：`Undefined`、`Null`、`Boolean`、`Number`、`String`、`Symbol` (ES6)、`BigInt` (ES2020)。
- 引用数据类型 (Reference)：`Object`（包含普通对象、`Array`、`Function`、`Date`、`RegExp`、`Map`、`Set` 等）。

### 28. JS 如何遍历一个对象

1. `for...in`：遍历对象自身及原型链上的可枚举属性（不含 Symbol）。
2. `Object.keys(obj)`：返回对象自身的可枚举属性名数组。
3. `Object.values(obj)`：返回对象自身的可枚举属性值数组。
4. `Object.entries(obj)`：返回对象自身的键值对 `[key, value]` 数组。
5. `Object.getOwnPropertyNames(obj)`：返回对象自身的所有属性（包含不可枚举，不含 Symbol）。
6. `Reflect.ownKeys(obj)`：返回对象自身的所有属性（包含不可枚举和 Symbol）。

### 29. 什么是闭包，闭包有哪些陷阱

- 闭包 (Closure)：函数和声明该函数的词法环境的组合。通俗地说，闭包允许内部函数访问并操作其外部函数作用域中的变量，即使外部函数已经执行完毕。
- 陷阱：
  1. 内存泄漏：闭包会使得外部函数的变量常驻内存。如果不及时解除引用（将变量置为 `null`），可能导致内存泄漏。
  2. 循环中的异步变量共享：在 `for` 循环中使用 `var` 声明变量并在异步回调中访问，会导致所有闭包共享同一个最终的变量值。解决办法是使用 `let` 形成块级作用域，或使用 IIFE。

### 30. 阅读以下代码，判断输出并说明原因

```js
console.log(a); // 输出: undefined。原因：var a 存在变量提升，但赋值操作留在原地。
console.log(b()); // 输出: "b"。原因：函数声明 function b 整体提升到了作用域顶部。
console.log(c); // 输出: undefined。原因：var c 存在变量提升，此时 c 还未被赋值为函数。

var a = 10;
function b() {
  return "b";
}
var c = function () {
  return "c";
};

console.log(a); // 输出: 10。
console.log(c()); // 输出: "c"。此时 c 已经被赋值为函数。

{
  console.log(d); // 报错: ReferenceError: Cannot access 'd' before initialization。
  // 原因：let 声明的变量存在“暂时性死区 (TDZ)”，在声明语句之前无法访问。
  let d = 20;
}
```

### 31. 详细介绍 JS 的事件循环

JS 是单线程非阻塞的，通过事件循环 (Event Loop) 处理异步任务。浏览器环境中的执行顺序如下：

1. 执行同步代码：属于一个宏任务。
2. 执行微任务队列：`Promise.then`、`MutationObserver` 等会在本轮宏任务结束后依次执行完。
3. UI 渲染：需要更新时在此阶段渲染，`requestAnimationFrame` 回调也会在这里附近执行。
4. 执行下一个宏任务：如 `setTimeout`、`setInterval`、I/O、事件回调。
5. 重复步骤 2-4，循环往复。

### 32. 介绍 JS 的垃圾回收机制

JS 引擎通过自动垃圾回收机制管理内存，核心概念是可达性 (Reachability)。

1. 标记-清除 (Mark and Sweep)：最主要的算法。垃圾收集器从根对象（如 `window`、全局变量）开始，标记所有可以访问到的对象。然后遍历堆内存，将没有被标记的对象（不可达对象）清除掉。
2. 引用计数 (Reference Counting)：早期的算法。记录每个对象被引用的次数，当引用次数为 0 时将其回收。致命缺点是无法处理循环引用，导致内存泄漏。
3. V8 引擎优化 (分代回收)：V8 将堆内存分为新生代和老生代。
   - 新生代存放存活时间短的对象，使用 Scavenge 算法（将内存平分为两半，互相复制存活对象，清理非存活对象）。
   - 老生代存放存活时间长或体积大的对象，使用标记-清除和标记-整理（防止内存碎片）算法。

### 33. hash 碰撞的解决方法和优缺点

- 链地址法 (拉链法)：将哈希值相同的元素存放在同一个链表中（如 Java 的 HashMap）。
  - 优点：处理冲突简单，无堆积现象；链表节点动态申请，适合负载因子大的情况。
  - 缺点：指针需要额外的空间。
- 开放定址法：发生冲突时，按照某种探测序列（线性探测、二次探测等）在散列表中寻找下一个空闲位置。
  - 优点：不需要额外的指针空间，空间利用率高。
  - 缺点：容易产生“聚集/堆积”现象；删除元素时不能直接物理删除，只能做逻辑删除标记。
- 再哈希法：发生冲突时，使用不同的哈希函数再次计算，直到不冲突。
  - 优点：不易产生聚集。
  - 缺点：增加了哈希计算的时间开销。

## 手写题与工程实践

### 34. 写一个拓扑排序算法

```typescript
function topologicalSort(
  numCourses: number,
  prerequisites: number[][],
): number[] {
  // 入度数组
  const inDegree = new Array(numCourses).fill(0);
  // 邻接表表示图
  const graph: Map<number, number[]> = new Map();

  // 构建图和入度表
  for (const [course, pre] of prerequisites) {
    inDegree[course]++;
    if (!graph.has(pre)) graph.set(pre, []);
    graph.get(pre)!.push(course);
  }

  // 将所有入度为 0 的节点加入队列
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const result: number[] = [];
  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current);

    // 将依赖该课程的后续课程入度减 1
    const neighbors = graph.get(current) || [];
    for (const neighbor of neighbors) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  // 如果结果数量等于课程数，说明无环，可以完成拓扑排序
  return result.length === numCourses ? result : [];
}
```

### 35. 写一个生成数组的全排列

```typescript
function permute<T>(nums: T[]): T[][] {
  const result: T[][] = [];
  const used: boolean[] = new Array(nums.length).fill(false);

  function backtrack(path: T[]) {
    // 递归终止条件
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      path.push(nums[i]);

      backtrack(path);

      // 回溯状态
      path.pop();
      used[i] = false;
    }
  }

  backtrack([]);
  return result;
}
```

### 36. 实现 Promise.prototype.half

```typescript
declare global {
  interface PromiseConstructor {
    half<T>(promises: Promise<T>[]): Promise<T[]>;
  }
  interface Promise<T> {
    half?(promises: Promise<T>[]): Promise<T[]>;
  }
}

Promise.half = function <T>(promises: Promise<T>[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    if (!promises || promises.length === 0) {
      return resolve([]);
    }

    const total = promises.length;
    const target = Math.ceil(total / 2);
    const results: T[] = [];
    let resolvedCount = 0;
    let rejectedCount = 0;

    promises.forEach((p) => {
      Promise.resolve(p).then(
        (value) => {
          results.push(value);
          resolvedCount++;
          if (resolvedCount === target) {
            resolve(results);
          }
        },
        () => {
          rejectedCount++;
          if (rejectedCount > total - target) {
            reject(
              new Error("Too many rejections to resolve half of the promises"),
            );
          }
        },
      );
    });
  });
};

Promise.prototype.half = function <T>(
  this: Promise<T>,
  promises: Promise<T>[],
) {
  return Promise.half(promises);
};
```

### 37. 实现 lazy 函数 (或类)

```typescript
class LazyMan {
  private queue: Array<() => Promise<void>> = [];

  constructor(name: string) {
    // 将初始任务加入队列
    this.queue.push(async () => {
      console.log(name);
    });

    // 利用微任务，等待同步的链式调用把所有任务注册完毕后，再开始执行队列
    Promise.resolve().then(() => this.run());
  }

  private async run() {
    for (const task of this.queue) {
      await task();
    }
  }

  do(action: string) {
    this.queue.push(async () => {
      console.log(action);
    });
    return this;
  }

  sleep(ms: number) {
    this.queue.push(async () => {
      await new Promise((resolve) => setTimeout(resolve, ms));
    });
    return this;
  }

  sleepFirst(ms: number) {
    // 插入到队列的最前面
    this.queue.unshift(async () => {
      await new Promise((resolve) => setTimeout(resolve, ms));
    });
    return this;
  }
}

function lazy(name: string) {
  return new LazyMan(name);
}

// 测试用例
// lazy("Tom").sleepFirst(2000).do("supper");
```

### 38. 实现 JS 深拷贝

```typescript
function deepClone<T>(obj: T, map = new WeakMap()): T {
  // 基本类型或 null 直接返回
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // 解决循环引用
  if (map.has(obj)) {
    return map.get(obj);
  }

  // 处理 Date 和 RegExp
  if (obj instanceof Date) return new Date(obj.getTime()) as any;
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags) as any;

  // 处理 Map
  if (obj instanceof Map) {
    const resultMap = new Map();
    map.set(obj, resultMap);
    obj.forEach((value, key) => {
      resultMap.set(deepClone(key, map), deepClone(value, map));
    });
    return resultMap as any;
  }

  // 处理 Set
  if (obj instanceof Set) {
    const resultSet = new Set();
    map.set(obj, resultSet);
    obj.forEach((value) => {
      resultSet.add(deepClone(value, map));
    });
    return resultSet as any;
  }

  // 处理数组或普通对象
  const cloneObj = Array.isArray(obj)
    ? []
    : Object.create(Object.getPrototypeOf(obj));
  map.set(obj, cloneObj);

  // 使用 Reflect.ownKeys 可以遍历到 Symbol 属性和不可枚举属性（视需求而定，一般深拷贝可枚举即可）
  for (const key of Reflect.ownKeys(obj)) {
    cloneObj[key] = deepClone((obj as any)[key], map);
  }

  return cloneObj;
}
```

### 39. 对于 URL 查询参数，实现 `query.parse` 和 `query.stringify`

```typescript
const query = {
  parse: (str: string): Record<string, string> => {
    if (str.startsWith("?")) {
      str = str.slice(1);
    }
    const result: Record<string, string> = {};
    if (!str) return result;

    const pairs = str.split("&");
    for (const pair of pairs) {
      const [key, value] = pair.split("=");
      if (key) {
        result[decodeURIComponent(key)] = decodeURIComponent(value || "");
      }
    }
    return result;
  },

  stringify: (obj: Record<string, string | number | boolean>): string => {
    const parts: string[] = [];
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const val = obj[key];
        if (val !== undefined && val !== null) {
          parts.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`,
          );
        }
      }
    }
    return parts.length > 0 ? `?${parts.join("&")}` : "";
  },
};
```

### 40. 对于 URL 查询参数，实现 React `useUrlState` Hook 和 Vue Hook

react hook

```typescript
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

interface Options {
  navigateMode?: "push" | "replace";
}

function useUrlState<T extends Record<string, any>>(
  initialState?: T | (() => T),
  options?: Options,
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigateMode = options?.navigateMode || "push";

  // 计算当前合并后的状态
  const state = useMemo(() => {
    const current: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      current[key] = value;
    });
    const init =
      typeof initialState === "function"
        ? (initialState as Function)()
        : initialState;
    return { ...init, ...current } as T;
  }, [searchParams, initialState]);

  const setState = useCallback(
    (s: Partial<T> | ((prevState: T) => Partial<T>)) => {
      const newState = typeof s === "function" ? s(state) : s;

      const newSearchParams = new URLSearchParams(searchParams);

      Object.entries(newState).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      });

      setSearchParams(newSearchParams, { replace: navigateMode === "replace" });
    },
    [searchParams, state, navigateMode, setSearchParams],
  );

  return [state, setState] as const;
}
```

vue hook

```typescript
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

interface Options {
  navigateMode?: "push" | "replace";
}

function useUrlState<T extends Record<string, any>>(
  initialState?: T | (() => T),
  options?: Options,
) {
  const route = useRoute();
  const router = useRouter();
  const navigateMode = options?.navigateMode || "push";
  const init =
    typeof initialState === "function"
      ? (initialState as () => T)()
      : initialState;

  const state = computed(() => {
    return { ...init, ...route.query } as T;
  });

  const setState = (s: Partial<T> | ((prevState: T) => Partial<T>)) => {
    const next = typeof s === "function" ? s(state.value) : s;
    const query = { ...route.query, ...next } as Record<string, any>;
    Object.keys(query).forEach((key) => {
      const value = query[key];
      if (value === undefined || value === null) {
        delete query[key];
      }
    });
    router[navigateMode]({ query });
  };

  return [state, setState] as const;
}
```

## Go 相关

### 41. Golang GMP 模型

GMP 是 Go 运行时调度模型：

- G (Goroutine)：轻量级协程，包含栈、寄存器上下文和待执行的函数。
- M (Machine)：操作系统线程，真正执行代码的实体。
- P (Processor)：逻辑处理器，调度资源载体，决定并发度，维护本地可运行队列。

核心机制：

1. P 绑定 M：M 必须拿到一个 P 才能执行 G。
2. 本地队列与全局队列：每个 P 有本地 runq，队列满时一部分 G 会被移入全局队列。
3. 工作窃取：P 的队列空时会从其他 P 窃取一半的 G，提高负载均衡。
4. 系统调用与阻塞：G 进入阻塞系统调用时，M 可能与 P 解绑，P 继续绑定其他 M 执行。
5. 抢占与调度：运行时会在函数调用或安全点进行抢占，避免长时间占用 CPU。
6. 网络轮询器：网络 IO 由 netpoll 处理，阻塞的 G 在 IO 就绪后重新入队。

优势是大量 Goroutine 复用少量 OS 线程，调度开销小且能充分利用多核。

### 42. 对比 JS 的 Promise, async/await 和 Golang 的 go 关键字、chan 管道

对比维度：

- 并发模型：
  - JS：单线程事件循环，`Promise`/`async` 只是异步编排，实际并发依赖宿主（浏览器/Node）。
  - Go：M:N 调度，`go` 创建 Goroutine，运行时调度到多个 OS 线程并行执行。
- 语义表达：
  - JS `Promise`：表示未来值，链式组合 `then/catch/finally`。
  - JS `async/await`：基于 Promise 的语法糖，写同步风格的异步。
  - Go `go`：直接并发执行函数。
  - Go `chan`：通信与同步原语，强调通过通信共享数据。
- 同步与阻塞：
  - JS：`await` 只阻塞当前 async 函数，不阻塞主线程。
  - Go：读写 `chan` 会阻塞当前 Goroutine，线程不一定阻塞。
- 错误处理：
  - JS：`Promise` 使用 reject/catch；`async/await` 用 try/catch。
  - Go：常规错误返回值，`panic`/`recover` 属于异常通道。
- 取消与超时：
  - JS：需要手动引入 `AbortController` 或自定义取消信号。
  - Go：通常用 `context.Context` 控制取消与超时。
- 组合与竞争：
  - JS：`Promise.all`/`race`/`allSettled` 等组合。
  - Go：`select` 在多个 channel 上竞争或超时。

结论：JS 的 Promise/async 更偏向异步流程控制；Go 的 goroutine/channel 属于语言级并发与通信模型，适合高并发场景。
