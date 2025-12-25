//go:build sha256_base64

package main

import (
	"crypto/sha256"
	b64 "encoding/base64"
	"fmt"
)

func main() {
	str := "abc123~!@#$%^&*()-=_+,./<>?"

	hash := sha256.New()

	hash.Write([]byte(str))

	resBytes := hash.Sum(nil)

	fmt.Println(str)
	fmt.Printf("%x\n", resBytes)

	byteSlice := []byte(str)
	encodedStr := b64.StdEncoding.EncodeToString(byteSlice)
	fmt.Println(encodedStr)

	decodedStr, _ := b64.StdEncoding.DecodeString(encodedStr)
	fmt.Println(string(decodedStr))

	urlEncodedStr := b64.URLEncoding.EncodeToString(byteSlice)
	fmt.Println(urlEncodedStr)

	urlDecodedStr, _ := b64.URLEncoding.DecodeString(urlEncodedStr)
	fmt.Println(string(urlDecodedStr))
}
