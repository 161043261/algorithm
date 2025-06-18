//go:build panic

package main

import "os"

func main() {
	panic("A problem")

	if _, err := os.Create("/tmp/panic"); err != nil {
		panic(err)
	}
}
