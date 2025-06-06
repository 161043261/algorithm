//go:build map

package main

import (
	"fmt"
	"maps"
)

func main() {
	m := make(map[string] /* key type */ int /* value type */)
	// var m map[string]int = make(map[string]int)
	m["k1"] = 1
	m["k2"] = 2
	m["k4"] = 4
	fmt.Println(m) // map[k1:1 k2:2 k4:4]
	fmt.Println("len:", len(m)) // len: 3

	v1 := m["k1"]
	fmt.Println("v1:", v1) // v1: 1

	if v3, ok := m["k3"]; !ok {
		fmt.Println("v3:", v3, "ok:", ok) // v3: 0 ok: false
	}

	// `delete` removes key/value pair from a map
	delete(m, "k1")
	delete(m, "k3")
	fmt.Println(m) // map[k2:2 k4:4]

	// `clear` removes all key/value pairs from a map
	clear(m)
	fmt.Println(m) // map[]

	n := map[string]int{"foo": 1, "bar": 2} // like JS object
	fmt.Println(n) // map[bar:2 foo:1]

	// The maps package contains utility functions for maps.
	n2 := map[string]int{"foo": 1, "bar": 2}
	if maps.Equal(n, n2) {
		fmt.Println("n == n2") // n == n2
	}
}
