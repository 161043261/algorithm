//go:build read_file

package main

import (
	"bufio"
	"fmt"
	"io"
	"math/rand"
	"os"
	"path/filepath"
)

func main() {
	// echo "hello\ngo" > /tmp/dat
	path := filepath.Join(os.TempDir(), "dat")
	contentBytes, _ := os.ReadFile(path)

	// hello
	// go
	fmt.Print(string(contentBytes))

	file, _ := os.Open(path)

	buf := make([]byte, 5)
	numBytes, _ := file.Read(buf)
	fmt.Printf("%d bytes: %s\n", numBytes, string(buf[:numBytes]))

	if rand.Float32() < 0.5 {
		fmt.Println("Seek start")
		file.Seek(0, io.SeekStart)
	}

	reader := bufio.NewReader(file)
	contentBytes2, _ := reader.Peek(5)
	fmt.Printf("%d bytes: %s\n", len(contentBytes2), string(contentBytes2))

	file.Close()
}
