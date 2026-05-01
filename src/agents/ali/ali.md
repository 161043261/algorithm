# 笔试题解析

## 题目来源

- 技术方向：计算机基础 / 前端开发

## 题目整理

### 第 14 题 [单选题]

#### 题目

```javascript
(() => {
  function Foo() {}
  Foo.prototype.x = 1;
  const a = new Foo();
  Foo.prototype = { x: 2 };
  const b = new Foo();
  console.log(a.x + "|" + b.x);
})();
```

#### 选项

- A. `1|2`
- B. `2|2`
- C. `1|1`
- D. `undefined|2`

#### 答案

A. `1|2`

#### 解析

`a` 在创建时，其原型链已经指向当时的 `Foo.prototype`，其中 `x = 1`。后面执行：

```javascript
Foo.prototype = { x: 2 };
```

这一步不是修改旧原型对象上的属性，而是让 `Foo.prototype` 指向了一个全新的对象。因此：

- `a` 仍然沿着旧原型对象查找，得到 `a.x === 1`
- `b` 在新原型对象建立后创建，因此沿着新原型对象查找，得到 `b.x === 2`

最终输出就是：

```text
1|2
```

#### 延伸说明

需要区分两种操作：

- 修改原型对象属性：会影响所有共享该原型对象的实例
- 直接替换 `Foo.prototype`：只会影响替换之后新创建的实例

### 第 15 题 [多选题]

#### 题目

关于前端存储敏感信息的风险与取舍，哪些说法较合理？

#### 选项

- A. `localStorage` 可被同源脚本读取，发生 XSS 时泄漏风险上升
- B. `HttpOnly Cookie` 降低 JS 读取 Cookie 的风险，但仍需配合 CSRF 防护
- C. 把令牌放在 URL 查询参数中可能进入日志或 Referer 链路
- D. 把令牌放在 DOM 属性中可避免被 JS 读取

#### 答案

A、B、C

#### 解析

这道题的核心在于理解“前端可读存储”和“浏览器自动携带凭证”分别带来的安全权衡。

- A 正确。`localStorage` 对同源 JavaScript 可读，因此一旦页面存在 XSS，攻击脚本就可能直接读取并窃取其中的敏感令牌。
- B 正确。`HttpOnly Cookie` 无法被前端 JS 直接读取，因此能降低 XSS 窃取 Cookie 的风险；但浏览器会自动携带 Cookie，所以仍然需要结合 `SameSite`、CSRF Token 等机制防御 CSRF。
- C 正确。把令牌放进 URL 查询参数，可能被浏览器历史记录、服务器日志、代理日志、监控系统以及 `Referer` 头间接暴露，因此通常不推荐。
- D 错误。DOM 属性同样可以被页面脚本读取，只要前端代码能访问对应节点，就不能把它视为安全隔离区。

#### 延伸说明

前端保存敏感凭证时，常见权衡是：

- 如果重点防止 JS 直接读取，可优先考虑 `HttpOnly Cookie`
- 如果使用 Cookie，则要同步考虑 CSRF 防护
- 如果使用前端可读存储，例如 `localStorage`，就必须更重视 XSS 防护

因此不存在“绝对安全的前端存储位置”，关键在于明确威胁模型并做配套防护。

### 第 16 题 [编程题]

#### 题目

实现一个简化版响应式系统，用来监听对象/数组的数据变化，并在数据变化后自动更新页面上的购物车展示。

页面已经提供两个商品按钮：

- 添加商品 1
- 添加商品 2

点击按钮会修改购物车数据：

- 同一商品重复添加只增加数量
- 购物车列表需要自动刷新到 DOM

本题要求在指定文件中补全两个函数：

- `createProxy(target, handler, basePath)`
- `observe(data, handler)`

#### 功能要求

1. `createProxy(target, handler, basePath)`

- 返回 `target` 的 `Proxy`
- 若 `target` 不是对象或数组，则直接返回原值
- 至少要拦截以下操作：
  - 属性赋值：`proxy[key] = value`
  - 属性删除：`delete proxy[key]`
- 发生拦截后必须：
  - 真实写回原对象 `target`
  - 调用 `handler(change)`

其中 `change` 至少应包含：

```javascript
{
  type: 'set' | 'delete',
  target: <原始对象>,
  key: <当前修改的 key>,
  oldValue: <修改前的值>,
  newValue: <修改后的值>,
  path: <完整路径>
}
```

