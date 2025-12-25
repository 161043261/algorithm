//go:build strings

package main

import (
	f "fmt"
	"strings"
)

var p = f.Println

func main() {

	p("strings.Contains  ", strings.Contains("test", "es"))
	p("strings.Count     ", strings.Count("test", "t"))
	p("strings.HasPrefix ", strings.HasPrefix("test", "te"))
	p("strings.HasSuffix ", strings.HasSuffix("test", "st"))
	p("strings.Index     ", strings.Index("test", "e"))
	p("strings.Join      ", strings.Join([]string{"a", "b", "c", "d", "e"}, "-"))
	p("strings.Repeat    ", strings.Repeat("a", 5))
	p("strings.Replace   ", strings.Replace("foo", "o", "0", 1))
	p("strings.Replace   ", strings.Replace("foo", "o", "0", -1))
	p("strings.ReplaceAll", strings.ReplaceAll("foo", "o", "0"))
	p("strings.Split     ", strings.Split("a-b-c-d-e", "-"))
	p("strings.ToLower   ", strings.ToLower("TEST"))
	p("strings.ToUpper   ", strings.ToUpper("test"))
}
