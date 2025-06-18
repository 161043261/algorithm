package context_test

import (
	"context"
	"fmt"
	"testing"
	"time"
)

func BenchmarkWithDeadline(b *testing.B) {
	timeout := 3 * time.Second          // 超时时间
	deadline := time.Now().Add(timeout) // 截止时间
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

func BenchmarkWithDeadline2(b *testing.B) {
	timeout := 3 * time.Second          // 超时时间
	deadline := time.Now().Add(timeout) // 截止时间
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

func BenchmarkWithTimeout(b *testing.B) {
	timeout := 3 * time.Second // 超时时间
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	select {
	case <-time.After(5 * time.Second):
		fmt.Println("Overslept")
	case <-ctx.Done():
		fmt.Println(ctx.Err()) // context deadline exceeded
	}

	// cancel()
}

func BenchmarkWithTimeout2(b *testing.B) {
	timeout := 3 * time.Second // 超时时间
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
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
