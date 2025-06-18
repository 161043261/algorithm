package context_test

import (
	"context"
	"fmt"
	"testing"
	"time"
)

func BenchmarkContext3(b *testing.B) {
	deadline := time.Now().Add(3 * time.Second)
	ctx, cancel := context.WithDeadline(context.Background(), deadline)
	defer cancel()

	select {
	case <-time.After(5 * time.Second):
		fmt.Println("Overslept")
	case <-ctx.Done():
		fmt.Println(ctx.Err()) // context deadline exceeded
	}

	// cancel()
}

func BenchmarkContext4(b *testing.B) {
	deadline := time.Now().Add(3 * time.Second)
	ctx, cancel := context.WithDeadline(context.Background(), deadline)
	defer cancel()

	select {
	case <-time.After(1 * time.Second):
		cancel()
		fmt.Println(ctx.Err()) // context canceled
	case <-ctx.Done():
		fmt.Println(ctx.Err())
	}

	// cancel()
}
