//go:build httpServer

package main

import (
	"fmt"
	"net/http"
)

func hello(resWriter http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(resWriter, "Hello\n")
}

func header(resWriter http.ResponseWriter, req *http.Request) {
	for name, headers := range req.Header {
		for _, header := range headers {
			fmt.Fprintf(resWriter, "%v: %v\n", name, header)
		}
	}
}

func main() {
	http.HandleFunc("/hello", hello)
	http.HandleFunc("/header", header)
	http.ListenAndServe(":8080", nil)
}

// curl http://localhost:8080/hello
// curl http://localhost:8080/header
// ./target/httpClient
