package reflect_test

import (
	"fmt"
	"reflect"
	"testing"
)

func TestReflect_reflectType(t *testing.T) {

	reflectType := func(val any) {
		t := reflect.TypeOf(val)
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

func TestReflect_reflectType2(t *testing.T) {

	reflectType := func(val any) {
		v := reflect.ValueOf(val)
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

func TestReflect_reflectSetValue(t *testing.T) {

	reflectSetValue := func(ptr any) {
		v := reflect.ValueOf(ptr)
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

type User struct {
	Name string `json:"name_json" db:"name_db"`
	Age  int    `json:"age_json"  db:"age_db"`
}

// 接收者是指针类型
func (u *User) SetUser(name string, age int) {
	u.Name, u.Age = name, age
}

// 接收者是值类型
func (u User) NewUser(name string, age int) User {
	return User{name, age}
}

func TestReflect_reflectGetFieldAndMethod(t *testing.T) {
	reflectFieldAndMethod := func(val any) {
		t := reflect.TypeOf(val)
		fmt.Println("Type:", t)
		fmt.Println("Type name:", t.Name())

		v := reflect.ValueOf(val)
		fmt.Println("Value:", v)

		fmt.Println("========== Fields ==========")
		for i := range t.NumField() {
			f := t.Field(i)
			fmt.Printf("Name: %s, Type: %v, ", f.Name, f.Type)
			val := v.Field(i).Interface()
			fmt.Println("Value:", val)
		}
		fmt.Println("========== Methods ==========")
		for i := 0; i < t.NumMethod(); i++ {
			m := t.Method(i)
			fmt.Printf("Name: %s, Type: %v\n", m.Name, m.Type)
		}
	}

	u := User{"whoami", 22}
	reflectFieldAndMethod(u)
	// Type: reflect_test.User
	// Type name: User
	// Value: {whoami 22}
	// ========== Fields ==========
	// Name: Name, Type: string, Value: whoami
	// Name: Age, Type: int, Value: 22
	// ========== Methods ==========
	// Name: NewUser, Type: func(reflect_test.User, string, int) reflect_test.User
}

type Man struct {
	User
	gender string
}

func TestReflect_reflectGetEmbed(_t *testing.T) {
	man := Man{User{"whoami", 23}, "male"}
	t := reflect.TypeOf(man)
	fmt.Println(t)

	for i := range t.NumField() {
		fmt.Printf("%#v\n", t.Field(i))
		fmt.Printf("%#v\n", reflect.ValueOf(man).Field(i))
	}
}

func TestReflect_reflectSetField(t *testing.T) {
	reflectSetField := func(ptr any) {
		p := reflect.ValueOf(ptr)
		v := p.Elem()
		f := v.FieldByName("Name")
		if f.Kind() == reflect.String {
			f.SetString("NewName")
		}
	}

	u := User{"whoami", 22}
	reflectSetField(&u)
	fmt.Printf("%+v\n", u) // {Name:NewName Age:23}
}

func TestReflect_reflectCallMethod(t *testing.T) {

	reflectCallMethod := func(val any) User {
		v := reflect.ValueOf(val)
		args := []reflect.Value{reflect.ValueOf("NewName"), reflect.ValueOf(23)}

		m := v.MethodByName("SetUser")
		if m.IsValid() {
			m.Call(args)
		} else {
			fmt.Println("Call `SetUser` failed")
		}

		m2 := v.MethodByName("NewUser")
		if m2.IsValid() {
			rets := m2.Call(args)
			if user, ok := rets[0].Interface().(User); ok {
				return user
			}
		} else {
			fmt.Println("Call `NewUser` failed")
		}
		return User{}
	}

	reflectCallMethod2 := func(ptr any) *User {
		p := reflect.ValueOf(ptr)
		v := p.Elem()
		args := []reflect.Value{reflect.ValueOf("NewName"), reflect.ValueOf(23)}

		m := v.MethodByName("SetUser")
		if m.IsValid() {
			m.Call(args)
		} else {
			fmt.Println("Call `SetUser` failed")
		}

		m2 := v.MethodByName("NewUser")
		if m2.IsValid() {
			rets := m2.Call(args)
			if user, ok := rets[0].Interface().(User); ok {
				return &user
			}
		} else {
			fmt.Println("Call `NewUser` failed")
		}
		return nil
	}

	u := User{"whoami", 22}
	nu := reflectCallMethod(u)
	fmt.Printf("%+v\n", u)  // {Name:whoami Age:22}
	fmt.Printf("%+v\n", nu) // {Name:NewName Age:23}

	u2 := User{"whoami", 22}
	nu2 := reflectCallMethod2(&u)
	fmt.Printf("%+v\n", u2)  // {Name:whoami Age:22}
	fmt.Printf("%+v\n", nu2) // &{Name:NewName Age:23}
}

func TestReflect_reflectTag(_t *testing.T) {
	var u User
	v := reflect.ValueOf(u)
	p := reflect.ValueOf(&u)

	t1 := v.Type()
	t2 := p.Type()

	fmt.Println(t1, t2) // reflect_test.User *reflect_test.User

	for i := range v.NumField() {
		f1 := t1.Field(i)
		f2 := t2.Elem().Field(i)
		fmt.Println("tag `json`:", f1.Tag.Get("json"), f2.Tag.Get("json"))
		fmt.Println("tag `db`:", f1.Tag.Get("db"), f2.Tag.Get("db"))
	}
}
