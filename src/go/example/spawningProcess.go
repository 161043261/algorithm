//go:build spawningProcess

package main

import (
	"fmt"
	"io"
	"os/exec"
)

// 产生外部进程

func main() {
	//! date
	dateCmd := exec.Command("date")
	dateOut /* []byte */, err := dateCmd.Output()
	if err != nil {
		panic(err)
	} else {
		fmt.Println("> date\n", string(dateOut))
	}

	//! date -x
	dateOut2, err := exec.Command("date", "-x").Output()
	if err != nil {
		switch typedErr := err.(type) {
		case *exec.Error:
			fmt.Println("> date -x\n", "err:", err)
		case *exec.ExitError:
			fmt.Println("> date -x\n", "exitCode =", typedErr.ExitCode())
		default:
			panic(err)
		}
	} else {
		fmt.Println("> date -x\n", string(dateOut2))
	}

	grepCmd := exec.Command("grep", "hello")
	grepIn, _ := grepCmd.StdinPipe()
	grepOut, _ := grepCmd.StdoutPipe()
	grepCmd.Start()
	grepIn.Write([]byte("hello japan\ngoodbye japan\n"))
	grepIn.Close()
	grepBytes, _ := io.ReadAll(grepOut)
	grepCmd.Wait()
	fmt.Println("> grep hello\n", string(grepBytes))

	lsCmd := exec.Command("bash", "-c", "ls -a")
	lsOut, err := lsCmd.Output()
	if err != nil {
		panic(err)
	}
	fmt.Println("> ls -a\n", string(lsOut))
}
