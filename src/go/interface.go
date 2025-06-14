//go:build interface

package main

import (
	"fmt"
	"math"
)

type geometry interface {
	area() float64      // private
	Perimeter() float64 // public
}

type rect struct {
	width, height float64
}

// export
type Circle struct {
	radius float64
}

func (ctx rect) area() float64 {
	return ctx.width * ctx.height
}

func (ctx rect) Perimeter() float64 {
	return 2*ctx.width + 2*ctx.height
}

func (ctx *Circle) area() float64 {
	return math.Pi * ctx.radius * ctx.radius
}

func (ctx *Circle) Perimeter() float64 {
	return 2 * math.Pi * ctx.radius
}

func measure(g geometry) {
	fmt.Println(g)
	fmt.Println(g.area())
	fmt.Println(g.Perimeter())
}

func isRect(g geometry) {
	if r, ok := g.(rect); /* type assert */ ok {
		fmt.Println(r)
	}
}

func isCirclePtr(g geometry) {
	if c, ok := g.(*Circle); /* type assert */ ok {
		fmt.Println(c)
	}
}

func main() {
	r := rect{width: 3, height: 4}
	c := Circle{radius: 5}
	measure(r)
	measure(&c)
	isRect(r)
	isCirclePtr(&c)
}
