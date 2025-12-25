//go:build embed_struct

package main

import "fmt"

type base struct {
	num int
}

func (b base) describe() string {
	return fmt.Sprintf("base with num=%v", b.num)
}

type container struct {
	base // embed
	str  string
}

func main() {

	co := container{
		base: base{
			num: 1,
		},
		str: "some name",
	}

	fmt.Printf("co={num: %v, str: %v}\n", co.num /* through base */, co.str)
	fmt.Println("num (through base)", co.base.num)
	fmt.Println("describe", co.describe())

	type describer interface {
		describe() string
	}

	var d describer = co
	fmt.Println("describer", d.describe())
}
