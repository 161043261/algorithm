package atomic_test

import (
	"fmt"
	"sync"
	"sync/atomic"
	"testing"
)

var (
	cnt int64
	mut sync.Mutex
	wg  sync.WaitGroup
)

func add() {
	defer wg.Done()
	cnt++
}

func add2() {
	defer func() {
		mut.Unlock()
		wg.Done()
	}()

	mut.Lock()
	cnt++
}

func add3() {
	atomic.AddInt64(&cnt, 1)
	wg.Done()
}

func BenchmarkAdd(b *testing.B) {
	cnt = 0
	for range 500_000 {
		wg.Add(1)
		go add()
	}
	wg.Wait()
	fmt.Println("cnt", cnt)
}

func BenchmarkMutexAdd(b *testing.B) {
	cnt = 0
	for range 500_000 {
		wg.Add(1)
		go add2()
	}
	wg.Wait()
	fmt.Println("cnt", cnt)
}

func BenchmarkAtomicAdd(b *testing.B) {
	for range 500_000 {
		wg.Add(1)
		go add3()
	}
	wg.Wait()
	fmt.Println("cnt", cnt)
}
