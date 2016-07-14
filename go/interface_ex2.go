package main

import "fmt"

//泛型实现1
func MyPrint(data interface{}) {
	fmt.Println(data)
}

//泛型实现2
type Array interface {
	Len() int
}

type IntArr []int

func (intArr IntArr) Len() int {
	return len(intArr)
}

type StringArr []string

func (strArr StringArr) Len() int {
	return len(strArr)
}

func PrintArray(data Array) {
	fmt.Println(data)
}

func main() {
	a := IntArr{1, 3, 4, 5, 6}
	b := StringArr{"test one", "test two"}

	PrintArray(a)
	PrintArray(b)

	MyPrint(123)
}
