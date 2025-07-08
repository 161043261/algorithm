package context_test

import (
	"context"
	"fmt"
	"testing"
	"time"
)

type Key string

func TestWithValue(t *testing.T) {

	worker := func(ctx context.Context) {
		k1, k2 := Key("k1"), Key("k2")
		v1, ok1 := ctx.Value(k1).(string) // .(string) 类型断言
		if !ok1 {
			fmt.Println("k1 not found")
		}

		v2, ok2 := ctx.Value(k2).(string) // .(string) 类型断言
		if !ok2 {
			fmt.Println("k2 not found")
		}

	tag:
		for {
			fmt.Println("[worker] v1 =", v1, "v2 =", v2)
			time.Sleep(time.Second)

			select {
			case <-ctx.Done():
				break tag
			default:
			}
		}

		fmt.Println("[worker] End")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	ctx = context.WithValue(ctx, Key("k1") /* key */, "v1" /* value */)
	ctx = context.WithValue(ctx, Key("k2") /* key */, "v2" /* value */)
	defer cancel()

	go worker(ctx)
	time.Sleep(5 * time.Second)
	fmt.Println("[main] Done")
}
