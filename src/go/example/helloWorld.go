//go:build helloWorld

// 构建约束, 不能有前导空格

package main

import "fmt"

func main() {
	fmt.Println("Hello World")
}

//! go build -tags helloWorld -o ./target/helloWorld ./src/go/example/helloWorld.go

// Immediately run
//! go run ./src/go/example/helloWorld.go

// 输出二进制文件和汇编文件
//! go build -gcflags -S ./src/go/example/helloWorld.go &> ./helloWorld.s

// 对 main 函数生成 SSA (静态单赋值) 中间过程的可视化文件
//! GOSSAFUNC=main go build ./src/go/example/helloWorld.go
