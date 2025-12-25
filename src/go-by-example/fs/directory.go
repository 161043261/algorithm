//go:build directory

package main

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
)

func main() {

	os.Mkdir("subdir", 0755)

	defer os.RemoveAll("subdir")

	createEmptyFile := func(name string) {
		data := []byte("")
		os.WriteFile(name, data, 0644)
	}

	createEmptyFile("subdir/file1")

	os.MkdirAll("subdir/parent/child", 0755)

	createEmptyFile("subdir/parent/file2")
	createEmptyFile("subdir/parent/file3")
	createEmptyFile("subdir/parent/child/file4")

	c, _ := os.ReadDir("subdir/parent")

	fmt.Println("Listing subdir/parent")
	for _, entry := range c {
		fmt.Println(" ", entry.Name(), entry.IsDir())
	}

	os.Chdir("subdir/parent/child")

	c, _ = os.ReadDir(".")

	fmt.Println("Listing subdir/parent/child")
	for _, entry := range c {
		fmt.Println(" ", entry.Name(), entry.IsDir())
	}

	os.Chdir("../../..")

	fmt.Println("Visiting subdir")
	filepath.WalkDir("subdir", visit)
}

func visit(path string, entry fs.DirEntry, err error) error {
	if err != nil {
		return err
	}
	fmt.Println(" ", path, entry.IsDir())
	return nil
}
