package chan_test

import (
	"fmt"
	"testing"
)

// 向一个关闭的通道发送值, 会导致 panic
// 从一个关闭的通道接收值, 会一直接收, 直到通道空
// 从一个关闭的空通道接收值, 会收到零值和 false (表示接收失败)
// 重复关闭通道, 也会导致 panic
func TestChan(t *testing.T) {
	ch1 := make(chan int)    // Not buffered
	ch2 := make(chan int, 3) // Buffered

	go func() {
		for i := range 10 {
			ch1 <- i
		}
		close(ch1)
	}()

	go func() {
		for {
			i, ok := <-ch1
			if !ok {
				break
			}
			ch2 <- i * i
		}
		close(ch2)
	}()

	// 通道关闭后
	// 从一个关闭的空通道接收值 (for range), 会收到零值和 false (表示接收失败)
	// 根据 false (表示接收失败), 「自动」退出 for range
	for item := range ch2 {
		fmt.Println(item)
	}
}