`path` 拼接规则：

- 若 `basePath` 为空：`String(key)`
- 若 `basePath` 非空：`basePath + '.' + String(key)`

2. `observe(data, handler)`

- 返回一个深度代理后的 `data`
- 对对象/数组任意层级嵌套都能监听
- 任意更深层属性发生 `set/delete` 时，都必须触发监听
- 必须支持循环引用，避免死循环，建议使用 `WeakMap`
- 触发回调时必须使用 microtask 批处理
- `handler` 入参为 `changeList` 数组
- 同一事件循环内的多次变化，只允许触发一次 `handler`
- `changeList` 需要按照变更发生顺序收集多个 `change`
- `change.path` 必须是完整路径，例如：
  - `proxyArr[0].prop1 = 'x'` 时，path 为 `"0.prop1"`
  - `proxy[0].a.b = 1` 时，path 为 `"0.a.b"`

3. 购物车 UI 联动

- 点击 `#btn1` / `#btn2` 后，购物车列表会自动更新
- 同一商品重复点击只增加数量，不新增行
- 每个商品渲染一行，class 必须为 `.cart-item`
- 每行文本格式必须严格为：

```text
商品 1： 3 件
```

注意：

- 使用全角冒号 `：`
- 冒号后有 1 个空格
- 数字后有 1 个空格
- 最后是“件”

#### 严禁修改

以下内容不能修改，否则自动化测试可能失败：

- 按钮 id：`#btn1`、`#btn2`
- 购物车容器 id：`#cart`
- 购物车条目 class：`.cart-item`
- 入口文件名：`/index.html`、`/solution.html`
- 函数签名与函数名：`createProxy(target, handler, basePath)`、`observe(data, handler)`

#### 参考实现思路

整体思路分为两层：

1. `createProxy`

- 只负责单层代理能力
- 通过 `Proxy` 拦截 `get`、`set`、`deleteProperty`
- `set` / `deleteProperty` 里生成标准化 `change`

2. `observe`

- 负责把“单层代理”扩展成“深度监听系统”
- 通过 `WeakMap` 记录已代理对象，避免循环引用导致无限递归
- 通过 `changeList + Promise.resolve().then(...)` 把同一 tick 内的多个变更合并成一次回调

#### 关键代码解析

1. `createProxy` 的路径拼接

```javascript
function joinPath(key) {
  return basePath ? `${basePath}.${String(key)}` : String(key);
}
```

这段逻辑保证了：

- 根层属性如 `count` 的路径是 `"count"`
- 数组第 0 项的 `name` 路径可以是 `"0.name"`
- 更深层嵌套如 `"0.a.b"` 也能自然串联出来

2. `get` 中的延迟深度代理

```javascript
get(currentTarget, key, receiver) {
  const value = Reflect.get(currentTarget, key, receiver);
  if (typeof handler.__getChildProxy === 'function') {
    return handler.__getChildProxy(value, joinPath(key));
  }
  return value;
}
```

这里的核心思想是“按需代理”：

- 不是一开始就递归扫描整个对象树
- 而是在真正访问子对象时，再继续包裹成新的代理

这样实现更轻量，也更适合带循环引用的数据结构。

3. `set` / `deleteProperty` 的标准变更通知

```javascript
handler({
  type: "set",
  target: currentTarget,
  key,
  oldValue,
  newValue: value,
  path,
});
```

这一层的职责是统一上报“发生了什么变化”。

外层 `observe` 并不关心某次变化来自数组索引、普通属性还是深层对象，它只负责把这些变更收集成批。

4. microtask 批处理

```javascript
function scheduleFlush() {
  if (scheduled) return;
  scheduled = true;
  Promise.resolve().then(flushChanges);
}
```

它的意义是：

- 如果同一事件循环里连续发生多次数据变化
- 不要立刻重复调用多次 `handler`
- 而是先把所有变更压入 `changeList`
- 再在 microtask 阶段统一触发一次

这能减少重复渲染，也更符合题目要求。

5. `WeakMap` 解决循环引用与重复代理

```javascript
const proxyCache = new WeakMap();
```

这里用 `WeakMap` 的原因有两个：

- 避免同一个对象反复创建代理
- 支持循环引用结构，避免递归过程中无限套娃

