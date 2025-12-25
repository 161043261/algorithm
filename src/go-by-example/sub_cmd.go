//go:build sub_cmd

package main

import (
	"flag"
	"fmt"
	"os"
)

func main() {

	userCmd := flag.NewFlagSet("user", flag.ExitOnError)
	userAgePtr := userCmd.Int("age", 23, "Your age")
	userNamePtr := userCmd.String("name", "lark", "Your name")

	debugCmd := flag.NewFlagSet("debug", flag.ExitOnError)
	debugVerbosePtr := debugCmd.Bool("verbose", false, "verbose")

	if len(os.Args) < 2 {
		fmt.Println("expect 'user' or 'debug' subcommand")
		os.Exit(1)
	}

	switch os.Args[1] {

	// ./target/sub_cmd user -age=23 -name=lark rest1 rest2
	case "user":
		{
			userCmd.Parse(os.Args[2:])
			fmt.Println("subcommand 'user'")
			fmt.Println("  age", *userAgePtr)
			fmt.Println("  name", *userNamePtr)
			fmt.Println("  rest", userCmd.Args())
		}

	// ./target/sub_cmd debug -verbose rest1 rest2
	case "debug":
		{
			debugCmd.Parse(os.Args[2:])
			fmt.Println("subcommand 'debug'")
			fmt.Println("  verbose", *debugVerbosePtr)
			fmt.Println("  rest", debugCmd.Args())
		}

	default:
		{
			fmt.Println("expect 'user' or 'debug' subcommand")
			os.Exit(1)
		}
	}
}
