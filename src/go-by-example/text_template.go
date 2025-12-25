//go:build text_template

package main

import (
	"os"
	"text/template"
)

func main() {

	t1 := template.New("t1")
	t1, err := t1.Parse("Value {{.}}\n")
	if err != nil {
		panic(err)
	}
	t1 = template.Must(t1.Parse("Value {{.}}\n"))

	t1.Execute(os.Stdout, "slot") // Value slot
	t1.Execute(os.Stdout, 5)      // Value 5
	t1.Execute(os.Stdout, []string{
		"Go",
		"JavaScript",
		"TypeScript",
		"C++",
		"Python",
	}) // Value [Go JavaScript TypeScript C++ Python]

	createTemplate := func(name, t string) *template.Template {
		return template.Must(template.New(name).Parse(t))
	}

	t2 := createTemplate("t2", "name {{.Name}}\n")
	t2.Execute(os.Stdout, struct {
		Name string // Must public
	}{"lark"}) // name lark
	t2.Execute(os.Stdout, map[string]string{
		"Name": "lark2",
	}) // name lark2

	t3 := createTemplate("t3",
		"if-else-end {{if . -}} Yes {{else -}} No {{end}}\n")
	t3.Execute(os.Stdout, "Not empty") // if-else-end Yes
	t3.Execute(os.Stdout, "")          // if-else-end No

	t4 := createTemplate("t4",
		"range-end {{range .}}{{.}} {{end}}\n")
	t4.Execute(os.Stdout,
		[]string{
			"Go",
			"JavaScript",
			"TypeScript",
			"C++",
			"Python",
		}) // range-end Go JavaScript TypeScript C++ Python
}
