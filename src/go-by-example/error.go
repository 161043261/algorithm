//go:build error

package main

import (
	"errors"
	"fmt"
)

func f(arg int) (int, error) {
	if arg == 0 {
		return 0, errors.New("0 is error")
	}
	return arg, nil
}

var ErrOutOfMemory = errors.New("out of memory")
var ErrStackOverflow = errors.New("stack overflow")

func makeErr(arg int) error {
	if arg == 1 {
		return ErrOutOfMemory
	}
	if arg == 2 {
		return fmt.Errorf("arg == -2 %w", ErrStackOverflow)
	}
	return nil
}

func main() {
	for _, i := range []int{0, 1} {
		if r, e := f(i); e != nil {
			fmt.Println("f failed", e)
		} else {
			fmt.Println("f success", r)
		}
	}

	for i := range 3 {
		if err := makeErr(i); err != nil {
			if errors.Is(err, ErrOutOfMemory) {
				fmt.Println(i, "ErrOutOfMemory", err.Error())
			} else if errors.Is(err, ErrStackOverflow) {
				fmt.Println(i, "ErrStackOverflow", err.Error())
			} else {
				fmt.Println(i, "Unknown error", err.Error())
			}
		}
	}
}
