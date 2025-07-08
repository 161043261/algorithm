//go:build commandLineSubcommand

package main

import (
	"flag"
	"fmt"
	"os"
)

func main() {
	fooCmd := flag.NewFlagSet("foo", flag.ExitOnError)
	fooEnable := fooCmd.Bool("enable" /* name */, false /* default value */, "Usage: enable" /* usage */)
	fooName := fooCmd.String("name", "defaultName", "Usage: name")

	barCmd := flag.NewFlagSet("bar", flag.ExitOnError)
	barLevel := barCmd.Int("level", 0, "Usage: level")

	if len(os.Args) < 2 {
		fmt.Println("Expect 'foo' or 'bar' subcommand")
		os.Exit(1)
	}

	switch os.Args[1] {
	case "foo":
		fooCmd.Parse(os.Args[2:])
		fmt.Println("subcommand 'foo'")
		fmt.Println("  enable:", *fooEnable)
		fmt.Println("  name:", *fooName)
		fmt.Println("  rest:", fooCmd.Args())

	case "bar":
		fmt.Println("subcommand 'bar'")
		barCmd.Parse(os.Args[2:])
		fmt.Println("  level:", *barLevel)
		fmt.Println("  rest:", barCmd.Args())

	default:
		fmt.Println("Expect 'foo' or 'bar' subcommand")
		os.Exit(1)
	}
}

// ./target/commandLineSubcommand foo -enable -name=whoami a 1
// ./target/commandLineSubcommand foo -enable=true -name whoami a 1
// ./target/commandLineSubcommand bar -level=3 c
// ./target/commandLineSubcommand bar -level 3 c
