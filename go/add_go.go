package main

import "fmt"
import "time"

func Add(x, y int) {
	var z int = 0
	z = x + y
	go fmt.Println(z)
	time.Sleep(time.Millisecond)
}

func main() {
	for i := 0; i < 10; i++ {
		Add(i, i)
		// go Add(i, i)
	}
}
