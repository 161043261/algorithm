//go:build spawn_process

package main

import (
	"errors"
	"fmt"
	"io"
	"os/exec"
)

func main() {

	dateCmd := exec.Command("date")
	dateOut, _ := dateCmd.Output()

	fmt.Println("> date")
	fmt.Println(string(dateOut))

	_, err := exec.Command("date", "-x").Output()
	if err != nil {
		var execErr *exec.Error
		var exitErr *exec.ExitError
		switch {
		case errors.As(err, &execErr):
			{
				fmt.Println("execute error", err)
			}
		case errors.As(err, &exitErr):
			{
				exitCode := exitErr.ExitCode()
				fmt.Println("exit code", exitCode) // exit code 1
			}
		default:
			{
				panic(err)
			}
		}
	}

	grepCmd := exec.Command("grep", "hello")

	grepIn, _ := grepCmd.StdinPipe()
	grepOut, _ := grepCmd.StdoutPipe()
	grepCmd.Start()
	grepIn.Write([]byte("hello go\ngoodbye go"))
	grepIn.Close()
	grepBytes, _ := io.ReadAll(grepOut)
	grepCmd.Wait()

	fmt.Println("> grep hello")
	fmt.Println(string(grepBytes)) // hello go

	lsCmd := exec.Command("bash", "-c", "ls -al")
	lsOut, _ := lsCmd.Output()
	fmt.Println("> ls -al")
	fmt.Println(string(lsOut))
}
