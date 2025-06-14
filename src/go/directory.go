//go:build directory

package main

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
)

func main() {

	errHandler := func(err error) {
		if err != nil {
			panic(err)
		}
	}

	err := os.Mkdir("subdir", 0755)
	errHandler(err)

	defer os.RemoveAll("subdir")

	createEmptyFile := func(name string) {
		data := []byte("")
		err := os.WriteFile(name, data, 0644)
		errHandler(err)
	}

	createEmptyFile("subdir/file1")

	err = os.MkdirAll("subdir/parent/child", 0755)
	errHandler(err)

	createEmptyFile("subdir/parent/file2")
	createEmptyFile("subdir/parent/file3")
	createEmptyFile("subdir/parent/child/file4")

	entries, err := os.ReadDir("subdir/parent")
	errHandler(err)

  fmt.Println("Listing subdir/parent")
	for _, entry := range entries {
		fmt.Println("  ", entry.Name(), entry.IsDir())
	}

	// Change the current working directory
	err = os.Chdir("subdir/parent/child")
	errHandler(err)

	entries2, err := os.ReadDir(".")
	errHandler(err)

  fmt.Println("Listing subdir/parent/child")
	for _, entry := range entries2 {
		fmt.Println("  ", entry.Name(), entry.IsDir())
	}

	err = os.Chdir("../../..")
	errHandler(err)

	fn := func(path string, entry fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		fmt.Println("  ", path, entry.Name(), entry.IsDir())
		return nil
	}

  fmt.Println("Visiting subdir")
	err = filepath.WalkDir("subdir", fn)
	errHandler(err)
}
