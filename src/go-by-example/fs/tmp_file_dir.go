//go:build tmp_file_dir

package main

import (
	"fmt"
	"os"
	"path/filepath"
)

func main() {

	file, _ := os.CreateTemp("", "tmp-file")
	fmt.Println("Temp file name", file.Name())

	defer os.Remove(file.Name())

	file.Write([]byte{1, 2, 3, 4})

	dirname, _ := os.MkdirTemp("", "tmp-dir")
	fmt.Println("Temp dir name", dirname)

	defer os.RemoveAll(dirname)

	filename := filepath.Join(dirname, "file1")
	os.WriteFile(filename, []byte{5, 6, 7, 8}, 0666)
}
