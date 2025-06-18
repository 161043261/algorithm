//go:build rangeOverIterator.go

package main

import (
	"fmt"
	"iter"
	"slices"
)

type List[T any] struct {
	head, tail *element[T]
}

type element[T any] struct {
	next *element[T]
	val  T
}

func (ctx *List[T]) Push(v T) {
	if ctx.tail == nil {
		ctx.head = &element[T]{val: v}
		ctx.tail = ctx.head
	} else {
		ctx.tail.next = &element[T]{val: v}
		ctx.tail = ctx.tail.next
	}
}

// type Seq[V any] func(yield func(V) bool)
func (ctx *List[T]) generatorFunction() iter.Seq[T] {
	return func(yield func(T) bool) {
		for e := ctx.head; e != nil; e = e.next {
			if !yield /* main.main-range1 */ (e.val) {
				// yield(e.val) == false
				return
			}
		}
	}
}

func generatorFunction2() iter.Seq[int] {
	return func(yield func(int) bool) {
		a, b := 1, 1
		for {
			if !yield /* main.main-range2 */ (a) {
				// yield(a) == false
				return
			}
			a, b = b, a+b
		}
	}
}

func main() {
	list := List[int]{}
	list.Push(1)
	list.Push(2)
	list.Push(3)

	generator := list.generatorFunction()

	// main.main-range1 start
	for item := range generator {
		fmt.Println(item)
	}
	// main.main-range1 end

	s1 := slices.Collect(generator)
	fmt.Println("s1:", s1)

	generator2 := generatorFunction2()

	// main.main-range2 start
	for item := range generator2 {
		if item >= 10 {
			break
		}
		fmt.Println(item)
	}
	// main.main-range1 end
}
