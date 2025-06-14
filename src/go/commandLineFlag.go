//go:build commandLineFlag

package main

import (
	"flag"
	"fmt"
)

// ./target/commandLineFlag -aString=aaa -aNumber=6 -aBoolean -aStrVar=ccc
func main() {
	strPtr := flag.String("aString" /* name */, "defaultValue" /* default value */, "Usage: a string" /* usage*/)
	numPtr := flag.Int("aNumber", 1, "Usage: a number")
	boolPtr := flag.Bool("aBoolean", false, "Usage: a boolean")

  var strVar string
  flag.StringVar(&strVar, "aStrVar", "defaultValue2", "Usage: a string variable")
  flag.Parse()
  fmt.Println("strPtr:", *strPtr) // strPtr: aaa
  fmt.Println("numPtr:", *numPtr) // numPtr: 6
  fmt.Println("boolPtr:", *boolPtr) // boolPtr: true
  fmt.Println("strVar:", strVar) // strVar: ccc
}
