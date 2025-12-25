//go:build custom_error

package main

import (
	"errors"
	"fmt"
)

type argError struct {
	arg     int
	message string
}

func (a *argError) Error() string {
	return fmt.Sprintf("arg=%d, message=%s", a.arg, a.message)
}

var _ error = (*argError)(nil)

func f(arg int) (int, error) {
	if arg < 0 {
		return arg, &argError{arg, "arg < 0 is error"}
	}
	return arg, nil
}

func main() {
	var err *argError
	_, err2 := f(-1)
	if errors.As(err2, &err) {
		fmt.Println(err.Error(), "errors.As", err2.Error())
	}

	_, err2 = f(-2)
	if errors.As(err2, &err) {
		fmt.Println(err.Error(), "errors.As", err2.Error())
	}
}
