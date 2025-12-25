//go:build timer

package main

import (
	"fmt"
	"time"
)

func main() {

	timer1 := time.NewTimer(2 * time.Second)

	<-timer1.C // JavaScript setTimeout
	fmt.Println("Timer 1 fired")

	timer2 := time.NewTimer(time.Second)
	go func() {
		<-timer2.C // JavaScript setTimeout
		fmt.Println("Timer 2 fired")
	}()

	ok := timer2.Stop() // JavaScript clearTimeout
	if ok {
		fmt.Println("Timer 2 stopped")
	}

	time.Sleep(2 * time.Second)
}
