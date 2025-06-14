//go:build logging

package main

import (
	"bytes"
	"fmt"
	"log"
	"log/slog"
	"os"
)

func main() {
  log.Println("Standard")

  log.SetFlags(log.LstdFlags | log.Lmicroseconds)
  log.Println("With microsecond")

  log.SetFlags(log.LstdFlags | log.Lshortfile)
  log.Println("With file:lineno")

  myLog := log.New(os.Stdout, "my" /* prefix */,log.LstdFlags /* flag */)
  myLog.Println("From myLog")

  myLog.SetPrefix("ohMy")
  myLog.Println("From myLog")

  buf := bytes.Buffer{}
  bufLog := log.New(&buf, "buf", log.LstdFlags)
  bufLog.Println("content") // 将日志写入 buf 缓冲区
  fmt.Println("From bufLog --", buf.String())

  jsonHandler := slog.NewJSONHandler(os.Stderr, nil)
  mySlog := slog.New(jsonHandler)
  mySlog.Info("From mySlog")
  mySlog.Info("From mySlog", "k1", "v1", "k2", 2)
}
