package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	var a int
	var b string

	fmt.Scan(&a, &b)
	fmt.Scanf("%d %d", &a, &b)

	reader := bufio.NewReader(os.Stdin)
	line, _, _ := reader.ReadLine()
	words := strings.Split(string(line), " ")
	fmt.Println(words)

	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		words := strings.Split(line, " ")
		fmt.Println(words)
	}
}
