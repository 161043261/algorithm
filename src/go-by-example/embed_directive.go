//go:build embed_directive

package main

import (
	"embed"
)

//go:embed fs/directory.go
var fileStr string

//go:embed fs/filepath.go
var fileBytes []byte

//go:embed fs/README.md
//go:embed fs/*.go
var fs embed.FS

func main() {
	print(fileStr)
	print(string(fileBytes))

	content1, _ := fs.ReadFile("fs/README.md")
	print(string(content1))

	content2, _ := fs.ReadFile("fs/line_filter.go")
	print(string(content2))
}
