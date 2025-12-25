//go:build cmd_flag

package main

import (
	"flag"
	"fmt"
)

func main() {
	namePtr := flag.String("name", "lark", "Your name")
	agePtr := flag.Int("age", 23, "Your age")
	verbosePtr := flag.Bool("verbose", false, "verbose")

	var email string
	flag.StringVar(&email, "email", "161043261@qq.com", "Your email")

	flag.Parse()

	fmt.Println("name", *namePtr)
	fmt.Println("age", *agePtr)
	fmt.Println("verbose", *verbosePtr)
	fmt.Println("email", email)
	fmt.Println("rest", flag.Args())
}
