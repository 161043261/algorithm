//go:build regex

package main

import (
	"bytes"
	"fmt"
	"regexp"
)

func main() {

	matched, _ := regexp.MatchString("p([a-z]+)ch", "peach")
	fmt.Println(matched) // true

	r, _ := regexp.Compile("p([a-z]+)ch")

	fmt.Println(r.MatchString("peach")) // true

	fmt.Println(r.FindString("leftmost peach punch")) // peach

	fmt.Println(r.FindStringIndex("leftmost peach punch")) // [9 14]

	fmt.Println(r.FindStringSubmatch("leftmost peach punch")) // [peach ea]

	fmt.Println(r.FindStringSubmatchIndex("leftmost peach punch")) // [9 14 10 12]

	fmt.Println(r.FindAllString("patch peach punch", -1)) // [patch peach punch]

	fmt.Println(r.FindAllStringSubmatchIndex(
		"patch peach punch", -1)) // [[0 5 1 3] [6 11 7 9] [12 17 13 15]]

	fmt.Println(r.FindAllString("patch peach punch", 2)) // [patch peach]

	fmt.Println(r.Match([]byte("peach"))) // true

	r = regexp.MustCompile("p([a-z]+)ch")
	fmt.Println("regexp", r) // regexp p([a-z]+)ch

	fmt.Println(r.ReplaceAllString("a peach", "fruit")) // a fruit

	in := []byte("a peach")
	out := r.ReplaceAllFunc(in, bytes.ToUpper) // a PEACH
	fmt.Println(string(out))
}
