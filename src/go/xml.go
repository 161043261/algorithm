//go:build xml

package main

import (
	"encoding/xml"
	"fmt"
)

type Plant struct {
	XMLName xml.Name `xml:"plant"`
	Id      int      `xml:"id,attr"`
	Name    string   `xml:"name"`
	Origin  []string `xml:"origin"`
}

func (ctx Plant) String() string {
	return fmt.Sprintf("Plant id=%v, name=%v, origin=%v", ctx.Id, ctx.Name, ctx.Origin)
}

func main() {
	coffee := &Plant{Id: 27, Name: "Coffee"}
	coffee.Origin = []string{"Japan", "Brazil"}
	bytes1, _ := xml.MarshalIndent(coffee, " " /* prefix */, "  " /* indent */)
	fmt.Println(string(bytes1))
	fmt.Println(xml.Header + string(bytes1))

	var emptyPlant Plant
	if err := xml.Unmarshal(bytes1, &emptyPlant); err != nil {
		panic(err)
	}
	fmt.Println(emptyPlant)

	tomato := &Plant{Id: 81, Name: "Tomato"}
	tomato.Origin = []string{"Mexico", "California"}

	type Html struct {
		XMLName xml.Name `xml:"html"`
		Plants  []*Plant `xml:"body>div>plant"`
	}

	nest := &Html{}
	nest.Plants = []*Plant{coffee, tomato}
	bytes2, _ := xml.MarshalIndent(nest, " ", "  ")
	fmt.Println(string(bytes2))
}
