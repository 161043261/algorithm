//go:build context

package main

import (
	"fmt"
	"net/http"
	"time"
)

func hello(resWriter http.ResponseWriter, req *http.Request) {
  ctx := req.Context()
  fmt.Println("server: Hello handler start")
  defer fmt.Println("server: Hello handler end")

  select {
  case <- time.After(10 * time.Second):
    fmt.Fprintf(resWriter, "Hello\n")
  case <- ctx.Done():
    err := ctx.Err()
    fmt.Println("server:", err)
    http.Error(resWriter, err.Error(), http.StatusInternalServerError)
  }
}

func main() {
  http.HandleFunc("/hello", hello)
  http.ListenAndServe(":8080", nil)
}

// curl http://localhost:8080/hello
