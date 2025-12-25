//go:build tcp_server

package main

import (
	"bufio"
	"fmt"
	"log"
	"net"
	"strings"
)

// go run ./src/go-by-example/tcp_server.go
// echo "hello go" | nc localhost 8080
func main() {

	listener, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatal("Listen address error", err)
	}

	defer listener.Close()

	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Println("Accept connection error", err)
			continue
		}

		go handleConnection(conn)
	}
}

func handleConnection(conn net.Conn) {

	defer conn.Close()

	reader := bufio.NewReader(conn)
	message, err := reader.ReadString('\n')
	if err != nil {
		log.Println("Connection read error", err)
		return
	}

	echoMsg := strings.ToUpper(strings.TrimSpace(message))
	response := fmt.Sprintf("Echo: %s\n", echoMsg)
	_, err = conn.Write([]byte(response))
	if err != nil {
		log.Println("Connection write error", err)
	}
}
