//go:build iterator

package main

import (
	"fmt"
	"iter"
	"slices"
)

type element[T any] struct {
	next *element[T]
	val  T
}

type List[T any] struct {
	head, tail *element[T]
}

func (l *List[T]) Push(v T) {
	if l.tail == nil {
		l.head = &element[T]{val: v}
		l.tail = l.head
	} else {
		l.tail.next = &element[T]{val: v}
		l.tail = l.tail.next
	}
}

func (l *List[T]) All() iter.Seq[T] {
	return func(yield func(T) bool) {

		for e := l.head; e != nil; e = e.next {
			if !yield(e.val) {
				return
			}
		}
	}
}

type idxVal[T any] struct {
	idx int
	val T
}

func (l *List[T]) All2() iter.Seq[idxVal[T]] {
	return func(yield func(idxVal[T]) bool) {
		idx := 0
		e := l.head
		for e != nil {
			if !yield(idxVal[T]{idx, e.val}) {
				return
			}
			idx++
			e = e.next
		}
	}
}

func genFib() iter.Seq[int] {
	return func(yieldAlias func(int) bool) {
		a, b := 1, 1

		for {
			if !yieldAlias(a) {
				return
			}
			a, b = b, a+b
		}
	}
}

func main() {
	l := List[int]{}
	l.Push(1)
	l.Push(2)
	l.Push(3)

	for e := range l.All() {
		fmt.Println(e)
	}

	for e2 := range l.All2() {
		fmt.Println(e2)
	}

	all := slices.Collect(l.All())
	fmt.Println("all:", all)

	all2 := slices.Collect(l.All2())
	fmt.Println("all2:", all2)

	for n := range genFib() {
		if n >= 10 {
			break
		}
		fmt.Println(n)
	}
}
