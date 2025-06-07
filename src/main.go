//go:build main
package main

import "fmt"

func main() {
	fmt.Println("Bootstrap")
}

// 输出二进制文件 main 和汇编文件 main.asm
//! go build -gcflags -S main.go &> main.asm

// 对 main 函数生成 SSA (静态单赋值) 中间过程的可视化文件
//! GOSSAFUNC=main go build main.go
