//go:build commandLineArgument

package main

import (
	"fmt"
	"os"
)

// ./target/commandLineArgument a b c d
func main() {
	argsWithProgram := os.Args
	argsWithoutProgram := os.Args[1:]
	arg3rd := os.Args[3]
	fmt.Println(argsWithProgram)
	fmt.Println(argsWithoutProgram)
	fmt.Println(arg3rd)
}
