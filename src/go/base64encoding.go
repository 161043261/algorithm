//go:build base64encoding

package main

import (
	"encoding/base64"
	"fmt"
)

func main() {
	s := "go:build base64encoding"

	strEncoded := base64.StdEncoding.EncodeToString([]byte(s))
	fmt.Println(strEncoded)

	strDecoded, _ := base64.StdEncoding.DecodeString(strEncoded)
	fmt.Println(string(strDecoded))

	urlEncoded := base64.URLEncoding.EncodeToString([]byte(s))
	fmt.Println(urlEncoded)

	urlDecoded, _ := base64.URLEncoding.DecodeString(urlEncoded)
	fmt.Println(string(urlDecoded))
}
