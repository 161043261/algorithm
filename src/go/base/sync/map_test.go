package sync_test

import (
	"strconv"
	"sync"
	"testing"
)

var m = make(map[string]int)
var m2 = map[string]int{}
var m_ptr = &map[string]int{}

var syncM sync.Map
var syncM2 = sync.Map{}
var syncM_ptr = &sync.Map{}

// ! fatal error: concurrent map writes
func BenchmarkM(b *testing.B) {
	wg := sync.WaitGroup{}
	for i := range 1000 {
		wg.Add(1)

		go func(i int) {
			defer wg.Done()
			key := strconv.Itoa(i)
			// m[key] = val
			// m2[key] = val
			(*m_ptr)[key] = i
		}(i)
	}
	wg.Wait()
}

func BenchmarkSyncM(b *testing.B) {
	var wg sync.WaitGroup
	for i := range 1000 {
		wg.Add(1)

		go func(i int) {
			defer wg.Done()
			key := strconv.Itoa(i)
			// syncM.Store(key, i)
			// syncM2.Store(key, i)
			syncM_ptr.Store(key, i)
			// val, _ := syncM.Load(key)
			// val, _ := syncM2.Load(key)
			val, _ := syncM_ptr.Load(key)
			if val != i {
				b.Errorf("Expect %d, get %v", i, val)
			}
		}(i)
	}
	wg.Wait()
}
