//go:build textTemplate

package main

import (
	"fmt"
	"os"
	"text/template"
)

func main() {
	t1 := template.New("templateName" /* name */)
	t1, err := t1.Parse("Value is {{.}}\n")

	// t1 :=
	if err != nil {
		panic(err)
	}
	// Value is <template></template>
	t1.Execute(os.Stdout, "<template></template>")
	// Value is [Go Java]
	t1.Execute(os.Stdout, []string{"Go", "Java"})
	// Value is map[key:val]
	t1.Execute(os.Stdout, map[string]string{
		"key": "val",
	})

	t2 := template.Must(t1.Parse("Value2 is not {{.}}\n"))
	// Value2 is not <template></template>
	t2.Execute(os.Stdout, "<template></template>")
	// Value2 is not [Go Java]
	t2.Execute(os.Stdout, []string{"Go", "Java"})
	// Value2 is not map[key:val]
	t2.Execute(os.Stdout, map[string]string{
		"key": "val",
	})

	Create := func(name, t string) *template.Template {
		return template.Must(template.New(name).Parse(t))
	}

	// template.Must(template.New("templateName3").Parse("Username: {{.Name}}\n"))
	t3 := Create("templateName3", "Username: {{.Name}}\n")
	// Username: Alice
	t3.Execute(os.Stdout, struct {
		Name string // 必须是 public
	}{"Alice"})
	// Username: Bob
	t3.Execute(os.Stdout, map[string]string{
		"Name": "Bob",
	})
	// Username:
	t3.Execute(os.Stdout, "NotMatch")

	// Hello World
	t4 := template.Must(template.New("templateName4").Parse("{{.Pre}} {{.Post}}\n"))
	t4.Execute(os.Stdout, struct {
		Post   string // 必须是 public
		Pre    string // 必须是 public
	}{Post: "World", Pre: "Hello"})
  fmt.Println()

	// Hello2 World2
	t4.Execute(os.Stdout, map[string]string{
		"Post": "World2",
		"Pre":  "Hello2",
	})
}
