//go:build exec_process

package main

import (
	"fmt"
	"os"
	"os/exec"
	"syscall"
)

func main() {
	defer fmt.Println("Will not be printed")

	execPath, _ := exec.LookPath("ls")
	fmt.Println(execPath)
	args := []string{"ls", "-a", "-l"}
	env := os.Environ()

	syscall.Exec(execPath, args, env)
	os.Exit(0)
}
