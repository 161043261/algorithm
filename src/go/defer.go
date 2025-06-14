//go:build defer

package main

import (
	"fmt"
	"os"
)

func main() {
	file := createFile("/tmp/defer.txt")
	defer closeFile(file)
	writeFile(file)
}

func createFile(filename string) *os.File {
	fmt.Println("Creating file")
	f, err := os.Create(filename)
	if err != nil {
		panic(err)
	}
	return f
}

func writeFile(file *os.File) {
	fmt.Println("Writing file")
	fmt.Fprintln(file, "data")
}

func closeFile(file *os.File) {
	fmt.Println("Closing file")
	if err := file.Close(); err != nil {
		panic(err)
	}
}
