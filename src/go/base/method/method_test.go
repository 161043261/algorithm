package method_test

import (
	"fmt"
	"testing"
)

type User struct {
	Name string
	Age  int
}

type UserWarp struct {
	User // embed
	//! 类似 JavaScript ...User
}

type UserPtrWrap struct {
	*User
}

// ! 接收者是值类型
// ! 调用接收者是值类型的方法时, 会复制调用者
func (u User) GetName() (name string) {
	return u.Name
}

// ! 接收者是指针类型
// ! 当调用者「不可寻址时」, 无法调用接收者是指针类型的方法
func (u *User) GetAge() (age int) {
	return u.Age
}

func TestMethod(t *testing.T) {

	u := User{"user", 22}
	up := &User{
		Name: "userPtr",
		Age:  23,
	}
	uw := UserWarp{u}
	upw := UserPtrWrap{up}

	fmt.Println(u.GetName()) // user
	fmt.Println(u.GetAge())  // 22

	fmt.Println(up.GetName()) // userPtr
	fmt.Println(up.GetAge())  // 23

	fmt.Println(uw.GetName()) // user
	fmt.Println(uw.GetAge())  // 22

	fmt.Println(upw.GetName()) // userPtr
	fmt.Println(upw.GetAge())  // 23
}
