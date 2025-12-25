//go:build string_rune

package main

import (
	"fmt"
	"unicode/utf8"
)

func main() {
	const s = "こんにちは"
	fmt.Println("length", len(s)) // length: 6

	for i := 0; i < len(s); i++ {
		fmt.Printf("%x ", s[i])
	}
	fmt.Println()

	fmt.Println("Rune count", utf8.RuneCountInString(s))

	for idx, runeValue := range s {
		fmt.Printf("%#U starts at %d\n", runeValue, idx)
	}

	fmt.Println("\nUsing utf8.DecodeRuneInString")
	for i, w := 0, 0; i < len(s); i += w {
		runeValue, width := utf8.DecodeRuneInString(s[i:])
		fmt.Printf("%#U starts at %d\n", runeValue, i)
		w = width

		examineRune(runeValue)
	}
}

func examineRune(r rune) {
	switch r {
	case 'こ':
		{
			fmt.Println("found こ")
		}
	case 'ん':
		{
			fmt.Println("found ん")
		}
	case 'に':
		{
			fmt.Println("found に")
		}
	case 'ち':
		{
			fmt.Println("found ち")
		}
	case 'は':
		{
			fmt.Println("found は")
		}
	default:
		{
			fmt.Println("unknown rune")
		}
	}
}
