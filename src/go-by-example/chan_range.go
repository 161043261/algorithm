//go:build chan_range

package main

import "fmt"

func main() {

	queueChan := make(chan string, 2)
	queueChan <- "one"
	queueChan <- "two"
	close(queueChan) // Must close the channel to prevent deadlock

	for elem := range queueChan {
		fmt.Println(elem)
	}
}
