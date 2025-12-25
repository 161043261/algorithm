//go:build cmd_arg

package main

import (
	"fmt"
	"os"
)

// ./target/cmd_arg a b c d e
func main() {

	argsWithProgram := os.Args
	argsWithoutProgram := os.Args[1:]

	arg := os.Args[3]

	fmt.Println(argsWithProgram)
	fmt.Println(argsWithoutProgram)
	fmt.Println(arg)
	fmt.Println(arg == argsWithProgram[3])
	fmt.Println(arg == argsWithoutProgram[2])
}
