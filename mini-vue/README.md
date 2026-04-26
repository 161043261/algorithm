```bash
brew install libuv pkg-config
sudo apt install libuv1-dev

pkg-config --modversion libuv
pkg-config --cflags --libs libuv
```

## 3.7 支持的语法

这一节只讨论当前 `mini-vue` 已经真正实现的模板语法，以及这些语法在运行时中的执行方式。

### 3.7.1 文本插值 `{{ ... }}`

文本插值由 `compileText()` 处理。

它的策略是：

- 把原始文本节点内容保存为一个模板字符串
- 用正则 `/\{\{([\s\S]+?)\}\}/` 找出插值表达式
- 为这个文本节点注册一个 binding
- 每次 `flushBindings()` 时重新执行这个 binding
- binding 内部会再次对模板做 `replace(...)`
- 每个插值都会调用 `this.evaluate(expr.trim())`
- 最终把最新结果写回 `node.textContent`

可以把这个过程理解成：

```ts
node.textContent = template.replace(/\{\{([\s\S]+?)\}\}/g, (_match, expr) =>
  this.toDisplayString(this.evaluate(expr.trim())),
);
```

因此，文本插值不是只计算一次，而是在每次 flush 时都会重新求值。

### 3.7.2 `v-if`

`v-if` 由 `bindIf()` 处理。

它采用的是“注释锚点 + 插入/移除真实节点”的方案：

- 先在目标节点前插入一个注释节点：`<!-- v-if:expr -->`
- 注册一个 binding
- 每次 flush 时重新计算 `expr`
- 如果结果为 `true`
  - 确保真实节点存在于锚点后面
- 如果结果为 `false`
  - 把真实节点从 DOM 中移除

这个实现的特点是：

- 不会克隆节点
- 不会重新编译模板
- 只是控制现有真实节点是否挂在 DOM 树上

所以它更接近“显示/移除节点”，而不是“切换字符串模板”。

### 3.7.3 `v-html`

`v-html` 由 `bindHTML()` 处理。

它的逻辑很直接：

- 注册一个 binding
- 每次 flush 时重新计算表达式
- 把结果直接写入 `node.innerHTML`

核心行为相当于：

```ts
const value = this.evaluate(expr);
node.innerHTML = value === null || value === undefined ? "" : String(value);
```

当前业务层用它做了两件事：

- 渲染购物车列表
- 渲染批量变更日志

也就是说，购物车区和日志区的 HTML 结构不是命令式逐个节点拼出来的，而是由业务计算属性先产出 HTML 字符串，再交给 `v-html` 写入。

这很方便，但也有一个明显前提：

- 传给 `v-html` 的内容必须是可信的

否则就会引入 HTML 注入风险。

### 3.7.4 事件 `@click` / `v-on:click`

事件由 `bindEvent()` 处理。

编译阶段会先把事件绑定到真实 DOM 上，但真正点击发生时，运行时执行的是下面这套逻辑：

1. 先拿到模板里写的表达式 `expr`
2. 先尝试把它当成方法名直接查 `this.$methods[expr]`
3. 如果确实存在同名方法
   - 直接用 `directMethod.call(this.proxy, event)` 调用
4. 否则退回到表达式求值模式
   - `this.evaluate(expr, { $event: event })`

这意味着下面两种写法都支持：

```html
@click="addFirst" @click="addToCart(1)"
```

前者会走“方法名直连”，后者会走“表达式求值”。

额外传入的 `$event` 可以让表达式里访问原生事件对象。

### 3.7.5 `v-bind`

当前实现支持的是简写形式 `:attr`，例如：

```html
:src="avatarUrl" :alt="title"
```

它由 `bindAttr()` 处理。

处理逻辑是：

- 注册一个 binding
- 每次 flush 时重新计算表达式
- 如果值是 `false`、`null`、`undefined`
  - 删除这个属性
- 否则
  - 调用 `node.setAttribute(attrKey, String(value))`

也就是说，它现在实现的是一个通用的“动态属性绑定”能力，而不是针对某几个属性做特殊处理。

当前模板里最典型的使用场景就是图片区域：

- `:src="avatarUrl"`
- `:alt="title"`

### 3.7.6 一个统一视角

从运行时角度看，这些语法虽然表现不同，但底层模型其实很统一：

- 编译阶段
  - 识别节点和属性上的语法
  - 为它们注册对应 binding 或事件监听
- 运行阶段
  - 状态变更进入批处理队列
  - `flushBindings()` 统一执行所有 binding
  - 每个 binding 再通过 `evaluate()` 读取最新状态

可以把它概括为：

```text
模板语法
  -> compileText / compileElement
  -> bindXXX
  -> binding 列表
  -> flushBindings()
  -> evaluate()
  -> 更新真实 DOM
```

这也是当前 `mini-vue` 最核心的运行模型。
