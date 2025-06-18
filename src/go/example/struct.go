//go:build struct

package main

import "fmt"

type Person struct {
	Name string // public
	age  int    // private
}

func newPerson(name string) *Person {
	p := Person{Name: name}
	p.age = 23
	return &p
}

func main() {
	fmt.Println(Person{"whoami", 23})            // {whoami 23}
	fmt.Println(Person{Name: "whoami", age: 23}) // {whoami 23}
	fmt.Println(Person{Name: "whoami"})          // {whoami 0}
	fmt.Println(newPerson("whoami"))             // &{whoami 23}

	p := &Person{Name: "whoami", age: 23}
	fmt.Println(p.Name, p.age) // whoami 23

	dog := struct {
		Name   string
		isGood bool
	}{"Inuyasha", true}
	fmt.Println(dog) // {Inuyasha true}
}
