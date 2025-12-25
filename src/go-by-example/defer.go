//go:build defer

package main

import (
	"fmt"
	"os"
	"path/filepath"
)

func createFile(filePath string) *os.File {
	fmt.Println("Creating file")
	file, err := os.Create(filePath)
	if err != nil {
		panic(err)
	}
	return file
}

func writeFile(file *os.File) {
	fmt.Println("Writing file")
	fmt.Fprintln(file, "data")
}

func closeFile(file *os.File) {
	fmt.Println("Closing file")
	err := file.Close()
	if err != nil {
		panic(err)
	}
}

func main() {
	fmt.Println("Temporary directory", os.TempDir())
	path := filepath.Join(os.TempDir(), "dat")
	file := createFile(path)
	defer closeFile(file)
	writeFile(file)
}
