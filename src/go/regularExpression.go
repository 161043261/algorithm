//go:build regularExpression

package main

import (
	"bytes"
	"fmt"
	"regexp"
)

func main() {
	match, _ := regexp.MatchString("p([a-z]+)ch", "peach")
	fmt.Println(match) // true
	r, _ := regexp.Compile("p([a-z]+)ch")
	fmt.Println(r.MatchString("peach"))           // true
	fmt.Println(r.FindString("peach punch"))      // peach
	fmt.Println(r.FindStringIndex("peach punch")) // [0 5]
	// For example this will return information for both p([a-z]+)ch and ([a-z]+)
	fmt.Println(r.FindStringSubmatch("peach punch"))      // [peach ea]
	fmt.Println(r.FindStringSubmatchIndex("peach punch")) // [0 5 1 3]
	fmt.Println(r.FindAllString("peach patch punch", -1)) // [peach patch punch]
	fmt.Println(r.Match([]byte("peach")))                 // true
	r = regexp.MustCompile("p([a-z]+)ch")
	fmt.Println(r)                                      // p([a-z]+)ch
	fmt.Println(r.ReplaceAllString("a peach", "fruit")) // a fruit
	in := []byte("a peach")
	out := r.ReplaceAllFunc(in, bytes.ToUpper)
	fmt.Println(string(out)) // a PEACH
}
