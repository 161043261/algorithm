//go:build goroutine2

package main

import (
	"fmt"
	"math/rand"
	"sync/atomic"
	"time"
)

type readOperation struct {
	key     int
	valChan chan int
}
type writeOperation struct {
	key    int
	val    int
	okChan chan bool
}

func main() {

	var readCount uint32
	var writeCount uint32

	readOperationChan := make(chan readOperation)
	writeOperationChan := make(chan writeOperation)

	go func() {
		var kvs = make(map[int]int)
		for {
			select {
			case r := <-readOperationChan:
				r.valChan <- kvs[r.key]
			case w := <-writeOperationChan:
				kvs[w.key] = w.val
				w.okChan <- true
			}
		}
	}()

	for range 100 {
		go func() {
			for {
				r := readOperation{
					key:     rand.Intn(5),
					valChan: make(chan int),
				}
				readOperationChan <- r
				<-r.valChan
				atomic.AddUint32(&readCount, 1)
				time.Sleep(time.Millisecond)
			}
		}()
	}

	for range 10 {
		go func() {
			for {
				w := writeOperation{
					key:    rand.Intn(5),
					val:    rand.Intn(100),
					okChan: make(chan bool),
				}
				writeOperationChan <- w
				<-w.okChan
				atomic.AddUint32(&writeCount, 1)
				time.Sleep(time.Millisecond)
			}
		}()
	}

	time.Sleep(time.Second)

	readFinalCount := atomic.LoadUint32(&readCount)
	fmt.Println("read final count", readFinalCount)
	writeFinalCount := atomic.LoadUint32(&writeCount)
	fmt.Println("write final count", writeFinalCount)
}
