//go:build log

package main

import (
	"bytes"
	"fmt"
	"log"
	"os"

	"log/slog"
)

func main() {
	log.Println("standard logger")

	log.SetFlags(log.LstdFlags | log.Lmicroseconds)
	log.Println("with microseconds")

	log.SetFlags(log.LstdFlags | log.Lshortfile)
	log.Println("with filename/lineno")

	myLogger := log.New(os.Stdout, "[my-logger] ", log.LstdFlags)
	myLogger.Println("from my logger")

	myLogger.SetPrefix("[oh-my-logger] ")
	myLogger.Println("from my logger")

	var buf bytes.Buffer
	bufLogger := log.New(&buf, "[buf-logger] ", log.LstdFlags)
	bufLogger.Println("from buf logger")
	fmt.Println("buf:", buf.String())

	jsonHandler := slog.NewJSONHandler(os.Stdout, nil)
	structuredLogger := slog.New(jsonHandler)
	structuredLogger.Info("hello go")
	structuredLogger.Info("hello again", "key", "val", "name", "lark", "age", 23)
}
