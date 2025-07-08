//go:build interface2

package main

import (
	"fmt"
)

type myErr string

type myErr2 struct {
	lineNo string
	colNo  string
}

func (err myErr) Error() string {
	return string(err)
}

func (err myErr2) Error() string {
	return err.lineNo + err.colNo
}

func do() error {
	var err *myErr
	return err
}

func do2() *myErr {
	return nil
}

func wrapDo2() error {
	return do2()
}

func do3() error {
	var err *myErr2
	return err
}

func do4() *myErr2 {
	return nil
}

func wrapDo4() error {
	return do4()
}

// ! nil 的接口是有类型的
func main() {
	err := do()
	fmt.Println(err == nil)                         // false
	fmt.Println(err == nil || err == (*myErr)(nil)) // true

	err2 := do2()
	fmt.Println(err2 == nil) // true

	err3 := wrapDo2()
	fmt.Println(err3 == nil)                          // false
	fmt.Println(err3 == nil || err3 == (*myErr)(nil)) // true

	err4 := do3()
	fmt.Println(err4 == nil)                           // false
	fmt.Println(err4 == nil || err4 == (*myErr2)(nil)) // true

	err5 := do4()
	fmt.Println(err5 == nil) // true

	err6 := wrapDo4()
	fmt.Println(err6 == nil)                           // false
	fmt.Println(err6 == nil || err6 == (*myErr2)(nil)) // true
}
