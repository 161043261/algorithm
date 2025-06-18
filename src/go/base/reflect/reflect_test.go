package reflect_test

import (
	"fmt"
	"reflect"
	"testing"
)

func TestReflect1(t *testing.T) {

	reflectType := func(a any) {
		t := reflect.TypeOf(a)
		fmt.Println("t", t)

		k := t.Kind()
		fmt.Println("k", k)

		switch k {
		case reflect.Float64:
			fmt.Println("A float64")
		case reflect.String:
			fmt.Println("A string")
		}
	}

	var x1 float64 = 3.14
	reflectType(x1)

	x2 := "I do not care"
	reflectType(x2)
}

func TestReflect2(t *testing.T) {

	reflectType := func(a any) {
		v := reflect.ValueOf(a)
		fmt.Println("v", v)
		k := v.Kind()
		fmt.Println("k", k)
		switch k {
		case reflect.Float64:
			fmt.Println("a", v.Float())
		case reflect.String:
			fmt.Println("a", v.String())
		}
	}

	var x1 float64 = 3.14
	reflectType(x1)

	x2 := "I do not care"
	reflectType(x2)
}

func TestReflect3(t *testing.T) {

	reflectSetValue := func(a any) {
		v := reflect.ValueOf(a)
		k := v.Kind()
		switch k {
		case reflect.Float64:
			v.SetFloat(5.28)
			fmt.Println("a =", v.Float())
		case reflect.Ptr:
			v.Elem().SetFloat(5.28)
			fmt.Println("*a =", v.Elem().Float()) // *a = 5.28
		}
	}

	var x float64 = 3.14
	reflectSetValue(&x)
	fmt.Println("x =", x) // x = 5.28
}

func TestReflect4(t *testing.T) {

	type User struct {
		Id   int
		Name string
		Age  int
	}

	// TODO Uncompleted
}