#### 为什么当前实现可满足题目

- `createProxy` 已能正确返回代理对象
- `set/delete` 会真实写入原始对象
- 变更会带上 `type`、`target`、`key`、`oldValue`、`newValue`、`path`
- `observe` 支持对象和数组的深层监听
- `observe` 使用 microtask 合并同一 tick 内的多次修改
- 点击按钮后，购物车 DOM 会自动更新
- 相同商品重复点击只增加数量，不重复新增条目
- `.cart-item` 文案格式已修正为断言要求的精确形式

#### 复杂度分析

- 单次 `set` / `delete` 代理拦截：平均可视为 `O(1)`
- 路径拼接：与路径深度相关，可视为 `O(d)`
- microtask 批量回调：一次 flush 处理 `k` 个变更，复杂度为 `O(k)`
- 购物车渲染：与购物车商品种类数 `n` 成正比，为 `O(n)`

#### 文件位置

- 实现代码：[1.html](./1.html)

### 第 17 题 [编程题]

#### 题目

小苯面前有 `n` 个纯白色数字，其中第 `i` 个数字的值为 `a_i`。

小苯拿到了 `m` 个区间 `[l_j, r_j]`，每个区间都用来描述一个涂色操作，将 `[l_j, r_j]` 这段区间中的所有数字都涂成红色。小苯可以任意选择其中一些操作执行，当然也可以一个都不执行，也可以全部执行。

小苯只能通过上述方式涂红数字，不能随意涂色。最终小苯的得分是所有红色数字的和。

现在小苯想知道，如果限制所选区间两两不相交，他的得分最高能有多少。

#### 输入描述

每个测试文件均包含多组测试数据。

第一行输入一个整数 `T`，表示数据组数。

对于每组测试数据：

- 第一行输入两个正整数 `n, m`，表示数字个数和可选操作个数
- 第二行输入 `n` 个整数 `a_i`，表示每个数字的值
- 接下来 `m` 行，每行输入两个正整数 `l_j, r_j`，描述一个操作区间

额外保证：

- `1 <= T <= 10^5`
- `1 <= n, m <= 3 * 10^5`
- `-10^9 <= a_i <= 10^9`
- `1 <= l_j <= r_j <= n`
- 单个测试文件中，所有测试数据的 `n` 之和不超过 `3 * 10^5`
- 单个测试文件中，所有测试数据的 `m` 之和不超过 `3 * 10^5`

#### 输出描述

对于每组测试数据，在单独的一行输出一个整数，表示小苯的最大得分。

#### 核心结论

把每个区间 `[l, r]` 看成一个“带权区间”：

- 区间权重 = `sum(a[l..r])`
- 目标 = 选择若干两两不相交区间，使总权重最大

这就是标准的“带权区间调度”问题。

#### 解题思路

1. 前缀和预处理区间权重

设：

```text
prefix[i] = a[1] + a[2] + ... + a[i]
```

那么任意区间 `[l, r]` 的权重都可以在 `O(1)` 时间求出：

```text
weight(l, r) = prefix[r] - prefix[l - 1]
```

2. 将所有区间按右端点排序

把每个区间记为：

```text
(r, l, weight)
```

按 `r` 从小到大排序后，问题就变成：

- 枚举“最后一个选的区间”
- 找到它前面最后一个与它不相交的区间

3. 动态规划

设 `dp[i]` 表示“排好序后的前 `i` 个区间里，最多能取得的最大总得分”。

对于第 `i` 个区间，只有两种选择：

- 不选它：`dp[i - 1]`
- 选它：`dp[prev] + weight`

其中 `prev` 表示最后一个满足“右端点 < 当前区间左端点”的区间数量。

转移方程：

```text
dp[i] = max(dp[i - 1], dp[prev] + weight)
```

4. 二分查找前驱区间

因为区间已经按右端点排序，所以可以把所有右端点单独提出来形成数组 `ends`。

对当前区间左端点 `l`，我们希望找到：

```text
最后一个 end < l 的位置
```

等价于：

```text
prev = lower_bound(ends, l)
```

这里 `prev` 恰好就是可以安全接在当前区间前面的区间数量。

#### 为什么现有 `2.py` 是正确的

[2.py](./2.py) 的实现正是上述做法：

