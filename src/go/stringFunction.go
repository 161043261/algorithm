//go:build stringFunction

package main

import (
	"fmt"
	str "strings"
)

var print = fmt.Println

func main() {
  print("Contains:", str.Contains("test", "es"))
  print("Count:", str.Count("test", "t"))
  print("HasPrefix:", str.HasPrefix("test", "te"))
  print("HasSuffix:", str.HasSuffix("test", "st"))
  print("Index:", str.Index("test", "e"))
  print("Join:", str.Join([]string{"a", "b", "c"}, "-"))
  print("Repeat:", str.Repeat("a", 5))
  print("Replace:", str.Replace("foo", "o", "0", -1))
  print("Replace:", str.Replace("foo", "o", "0", 1))
  print("Split:", str.Split("a-b-c", "-"))
  print("ToLower:", str.ToLower("TEST"))
  print("ToUpper:", str.ToUpper("test"))
}
