//go:build http_client

package main

import (
	"bufio"
	"fmt"
	"net/http"
)

func main() {

	resp, err := http.Get("https://161043261.github.io/")
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Println("response status", resp.Status)

	scanner := bufio.NewScanner(resp.Body)
	for scanner.Scan() {
		fmt.Println(scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		panic(err)
	}
}