- 用前缀和计算每个区间的权重
- 按右端点排序
- 用 `bisect_left` 找前驱
- 用一维 `dp` 做带权区间调度

对应关键逻辑如下：

```python
weight = prefix[right] - prefix[left - 1]
intervals.append((right, left, weight))
intervals.sort()
prev = bisect.bisect_left(ends, left)
dp[i] = max(dp[i - 1], dp[prev] + weight)
```

#### 四语言实现

- Python：[2.py](./2.py)
- Go 求解函数：[2.go](./2.go)
- Go 测试入口：[2_test.go](./2_test.go)
- C++：[2.cc](./2.cc)
- TypeScript：[2.ts](./2.ts)

#### 各语言实现说明

1. Python

- 使用 `sys.stdin.buffer.read()` 一次性读入，适合大输入
- 使用 `bisect_left` 做前驱查找
- `int` 自动大整数，无需担心区间和溢出

2. Go

- 由于同目录同包下还存在其他 Go 题解文件，这里改为导出 `Solve2(input string) string`
- 通过 [2_test.go](./2_test.go) 提供可运行的单元测试入口，避免同包出现多个 `main`
- 区间和与 `dp` 使用 `int64`
- 使用 `sort.SearchInts` 找到前驱位置

3. C++

- 使用 `ios::sync_with_stdio(false)` 和 `cin.tie(nullptr)` 加速输入
- 区间和与 `dp` 使用 `long long`
- 使用 `lower_bound` 找到前驱位置

4. TypeScript

- 使用 Node.js 标准输入读取
- 由于本题数值范围最高约为 `3 * 10^14`，仍在 JavaScript `Number` 的安全整数范围内
- 自己实现 `lowerBound` 完成二分

#### 复杂度分析

对每组测试数据：

- 前缀和预处理：`O(n)`
- 计算全部区间权重：`O(m)`
- 区间排序：`O(m log m)`
- 动态规划 + 每次二分：`O(m log m)`

总复杂度：

```text
O(n + m log m)
```

空间复杂度：

```text
O(n + m)
```

#### 关键细节

- 区间两两不相交，意味着前一个区间的右端点必须严格小于后一个区间的左端点
- 因此二分时用的是 `lower_bound(ends, left)`，也就是统计所有 `end < left` 的区间个数
- `a_i` 允许为负数，所以答案可能为 `0`，对应“不选任何区间”

#### 文件位置

- Python 实现：[2.py](./2.py)
- Go 求解函数：[2.go](./2.go)
- Go 测试入口：[2_test.go](./2_test.go)
- C++ 实现：[2.cc](./2.cc)
- TypeScript 实现：[2.ts](./2.ts)

### 第 18 题 [编程题]

#### 题目

给定一个长度为 `n` 的数字序列。每次如果存在一对相邻且相等的数字，就可以将这一对数字同时消除，剩余部分重新拼接后继续进行，直到无法继续消除为止。

现在允许你在原序列中的任意位置额外插入一个数字，插入的数字数值也可以自行选择。你需要让最终能够消除的对数尽量多，输出最多能消除多少对数字。

根据现有代码与题图信息，可以确定：

- 输入包含多组测试数据
- 每组先给出 `n`，再给出长度为 `n` 的整数序列
- 输出每组数据的最大可消除对数

#### 核心结论

这题可以拆成两段来思考：

1. 先把原序列中“无论是否插入新数字都一定会发生”的相邻消除全部做完
2. 对剩下无法继续消除的序列，考虑插入一个数字以后，最多还能额外触发多少次连锁消除

第一段可以用栈线性完成，第二段本质上是在剩余序列里寻找最长的奇数长度回文结构。

#### 为什么可以先做贪心消除

从左到右扫描原数组，用栈维护当前还没有被消掉的数字：

- 若当前数字和栈顶相等，就说明形成了一对相邻相等数字，可以立即消掉
- 否则把当前数字压栈

这个过程结束后：

- `base` 表示原序列自身已经能够消除的对数
- `stack` 表示所有必然消除完成后剩下的“稳定序列”

这里的栈化简结果可以理解为该消除规则下的唯一稳定形态，因此先把“原本一定会发生的消除”全部做完，并不会影响“额外插入一个数字后还能继续触发多少次消除”的最优答案。

稳定序列有一个重要性质：

- 相邻元素一定不相等

