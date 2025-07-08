//go:build json

package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
)

type res1 struct {
	Page  int
	Names []string
}

type res2 struct {
	Page  int      `json:"page"`
	Names []string `json:"names"`
}

func main() {
	bytes1, _ := json.Marshal(true)
	fmt.Println(string(bytes1)) // true

	bytes2, _ := json.Marshal(1)
	fmt.Println(bytes2) // [49]

	bytes3, _ := json.Marshal(2.34)
	fmt.Println(string(bytes3)) // 2.34

	bytes4, _ := json.Marshal("go")
	fmt.Println(string(bytes4)) // "go"

	bytes5, _ := json.Marshal([]string{"Go", "Java", "JavaScript"})
	fmt.Println(string(bytes5)) // ["Go","Java","JavaScript"]

	bytes6, _ := json.Marshal(map[string]int{"k1": 1, "k2": 2})
	fmt.Println(string(bytes6)) // {"k1":1,"k2":2}

	res1Inst := &res1{
		Page:  1,
		Names: []string{"Alice", "Bob"},
	}
	bytes7, _ := json.Marshal(res1Inst)
	fmt.Println(string(bytes7)) // {"Page":1,"Names":["Alice","Bob"]}

	res2Inst := &res2{
		Page:  1,
		Names: []string{"Alice", "Bob"},
	}
	bytes8, _ := json.Marshal(res2Inst)
	fmt.Println(string(bytes8)) // {"page":1,"names":["Alice","Bob"]}

	jsonStr := `{"num":1.23,"names":["Alice","Bob"]}`
	bytes9 := []byte(jsonStr)
	var emptyMap map[string]any
	if err := json.Unmarshal(bytes9, &emptyMap); err != nil {
		panic(err)
	}
	fmt.Println(emptyMap) // map[names:[Alice Bob] num:1.23]

	anyNameArr := emptyMap["names"].([]any)
	strName := anyNameArr[0].(string)
	fmt.Println(strName) // Alice

	res2EmptyInst := res2{}
	json.Unmarshal([]byte(jsonStr), &res2EmptyInst)
	fmt.Println(res2EmptyInst) // {0 [Alice Bob]}

	encoder := json.NewEncoder(os.Stdout)
	kvs := map[string]int{"k3": 3, "k4": 4}
	encoder.Encode(kvs) // {"k3":3,"k4":4}

	decoder := json.NewDecoder(strings.NewReader(jsonStr))
	res2EmptyInst2 := res2{}
	decoder.Decode(&res2EmptyInst2)
	fmt.Println(res2EmptyInst2) // {0 [Alice Bob]}
}
