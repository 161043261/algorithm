//go:build http_server

package main

import (
	"fmt"
	"net/http"
	"time"
)

// curl localhost:8080/hello
func hello(w http.ResponseWriter, req *http.Request) {
	ctx := req.Context()
	fmt.Println("[server] hello handler start")
	defer fmt.Println("[server] hello handler end")

	select {
	case <-time.After(5 * time.Second):
		fmt.Fprintf(w, "hello\n")
	case <-ctx.Done():

		err := ctx.Err()
		// [server] context canceled
		fmt.Println("[server]", err)
		clientErr := http.StatusBadRequest
		http.Error(w, err.Error(), clientErr)
	}
}

// curl localhost:8080/headers
func headers(w http.ResponseWriter, req *http.Request) {
	for name, headers := range req.Header {
		for _, header := range headers {
			fmt.Fprintf(w, "%v => %v\n", name, header)
		}
	}
}

func main() {

	http.HandleFunc("/hello", hello)
	http.HandleFunc("/headers", headers)

	http.ListenAndServe(":8080", nil)
}
