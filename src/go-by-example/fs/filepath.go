//go:build filepath

package main

import (
	"fmt"
	"path/filepath"
	"strings"
)

func main() {

	p := filepath.Join("dir1", "dir2", "file.go")
	fmt.Println("p", p) // p dir1/dir2/file.go

	fmt.Println(filepath.Join("dir1//", "file.go"))       // dir1/file.go
	fmt.Println(filepath.Join("dir1/../dir1", "file.go")) // dir1/file.go

	fmt.Println("filepath.Dir(p)", filepath.Dir(p))   // filepath.Dir(p) dir1/dir2
	fmt.Println("filepath.Base(p)", filepath.Base(p)) // filepath.Base(p) file.go

	fmt.Println(filepath.IsAbs("dir/file"))  // false
	fmt.Println(filepath.IsAbs("/dir/file")) // true

	filename := "config.json"

	ext := filepath.Ext(filename)
	fmt.Println(ext) // .json

	fmt.Println(strings.TrimSuffix(filename, ext)) // config

	rel, _ := filepath.Rel("a/b", "a/b/c/file")
	fmt.Println(rel) // c/file

	rel, _ = filepath.Rel("a/b", "a/c/d/file")
	fmt.Println(rel) // ../c/d/file
}
