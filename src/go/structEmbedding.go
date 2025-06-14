//go:build structEmbedding

package main

import "fmt"

type base struct {
  num int
}

func (ctx base) describe() string {
  return fmt.Sprintf("base num=%v", ctx.num)
}

type container struct {
  base
  str string
}

func main() {
  co := container {
    // struct embedding
    base: base{
      num: 1,
    },
    str: "container str",
  }
  fmt.Printf("co={num: %v, str: %v}\n", co.num, co.str)
  fmt.Println("num:", co.base.num)
  fmt.Println("describe:", co.base.describe())

  type describer interface {
    describe() string
  }

  var d describer = co;
  fmt.Println("describer:", d.describe())
}
