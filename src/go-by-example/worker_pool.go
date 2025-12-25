//go:build worker_pool

package main

import (
	"fmt"
	"time"
)

func worker(id int, jobChan <-chan int, resultChan chan<- int) {
	for j := range jobChan {
		fmt.Println("worker", id, "started  job", j)
		time.Sleep(time.Second)
		fmt.Println("worker", id, "finished job", j)
		resultChan <- j * 2
	}
}

func main() {

	const numWorkers = 3
	const numJobs = 15
	jobChan := make(chan int, numJobs)
	resultChan := make(chan int, numJobs)

	for w := 1; w <= numWorkers; w++ {
		go worker(w, jobChan, resultChan)
	}
	time.Sleep(time.Second)

	for j := 1; j <= numJobs; j++ {
		jobChan <- j
	}
	close(jobChan) // Must close the channel to prevent deadlock

	for a := 1; a <= numJobs; a++ {
		<-resultChan
	}
}
