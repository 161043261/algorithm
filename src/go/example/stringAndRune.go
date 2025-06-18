//go:build stringAndRune

package main

import (
	"fmt"
	"unicode/utf8"
)

func main() {
	const s = "go"
	fmt.Println("len(s)", len(s))

	for i := 0; i < len(s); i++ {
		fmt.Printf("%x ", s[i])
	}
	fmt.Println("\nRune count:", utf8.RuneCountInString(s))

	for idx, runeVal := range s {
		fmt.Printf("%#U starts at %d\n", runeVal, idx)
	}

	for i, w := 0, 0; i < len(s); i += w {
		runeVal, width := utf8.DecodeRuneInString(s[i:])
		fmt.Printf("%#U starts at %d\n", runeVal, i)
		w = width
		examineRune(runeVal)
	}
}

func examineRune(r rune) {
	if r == 'g' {
		fmt.Println("Found g")
	} else if r == 'o' {
		fmt.Println("Found o")
	}
}
