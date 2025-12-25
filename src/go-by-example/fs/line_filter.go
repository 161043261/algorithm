//go:build line_filter

package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

// echo "hello\ngo" > /tmp/dat && cat /tmp/dat | go run ./src/go-by-example/fs/line_filter.go
// echo "hello\ngo" > /tmp/dat && cat /tmp/dat | ./target/fs/line_filter
func main() {
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		upperLine := strings.ToUpper(scanner.Text())
		fmt.Println(upperLine)
	}

	if err := scanner.Err(); err != nil {
		fmt.Fprintln(os.Stderr, "error:", err)
		os.Exit(1)
	}
}
