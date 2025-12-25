//go:build url

package main

import (
	"fmt"
	"net"
	"net/url"
)

func main() {

	dbUrl := "mysql://user:pass@host:3306/db0?k1=v1&k2=v2#hash"

	u, err := url.Parse(dbUrl)
	if err != nil {
		panic(err)
	}

	fmt.Println(u.Scheme) // mysql

	fmt.Println(u.User)            // user:pass
	fmt.Println(u.User.Username()) // user
	p, _ := u.User.Password()
	fmt.Println(p) // pass

	fmt.Println(u.Host) // host:3306
	host, port, _ := net.SplitHostPort(u.Host)
	fmt.Println(host) // host
	fmt.Println(port) // 3306

	fmt.Println(u.Path)     // /db0
	fmt.Println(u.Fragment) // hash

	fmt.Println(u.RawQuery) // k1=v1&k2=v2
	m, _ := url.ParseQuery(u.RawQuery)
	fmt.Println(m) // map[k1:[v1] k2:[v2]]
}
