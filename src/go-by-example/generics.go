//go:build generics

package main

import "fmt"

func SlicesIndex[S ~[]E, E comparable](s S, v E) int {
	for i := range s {
		if v == s[i] {
			return i
		}
	}
	return -1
}

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

func (l *List[T]) AllElements() []T {
	var elems []T
	for e := l.head; e != nil; e = e.next {
		elems = append(elems, e.val)
	}
	return elems
}

func main() {
	type stringSlice []string
	var s = []string{"foo", "bar", "lark"}
	var s2 stringSlice = []string{"foo", "bar", "lark"}
	fmt.Println("index of lark:", SlicesIndex[[]string, string](s, "lark"))
	// [S ~[]E, E comparable]
	fmt.Println("index of lark:", SlicesIndex[stringSlice, string](s2, "lark"))

	l := List[int]{}
	l.Push(1)
	l.Push(2)
	l.Push(3)
	fmt.Println("list:", l.AllElements())
}
