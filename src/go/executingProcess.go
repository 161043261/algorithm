//go:build executingProcess

package main

import (
	"fmt"
	"os"
	"os/exec"
	"syscall"
)

func main() {
	binaryPath, err := exec.LookPath("ls")
	if err != nil {
		panic(err)
	}

	args := []string{"ls", "-a"}
	env := os.Environ()
	fmt.Println("env", env)

	if err := syscall.Exec(binaryPath, args, env); err != nil {
		panic(err)
	}
}
