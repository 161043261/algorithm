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
			if !yield(e.val) {
				// yield(e.val) == false
				return
			}
		}
	}
}

func seqFunc() iter.Seq[int] {
	return func(yield func(int) bool) {
		a, b := 1, 1
		for {
			if !yield(a) {
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
	for item := range generator {
		fmt.Println(item)
	}

	sequence := slices.Collect(generator)
	fmt.Println("sequence:", sequence)

	seq := seqFunc()
	for item := range seq {
		if item >= 10 {
			break
		}
		fmt.Println(item)
	}
}
