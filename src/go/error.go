//go:build error

package main

import (
	"errors"
	"fmt"
)

func fn(arg int) (int, error) {
	if arg == 42 {
		return -1, errors.New("err: arg == 42")
	}
	return arg + 3, nil
}

var err1 error = fmt.Errorf("err1: First error")
var err2 error = fmt.Errorf("Second error")

func makeProd(arg int) error {
	if arg == 2 {
		return err1
	} else if arg == 4 {
		return fmt.Errorf("err2: %w", err2)
	}
	return nil
}

func main() {
	for _, item := range []int{7, 42} {
		if ret, err := fn(item); err != nil {
			fmt.Println("fn err:", err)
		} else {
			fmt.Println("fn ok:", ret) // ret=10
		}
	}

  for i := range 5 {
    if err := makeProd(i); err != nil {
      if errors.Is(err, err1) {
        fmt.Println("Catch err1")
      } else if errors.Is(err, err2) {
        fmt.Println("Catch err2")
      } else {
        fmt.Printf("Unknown err %s\n", err)
      }
      continue
    }

    fmt.Println("err == nil")
  }
}
