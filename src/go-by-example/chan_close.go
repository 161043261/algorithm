//go:build chan_close

package main

import "fmt"

func main() {
	jobChan := make(chan int, 5)
	doneChan := make(chan bool)

	go func() {
		for {
			j, ok := <-jobChan
			if ok {
				fmt.Println("received job", j)
			} else {
				fmt.Println("received all jobs")
				doneChan <- true
				return
			}
		}
	}()

	for j := 1; j <= 3; j++ {
		jobChan <- j
		fmt.Println("sent job", j)
	}
	close(jobChan)
	fmt.Println("sent all jobs")

	<-doneChan

	_, ok := <-jobChan
	fmt.Println("received more jobs:", ok)
}
