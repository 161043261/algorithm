//go:build writingFile

package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {

	errHandler := func(err error) {
		if err != nil {
			panic(err)
		}
	}

	bytes := []byte("hello\ngo\n")
	err := os.WriteFile("/tmp/dat1", bytes, 0644 /* fileMode */)
	errHandler(err)

	f, err := os.Create("/tmp/dat2")
	errHandler(err)

	defer func() {
		if err := recover(); err != nil {
			fmt.Println(err)
			f.Close()
		}
	}()

	bytes2 := []byte{115 /* s */, 111 /* o */, 109 /* m */, 101 /* e */, 10 /* \n */}
	fmt.Println(string(bytes2))
	cnt2, err := f.Write(bytes2)
	errHandler(err)
  // Write 5 bytes
	fmt.Printf("Write %d bytes\n", cnt2)

	bytes3, err := f.WriteString("main.go\n")
	errHandler(err)
  // Write 8 bytes
	fmt.Printf("Write %d bytes\n", bytes3)

	f.Sync()

	w := bufio.NewWriter(f)
	cnt4, err := w.WriteString("main.java\n")
	errHandler(err)
  // Write 10 bytes
	fmt.Printf("Write %d bytes\n", cnt4)

	w.Flush()
}
