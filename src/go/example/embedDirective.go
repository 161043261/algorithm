//go:build embedDirective

package main

import "embed"

//go:embed dir/file.txt
var fileStr string

//go:embed dir/file.txt
var fileBytes []byte

//go:embed dir/file.txt
//go:embed dir/*.hash
var dir embed.FS

// cd ./src/go && mkdir ./dir &&         \
// echo "hello go" > ./dir/file.txt &&   \
// echo "123".     > ./dir/file1.hash && \
// echo "456".     > ./dir/file2.hash && \
// go run ./embedDirective.go &&.        \
// rm -rf ./dir && cd ../..
func main() {
	print(fileStr)           // hello go
	print(string(fileBytes)) // hello go

	content1, _ := dir.ReadFile("dir/file1.hash")
	print(string(content1)) // 123

	content2, _ := dir.ReadFile("dir/file2.hash")
	print(string(content2)) // 456
}
