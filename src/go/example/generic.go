//go:build generic

package main

import (
	"fmt"
)

// ~ 表示底层类型是 []ElemType 类型
// ! ArrLike 可以是 []ElemType 类型
// ! ArrLike 也可以是 type MySlice []ElemType 的 MySlice 自定义类型
func SlicesIndex[ArrLike ~[]ElemType, ElemType comparable](list ArrLike, elem ElemType) int {
	for idx, item := range list {
		fmt.Println("idx =", idx, ", item =", item, ", list[idx] =", list[idx])
		if elem == list[idx] {
			return idx
		}
	}
	return -1 // not found
}

type element[T any] struct {
	next *element[T]
	val  T
}

type List[T any] struct {
	head, tail *element[T]
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

func (ctx *List[T]) GetAll() []T {
	var all []T
	for e := ctx.head; e != nil; e = e.next {
		all = append(all, e.val)
	}
	return all
}

func main() {
	s := []string{"foo", "bar", "baz"}
	fmt.Println("Index of bar:", SlicesIndex(s, "bar"))
	fmt.Println("Index of baz:", SlicesIndex[[]string, string](s, "baz"))
	list := List[int]{}
	list.Push(1)
	list.Push(2)
	list.Push(3)
	fmt.Println("list:", list.GetAll())
}
