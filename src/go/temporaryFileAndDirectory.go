//go:build temporaryFileAndDirectory

package main

import (
	"fmt"
	"os"
	"path/filepath"
)

func main() {

	errHandler := func(err error) {
		if err != nil {
			panic(err)
		}
	}

	tempFile, err := os.CreateTemp("", "tempFile")
	errHandler(err)
	fmt.Println("Temp file name:", tempFile.Name())

	defer os.Remove(tempFile.Name())

	_, err = tempFile.Write([]byte{1, 2, 3})
	errHandler(err)

	tempDir, err := os.MkdirTemp("", "tempDir")
	errHandler(err)
	fmt.Println("Temp dir name:", tempDir)

	defer os.RemoveAll(tempDir)

	filename := filepath.Join(tempDir, "file1")
	err = os.WriteFile(filename, []byte{4, 5, 6}, 0666)
	errHandler(err)
}
