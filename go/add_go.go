package main

import "fmt"

func Add(x, y int) {
	var z int = 0
	z = x + y

	fmt.Println(z)
}

func main() {
	for i := 0; i < 10; i++ {
		go Add(i, i)
	}
}
