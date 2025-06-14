//go:build lineFilter

package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

// echo 'hello\ngo' > /tmp/dat
// cat /tmp/dat | go run lineFilter.go
func main() {
  scanner := bufio.NewScanner(os.Stdin)

  for scanner.Scan() {
    line := strings.ToUpper(scanner.Text())
    fmt.Println(line)
  }

  if err := scanner.Err(); err != nil {
    fmt.Fprintln(os.Stderr, "Error:", err)
    os.Exit(1)
  }
}
