package main

import "fmt"

type InterfaceA interface {
	Test()
}

type A string
type B string

func (a A) Test() {
	fmt.Println("test interface is A")
}

func (b B) Test() {
	fmt.Println("test interface is B")
}

func main() {
	var testA A = "A"
	var testB B = "B"
	var testG InterfaceA = &testA

	testG.Test()
	testG = &testB
	testG.Test()
}