所以后续如果还想继续消除，唯一办法就是通过插入一个数字，去连接两边本来被隔开的相同数字，从而触发一条向外扩展的连锁反应。

#### 插入一次后，额外收益来自奇回文半径

假设稳定序列中存在一段：

```text
a b c b a
```

如果在中间位置插入一个 `c`，就会先变成：

```text
a b c c b a
```

先消掉中间这一对 `c c` 之后，左右两侧又变成相邻且相等的 `b b`，继续消除；再往外还有 `a a`，于是可以连续消掉 3 对。

这说明：

- 只要稳定序列以某个位置为中心，左右两边对称相等
- 在中心插入一个与中心值相同的数字
- 就能把这一整段奇数长度回文全部转化成连续消除

因此答案就是：

```text
最终答案 = base + best
```

其中：

- `base` 是原序列本来就能消掉的对数
- `best` 是稳定序列中最大的 `d1[i]`

要特别注意，这里的 `d1[i]` 不是“去掉中心后的扩展层数”，而是“包含中心本身的奇回文半径”：

- `d1[i] = 1` 表示只取中心一个数，此时仍然可以在它旁边插入同值数字，额外消掉 `1` 对
- `d1[i] = 2` 表示形如 `a b a`，插入一个 `b` 后可额外消掉 `2` 对
- `d1[i] = 3` 表示形如 `a b c b a`，插入一个 `c` 后可额外消掉 `3` 对

所以 `best` 可以直接作为“插入一次后最多还能额外消除多少对数字”，最终答案直接写成 `base + best` 即可，不需要再做 `-1` 或其他换算。

#### 解题思路

1. 用栈消掉原序列中所有必然发生的相邻相等对，得到 `base` 和剩余序列 `stack`
2. 如果 `stack` 为空，说明原序列已经能全部消完，答案就是 `base`
3. 否则在 `stack` 上计算每个位置作为中心时的最长奇回文半径
4. 设最大半径为 `best`，则答案为 `base + best`

这里使用的是 Manacher 的奇回文版本，能在线性时间内求出所有中心的最大扩展半径。

#### 关键转移

设 `d1[i]` 表示以 `i` 为中心的最长奇回文半径，包含中心自己，最小值为 `1`。

例如：

```text
stack = [1, 2, 3, 2, 1]
```

则中间位置 `3` 的 `d1[i] = 3`，表示可以贡献 3 对消除：

- 插入一个 `3`
- 触发 `3 3`
- 再触发 `2 2`
- 再触发 `1 1`

Manacher 的扩展逻辑为：

```text
如果 i 在当前最右回文覆盖范围外，直接从 1 开始扩展
否则先利用对称位置的结果做下界，再继续尝试扩展
```

最终取所有 `d1[i]` 的最大值即可。

#### 复杂度分析

对每组测试数据：

- 栈消除：`O(n)`
- 奇回文半径计算：`O(n)`

总时间复杂度：

```text
O(n)
```

空间复杂度：

```text
O(n)
```

#### 四语言实现

- Python：[3.py](./3.py)
- Go 求解函数：[3.go](./3.go)
- Go 测试入口：[3_test.go](./3_test.go)
- C++：[3.cc](./3.cc)
- TypeScript：[3.ts](./3.ts)

#### 各语言实现说明

1. Python

- 使用列表模拟栈完成第一阶段消除
- 使用奇回文半径数组 `d1` 完成线性扩展
- 直接按照标准输入输出格式提交

2. Go

- 导出 `Solve3(input string) string` 作为核心求解函数
- 在 [3_test.go](./3_test.go) 中给出测试样例与命令，避免同目录下多个 `main`
- 用切片模拟栈，用整数数组实现 Manacher

3. C++

- 用 `vector<int>` 维护稳定序列
- 用一趟线性扫描计算奇回文半径
- 保留标准 `main`，可直接按 OJ 方式提交

4. TypeScript

- 使用 `number[]` 模拟栈与半径数组
- 按 Node.js 标准输入读取
- 保持与其他语言一致的线性算法

#### 文件位置

- Python 实现：[3.py](./3.py)
- Go 求解函数：[3.go](./3.go)
- Go 测试入口：[3_test.go](./3_test.go)
- C++ 实现：[3.cc](./3.cc)
- TypeScript 实现：[3.ts](./3.ts)
