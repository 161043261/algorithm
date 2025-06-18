package sync_test

import (
	"sync"
	"testing"
	"time"
)

var (
	cnt   int64
	wg    sync.WaitGroup
	mut   sync.Mutex
	rwMut sync.RWMutex
)

func write() {
	defer func() {
		mut.Unlock()
		wg.Done()
	}()

	mut.Lock() // 加互斥锁
	cnt++
	time.Sleep(10 * time.Millisecond)
}

func write2() {
	defer func() {
		rwMut.Unlock()
		wg.Done()
	}()

	rwMut.Lock() // 加排他写锁
	cnt++
	<-time.After(10 * time.Millisecond)
	// 等价于 time.Sleep(10 * time.Millisecond)
}

func read() {
	defer func() {
		mut.Unlock()
		wg.Done()
	}()

	mut.Lock() // 加互斥锁
	time.Sleep(time.Millisecond)
}

func read2() {
	defer func() {
		rwMut.RUnlock()
		wg.Done()
	}()

	rwMut.RLock() // 加共享读锁
	<-time.After(time.Millisecond)
	// 等价于 time.Sleep(time.Millisecond)
}

func BenchmarkMutex(b *testing.B) {
	for range 100 {
		wg.Add(1)
		go write()
	}

	for range 100_000 {
		wg.Add(1)
		go read()
	}
	wg.Wait()
}

func BenchmarkRWMutex(b *testing.B) {
	for range 100 {
		wg.Add(1)
		go write2()
	}

	for range 100_000 {
		wg.Add(1)
		go read2()
	}
	wg.Wait()
}
