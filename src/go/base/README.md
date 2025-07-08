# Go base

## format

```bash
gofmt -w .
```

## 基础

### init 函数和 main 函数

- 一个包可以有多个 init 函数
- 一个文件也可以有多个 init 函数
- main 函数只能放在 main 包中
- 一个 main 包只能有一个 main 函数, 除非使用 build tag

### 下划线

```go
// 不直接使用 effect 包, 仅执行 effect 包中的 init 函数
import _ "github.com/tianchenghang/effect"
```

### iota

```go
const (
	m1 = iota // 0
	m2        // 1
	_         // 跳过
	m4        // 3
)

const (
	n1 = iota // 0
	n2 = 100  // 100
	n3 = iota // 2
	n4        // 3
)

const (
	_  = iota
	KB = 1 << (10 * iota) // 1024
	MB
)

const (
	a, b = iota + 1, iota + 2 // 1       2
	_, d                      // 2(跳过) 3
	e, _                      // 3       4(跳过)
)
```

## 方法集

- 接收者是值类型: 调用接收者是值类型的方法时, 会复制调用者
- 接收者是指针类型: 当调用者「不可寻址时」, 无法调用接收者是指针类型的方法

## chan & go

- [runtime](./runtime/runtime_test.go)
- [chan](./chan/README.md)
- sync
  - [sync.Mutex](./sync/mutex_test.go)
  - [sync.RWMutex](./sync/rwMutex_test.go)
  - sync.WaitGroup: `wg.Add(1)` `defer wg.Done()` `wg.Wait()`
  - sync.Once
  - [sync.Map](./sync/map_test.go)
  - [sync.Pool](./sync/gopool/README.md)
- [atomic](./atomic/atomic_test.go)
  - `LoadT` 存
  - `StoreT` 取
  - `AddT` 加
  - `SwapT` 交换
  - `CompareAndSwapT` 比较并交换

## context

```go
type Context interface {
  // Deadline() 返回工作的截止时间
  Deadline() (deadline time.Time, ok bool)
  // Done() 返回一个 done 通道, 工作完成、截止或取消后, done 通道关闭
  // 读未关闭的、空的无缓冲 chan: 阻塞
  // 读关闭的、空的无缓冲 chan: 返回零值和 false
  Done() <-chan struct{}
  // Err() 返回错误
  // 超时: context deadline exceeded
  // 取消: context canceled
  Err() error
  // Value() 返回键对应的值
  Value(key any) any
}
```

### context.Background()

创建一个根 context

### context.WithCancel()

创建一个可取消的 context

```go
ctx, cancel := context.WithCancel(context.Background())
defer cancel()
```

### context.WithDeadline(),

创建一个有截止时间, 可取消的 context

```go
deadline := time.Now().Add(3* time.Second)
ctx, cancel := context.WithDeadline(context.Background(), deadline)
defer cancel()
```

### context.WithValue()

创建一个有 kvs 的, 可取消的 context

```go
ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
ctx = context.WithValue(ctx, Key("k1") /* key */, "v1" /* value */)
ctx = context.WithValue(ctx, Key("k2") /* key */, "v2" /* value */)
```

## reflect
