//go:build helloWorld
// 构建约束, 不能有前导空格

package main

import "fmt"

func main() {
	fmt.Println("Hello World");
}

//! go build -tags helloWorld -o ./target/helloWorld ./src/go/helloWorld.go

// Immediately run
//! go run ./src/go/helloWorld.go
