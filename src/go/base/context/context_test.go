package context_test

import (
	"context"
	"fmt"
	"sync/atomic"
	"testing"
	"time"
)

func TestContext(t *testing.T) {

	worker := func(ctx context.Context) {
	tag:
		for {
			fmt.Println("[worker] Working...")
			time.Sleep(time.Second)

			select {
			case <-ctx.Done():
				break tag
			default:
			}
		}
	}

	ctx, cancel := context.WithCancel(context.Background())
	go worker(ctx)

	time.Sleep(5 * time.Second)
	cancel() // <-ctx.Done()

	fmt.Println("[main] End")
}

func TestContext2(t *testing.T) {

	var worker func(ctx context.Context)
	var cnt int32

	worker = func(ctx context.Context) {

		if atomic.LoadInt32(&cnt) < 3 {
			atomic.AddInt32(&cnt, 1)
			go worker(ctx)
		}
		i := atomic.LoadInt32(&cnt)

	tag:
		for {
			fmt.Printf("[worker-%v] Working\n", i)
			time.Sleep(time.Second)

			select {
			case <-ctx.Done():
				break tag
			default:
			}
		}
	}

	ctx, cancel := context.WithCancel(context.Background())
	go worker(ctx)
	time.Sleep(5 * time.Second)
	cancel()
	fmt.Println("[main] End")
}
