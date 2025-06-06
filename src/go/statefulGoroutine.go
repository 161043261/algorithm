//go:build statefulGoroutine

package main

import (
	"fmt"
	"math/rand"
	"sync/atomic"
	"time"
)

type readReq struct {
	key     int
	resChan chan int
}

type writeReq struct {
	key     int
	val     int
	resChan chan bool
}

func main() {
	readReqChan := make(chan readReq)
	writeReqChan := make(chan writeReq)

	go func() {
		state := make(map[int]int)
		for {
			select {
			case readReq := <-readReqChan:
				readReq.resChan <- state[readReq.key]
			case writeReq := <-writeReqChan:
				state[writeReq.key] = writeReq.val
				writeReq.resChan <- true
			}
		}
	}()

	var readNum uint64
	writeNum := uint64(0)

	for range 100 {
		go func() {
			for {
				r := readReq{
					key:     rand.Intn(5),
					resChan: make(chan int),
				}
				readReqChan <- r
				<-r.resChan
				atomic.AddUint64(&readNum, 1)
				time.Sleep(time.Millisecond)
			}
		}()
	}

	for range 10 {
		go func() {
			for {
				w := writeReq{
					key:     rand.Intn(5),
					val:     rand.Intn(100),
					resChan: make(chan bool),
				}
				writeReqChan <- w
				<-w.resChan
				atomic.AddUint64(&writeNum, 1)
				time.Sleep(time.Millisecond)
			}
		}()
	}
	time.Sleep(time.Second)

	readNumFinal := atomic.LoadUint64(&readNum)
	fmt.Println("readNumFinal:", readNumFinal)
  writeNumFinal := atomic.LoadUint64(&writeNum)
  fmt.Println("writeNumFinal:", writeNumFinal)
}
