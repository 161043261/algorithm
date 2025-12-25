//go:build rand

package main

import (
	"fmt"
	"math/rand/v2"
)

func main() {

	fmt.Println(rand.IntN(100), rand.IntN(100)) // [0, 100)

	fmt.Println(rand.Float64()) // [0.0, 1.0)

	fmt.Println((rand.Float64()*5)+5, (rand.Float64()*5)+5) // [5.0, 10.0)

	s2 := rand.NewPCG(28, 1024)
	r2 := rand.New(s2)
	fmt.Println(r2.IntN(100), (r2.IntN(100)))

	s3 := rand.NewPCG(28, 1024)
	r3 := rand.New(s3)
	fmt.Println(r3.IntN(100), r3.IntN(100))
}
