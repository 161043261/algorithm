package sync_test

import (
	"fmt"
	"sync"
	"testing"
)

var x int64

func add(cntWrap struct{ cnt int64 }, wg *sync.WaitGroup) {
	defer wg.Done()
	for range 500_000 {
		cntWrap.cnt++
	}
}

func add2(cntWrapPtr *struct{ cnt int64 }, wg *sync.WaitGroup) {
	defer wg.Done()
	for range 500_000 {
		cntWrapPtr.cnt++
	}
}

func add3(cntWrapPtr *struct{ cnt int64 }, wg *sync.WaitGroup, mut *sync.Mutex) {
	defer func() {
		mut.Unlock()
		wg.Done()
	}()

	mut.Lock()
	for range 500_000 {
		cntWrapPtr.cnt++
	}
}

func TestMutex(t *testing.T) {
	var cntWrap = struct {
		cnt int64
	}{cnt: 0}

	var wg sync.WaitGroup

	wg.Add(2)
	go add(cntWrap, &wg) // cntWrap 是值拷贝
	go add(cntWrap, &wg) // cntWrap 是值拷贝
	wg.Wait()

	fmt.Println("cntWrap.cnt:", cntWrap.cnt)
}

func TestMutex2(t *testing.T) {
	var cntWrapPtr = &struct {
		cnt int64
	}{cnt: 0}

	var wg sync.WaitGroup

	wg.Add(2)
	go add2(cntWrapPtr, &wg)
	go add2(cntWrapPtr, &wg)
	wg.Wait()

	fmt.Println("cntWrapPtr.cnt", cntWrapPtr.cnt) // 有并发冲突
}

func TestMutex3(t *testing.T) {
	var cntWrapPtr = &struct {
		cnt int64
	}{cnt: 0}

	// var wgPtr *sync.WaitGroup 未分配内存
	// var mutPtr *sync.Mutex 未分配内存

	wgPtr := &sync.WaitGroup{} // 分配内存
	mutPtr := &sync.Mutex{}    // 分配内存

	// var wg sync.WaitGroup // 分配内存
	// var mut sync.Mutex // 分配内存

	wgPtr.Add(2)
	go add3(cntWrapPtr, wgPtr, mutPtr) // cntWrap 是值拷贝
	go add3(cntWrapPtr, wgPtr, mutPtr) // cntWrap 是值拷贝
	wgPtr.Wait()

	fmt.Println("cntWrapPtr.cnt", cntWrapPtr.cnt) // 无并发冲突
}
