package runtime_test

import (
	"fmt"
	"runtime"
	"sync"
	"testing"
)

// ! runtime.Gosched() 让出 CPU 时间片
func TestGosched(t *testing.T) {
	go func(s string) {
		for i := 0; i < 100; i++ {
			fmt.Println(s, i)
		}
	}("Coroutine")

	for i := 0; i < 100; i++ {
		runtime.Gosched() // 让出 CPU 时间片
		fmt.Println("Main", i)
	}
}

// ! runtime.Goexit() 退出当前协程
func TestGoexit(t *testing.T) {
	var wg sync.WaitGroup
	wg.Add(1)

	go func() {
		defer wg.Done()

		defer fmt.Println("Defer 1")
		func() {
			defer fmt.Println("Defer 2")
			runtime.Goexit() // 退出当前协程
			fmt.Println("3")
		}()
		fmt.Println("4")
		wg.Done()
	}()

	wg.Wait()
	// Defer 2
	// Defer 1
}

func fib(n int, wg *sync.WaitGroup) int64 {
	defer wg.Done()
	curr, next := int64(0), int64(1)
	for range n {
		curr, next = next, curr+next
	}
	return curr
}

// ! runtime.GOMAXPROCS() 指定使用的最大 CPU 核心数
// ! goroutine 和操作系统线程的关系是 m:n
func BenchmarkGOMAXPROCS(b *testing.B) {
	runtime.GOMAXPROCS(4) // 指定使用的最大 CPU 核心数
	var wg sync.WaitGroup
	wg.Add(528)
	for range 528 {
		go fib(528, &wg)
	}
	wg.Wait()
}
