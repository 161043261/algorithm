//go:build switch

package main

import (
	"fmt"
	"time"
)

func main() {
	i := 2

	// Normal switch
	switch i {
	case 1:
		fmt.Println("One")
	case 2:
		fmt.Println("Two")
	case 3:
		fmt.Println("Three")
	}

	switch time.Now().Weekday() {

	// case time.Saturday:
	//   fallthrough
	// case time.Sunday:
	//   fmt.Println("It's the weekend")

	case time.Saturday, time.Sunday:
		fmt.Println("It's the weekend")
	default:
		fmt.Println("It's a weekday")
	}

	t := time.Now()
	switch {
	case t.Hour() < 12:
		fmt.Println("It's before noon")
	default:
		fmt.Println("It's after noon")
	}

	whoAmI := func(i any) {
		switch t := i.(type) {
		case bool:
			fmt.Println("I'm a bool")
		case int:
			fmt.Println("I'm a int")
		default:
			fmt.Printf("Unknown type: %T\n", t)
		}
	}
	whoAmI(true)
	whoAmI(1)
	whoAmI("Hello World")
}
