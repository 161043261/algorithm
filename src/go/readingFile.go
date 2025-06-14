//go:build readingFile

package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
)

func main() {
	errHandler := func(err error) {
		if err != nil {
			panic(err)
		}
	}
	// echo "hello\ngo" > /tmp/dat

	bytes, err := os.ReadFile("/tmp/dat")
	errHandler(err)
  // hello
  // go
	fmt.Println(string(bytes))

	f, err := os.Open("/tmp/dat")
	errHandler(err)

	defer func() {
		if err := recover(); err != nil {
			fmt.Println(err)
			f.Close()
		}
	}()

	buf := make([]byte, 5)
	cnt, err := f.Read(buf)
	errHandler(err)
  // 5 bytes: hello
	fmt.Printf("%d bytes: %s\n", cnt, string(buf[:cnt]))

	offset, err := f.Seek(6 /* offset */, io.SeekStart)
	errHandler(err)

	buf2 := make([]byte, 2)
	cnt2, err := f.Read(buf2)
	errHandler(err)
  // 2 bytes at 6: go
	fmt.Printf("%d bytes at %d: %v\n", cnt2, offset, string(buf2[:cnt2]))

	// io.SeekCurrent 从当前光标位置开始查找
	_ /* offset */, err = f.Seek(2, io.SeekCurrent)
	errHandler(err)

	// io.SeekEnd 从文件结尾开始查找
	_ /* offset */, err = f.Seek(-4, io.SeekEnd)
	errHandler(err)

	// io.SeekStart 从文件开头开始查找
	offset3, err := f.Seek(6, io.SeekStart)
	errHandler(err)
	buf3 := make([]byte, 2)
	cnt3, err := io.ReadAtLeast(f, buf3, 2)
	errHandler(err)
  // 2 bytes at 6: go
	fmt.Printf("%d bytes at %d: %v\n", cnt3, offset3, string(buf3[:cnt3]))

	_, err = f.Seek(0, io.SeekStart)
	errHandler(err)

	reader := bufio.NewReader(f)
	buf4, err := reader.Peek(5)
	errHandler(err)
  // 5 bytes: hello
	fmt.Printf("5 bytes: %s\n", string(buf4))
}
