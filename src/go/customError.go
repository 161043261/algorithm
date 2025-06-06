//go:build customError

package main

import (
	"errors"
	"fmt"
)

type argErr struct {
	arg int
	msg string
}

type paramErr[T any] struct {
	param T
	msg   string
}

// 为 *argErr 添加 Error 方法
// 则 *argErr 实现 error 接口
func (ctx *argErr) Error() string {
	return fmt.Sprintf("%d-%s", ctx.arg, ctx.msg)
}

// 为 paramErr[T] 添加 Error 方法
// 则 paramErr[T] 实现 error 接口
func (ctx paramErr[T]) Error() string {
	return fmt.Sprintf("%v-%s", ctx.param, ctx.msg)
}

func fn(arg int) (int, error) {
	if arg == 42 {
		return -1, &argErr{arg, "arg=42"}
	}
	return arg + 3, nil
}

func fn2(arg string) (string, error) {
	if arg == "Java" {
		return "", paramErr[string]{arg, "arg=Java"}
	}
	return arg + "Script", nil
}

func main() {
	_, err := fn(42)
	var argErrPtr *argErr
	if errors.As(err, &argErrPtr) {
		// Matched err: 42 arg=42 42-arg=42
		fmt.Println("Matched err:", argErrPtr.arg /* 42 */, argErrPtr.msg /* arg=42 */, err.Error() /* 42-arg=42 */)
	} else {
		fmt.Println("NOT matched err:", argErrPtr.arg, argErrPtr.msg, err.Error())
	}

	_, err2 := fn2("Java")
	var paramErrInst paramErr[string]
	if errors.As(err2, &paramErrInst) {
		fmt.Println("Matched err", paramErrInst.param /* Java */, paramErrInst.msg /* arg=Java */, err2.Error() /* Java-arg=Java */)
	} else {
		fmt.Println("NOT matched err", paramErrInst.param, paramErrInst.msg, err2.Error())
	}
}
