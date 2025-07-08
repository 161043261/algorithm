//go:build constant

package main

import (
	"fmt"
	"reflect"
)

const str = "str"

func main() {
	variable := str

	defer func() {
		if err := recover(); err != nil {
			fmt.Println(err)
		}
	}()

	fmt.Println("Original str:", str)
	fmt.Println("Original variable:", variable)

	var updateConstant func()
	updateConstant = func() {
		reflectedVal := reflect.ValueOf(&variable).Elem()
		if reflectedVal.CanSet() {
			reflectedVal.SetString("newStr")
		}
		fmt.Println("Updated str:", str)
		fmt.Println("Updated variable:", variable)
	}

	updateConstant()
}
