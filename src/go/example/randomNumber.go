//go:build randomNumber

package main

import (
	"fmt"
	"math/rand/v2"
)

func main() {
	fmt.Println(rand.IntN(100))
	fmt.Println(rand.IntN(100))

	fmt.Println(rand.Float64())
	fmt.Println((rand.Float64() * 5) + 5) // [5.0, 10.0)
	fmt.Println((rand.Float64() * 5) + 5) // [5.0, 10.0)

	randSrc1 := rand.NewPCG(5 /* seed1 */, 28 /* seed2 */)
	rand1 := rand.New(randSrc1)
	fmt.Println(rand1.IntN(100))
	fmt.Println(rand1.IntN(100))

	randSrc2 := rand.NewPCG(5 /* seed1 */, 28 /* seed2 */)
	rand2 := rand.New(randSrc2)
	fmt.Println(rand2.IntN(100))
	fmt.Println(rand2.IntN(100))
}
