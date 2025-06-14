//go:build method

package main

import "fmt"

type Rect struct {
  width, height int
}

func (ctx *Rect) area() int {
  return ctx.width * ctx.height
}

// export
func (ctx Rect) Perimeter() int {
  return 2*ctx.width + 2*ctx.height
}

func main() {
  r := Rect{width: 10, height: 5}
  fmt.Println("area:", r.area())
  fmt.Println("perimeter:", r.Perimeter())

  rp := &r
  fmt.Println("area:", rp.area())
  fmt.Println("perimeter:", rp.Perimeter())
}
