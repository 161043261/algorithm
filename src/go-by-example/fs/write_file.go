//go:build write_file

package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
)

func main() {

	data1 := []byte("hello\ngo\n")
	path1 := filepath.Join(os.TempDir(), "dat1")
	os.WriteFile(path1, data1, 0644)

	path2 := filepath.Join(os.TempDir(), "dat2")
	file, _ := os.Create(path2)

	defer file.Close()

	data2 := []byte("lark\n")
	count, _ := file.Write(data2)
	fmt.Printf("wrote %d bytes\n", count) // wrote 5 bytes

	count2, _ := file.WriteString("12345\n")
	fmt.Printf("wrote %d bytes\n", count2) // wrote 6 bytes

	file.Sync()

	writer := bufio.NewWriter(file)
	count3, _ := writer.WriteString("abcdefg\n")
	fmt.Printf("wrote %d bytes\n", count3) // wrote 8 bytes

	writer.Flush()
}
