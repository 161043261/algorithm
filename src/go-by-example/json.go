//go:build json

package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
)

type response1 struct {
	Page   int
	Fruits []string
}

type response2 struct {
	Page   int      `json:"page"`
	Fruits []string `json:"fruits"`
}

func main() {

	boolBytes, _ := json.Marshal(true)
	fmt.Println(string(boolBytes)) // true

	intBytes, _ := json.Marshal(1)
	fmt.Println(string(intBytes)) // 1

	floatBytes, _ := json.Marshal(2.34)
	fmt.Println(string(floatBytes)) // 2.34

	strBytes, _ := json.Marshal("gopher")
	fmt.Println(string(strBytes)) // "gopher"

	aSlice := []string{"apple", "peach", "pear"}
	sliceBytes, _ := json.Marshal(aSlice)
	fmt.Println(string(sliceBytes)) // ["apple","peach","pear"]

	aMap := map[string]int{"apple": 5, "peach": 5, "pear": 3}
	mapBytes, _ := json.Marshal(aMap)
	fmt.Println(string(mapBytes)) // {"apple":5,"peach":5,"pear":3}

	res1 := &response1{
		Page:   1,
		Fruits: []string{"apple", "peach", "pear"}}
	res1Bytes, _ := json.Marshal(res1)
	fmt.Println(string(res1Bytes)) // {"Page":1,"Fruits":["apple","peach","pear"]}

	res2 := &response2{
		Page:   1,
		Fruits: []string{"apple", "peach", "pear"}}
	res2Bytes, _ := json.Marshal(res2)
	fmt.Println(string(res2Bytes)) // {"page":1,"fruits":["apple","peach","pear"]}

	jsonBytes := []byte(`{"num":3.14,"strs":["a","b"]}`)
	var kvs map[string]any
	if err := json.Unmarshal(jsonBytes, &kvs); err != nil {
		panic(err)
	}
	fmt.Println(kvs) // map[num:3.14 strs:[a b]]

	num := kvs["num"].(float64)
	fmt.Println(num) // 3.14

	jsonStr := `{"page":1,"fruits":["apple","peach","pear"]}`
	res3 := response2{}
	json.Unmarshal([]byte(jsonStr), &res3)
	fmt.Println(res3)           // {1 [apple peach pear]}
	fmt.Println(res3.Fruits[0]) // apple

	enc := json.NewEncoder(os.Stdout)
	kvs2 := map[string]int{"apple": 5, "peach": 5, "pear": 3}
	enc.Encode(kvs2) // {"apple":5,"peach":5,"pear":3}

	dec := json.NewDecoder(strings.NewReader(jsonStr))
	res4 := response2{}
	dec.Decode(&res4)
	fmt.Println(res4) // {1 [apple peach pear]}
}
