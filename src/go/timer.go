//go:build timer

package main

import (
	"fmt"
	"time"
)

//! setTimeout
func main() {

  //! await new Promise((resolve) => setTimeout(resolve, 2000));
	timer1 := time.NewTimer(2 * time.Second)

	<-timer1.C
	fmt.Println("Timer1 fired")
	timer2 := time.NewTimer(time.Second)

	go func() {
		<-timer2.C
		fmt.Println("Timer2 fired")
	}()

  // timer.Stop() 方法: 尝试取消 timer, 返回是否取消成功
	ok := timer2.Stop()
	if ok {
    // 取消成功, 返回 true
		fmt.Println("Stop timer2 ok")
	} else {
    // 如果在尝试取消 timer 前, timer 已触发
    // 则取消失败, 返回 false
    fmt.Println("Stop timer2 err")
  }

	time.Sleep(2 * time.Second)
	fmt.Println("return...")
}
