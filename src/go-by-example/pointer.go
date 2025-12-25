//go:build pointer

package main

import "fmt"

type iWarp struct {
	i int
}

func zeroVal(iVal int) {
	iVal = 0
}

func zeroPtr(iPtr *int) {
	*iPtr = 0
}

func zeroValWarp(iValWrap iWarp) {
	iValWrap.i = 0
}

func zeroPtrWarp(iPtrWrap *iWarp) {
	iPtrWrap.i = 0
}

func main() {
	i := 1
	fmt.Println("initial", i) // initial 1

	zeroVal(i)
	fmt.Println("zeroVal", i) // zeroVal 1

	zeroPtr(&i)
	fmt.Println("zeroPtr", i) // zeroPtr 0

	fmt.Println("pointer", &i)

	j := iWarp{i: 1}
	fmt.Println("initial", j) // initial {1}

	zeroValWarp(j)
	fmt.Println("zeroValWarp", j) // zeroValWarp {1}

	zeroPtrWarp(&j)
	fmt.Println("zeroPtrWarp", j) // zeroPtrWarp {0}

	fmt.Println("pointer", &j)
}
