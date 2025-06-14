//go:build httpClient

package main

import (
	"bufio"
	"fmt"
	"net/http"
)

func main() {
	res, err := http.Get("http://localhost:8080/header")
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()

  // Response status: 200 OK
	fmt.Println("Response status:", res.Status)
	scanner := bufio.NewScanner(res.Body)
  // 打印前 5 行
	for i := 0; scanner.Scan() && i < 5; i++ {
		fmt.Println(scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		panic(err)
	}
}
