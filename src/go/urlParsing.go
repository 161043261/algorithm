//go:build urlParsing

package main

import (
	"fmt"
	"net"
	"net/url"
)

func main() {
	rawUrl := "postgres://user:pass@127.0.0.1:5432/path?k=v#hash"

  parsedUrl, err := url.Parse(rawUrl)
  if err != nil {
    panic(err)
  }

  fmt.Println(parsedUrl.Scheme) // postgres
  fmt.Println(parsedUrl.User) // user:pass
  fmt.Println(parsedUrl.User.Username()) // user

  pwd, _ := parsedUrl.User.Password()
  fmt.Println(pwd) // pass

  fmt.Println(parsedUrl.Host) // 127.0.0.1:5432
  host, port, _ := net.SplitHostPort(parsedUrl.Host)
  fmt.Println(host) // 127.0.0.1
  fmt.Println(port) // 5432

  fmt.Println(parsedUrl.Path) // /path
  fmt.Println(parsedUrl.Fragment) // hash

  fmt.Println(parsedUrl.RawQuery) // k=v
  kvs, _ := url.ParseQuery(parsedUrl.RawQuery)
  fmt.Println(kvs) // map[k:[v]]
  fmt.Println(kvs["k"][0]) // v
}
