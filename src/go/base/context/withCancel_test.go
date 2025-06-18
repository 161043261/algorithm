package context_test

import (
	"context"
	"fmt"
	"testing"
)

func TestWithCancel(t *testing.T) {

	gen := func(ctx context.Context) <-chan int {
		interCoroutineCommunicationChan := make(chan int)
		item := 1
		go func() {
			for {
				select {
				case <-ctx.Done():
					return
				case interCoroutineCommunicationChan <- item:
					item++
				}
			}
		}()
		return interCoroutineCommunicationChan
	}

	ctx, cancel := context.WithCancel(context.Background())
	for item := range gen(ctx) {
		fmt.Println(item)
		if item == 5 {
			break
		}
	}
	cancel()
}
