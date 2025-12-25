//go:build iota

package main

import "fmt"

const (
	Idle = iota
	Connected
	Error
	Retrying
)

func main() {
	fmt.Println(Idle, Connected, Error, Retrying)
}
