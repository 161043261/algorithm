//go:build map

package main

import (
	"fmt"
	"maps"
)

func main() {

	m := make(map[string]int)

	m["k1"] = 7
	m["k2"] = 13

	fmt.Println("map", m)

	v1 := m["k1"]
	fmt.Println("v1", v1)

	v3 := m["k3"]
	fmt.Println("v3", v3)

	fmt.Println("length", len(m))

	// The delete built-in function deletes the element with the specified key (m[key]) from the map.
	delete(m, "k2")
	fmt.Println("map", m)

	// The clear built-in function clears maps and slices.
	clear(m)
	fmt.Println("map", m)

	_, isPresent := m["k2"]
	fmt.Println("Is present", isPresent)

	n := map[string]int{"foo": 1, "bar": 2}
	fmt.Println("map", n)

	n2 := map[string]int{"foo": 1, "bar": 2}
	if maps.Equal(n, n2) {
		fmt.Println("n maps.Equal n2")
	}
}
