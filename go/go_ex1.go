package main

import "fmt"
import "time"

func Count(i int) {
	fmt.Println(i)
}

func main() {
	fmt.Println("start")
	for i := 0; i < 5; i++ {
		go Count(i)
	}

	time.Sleep(time.Millisecond)
	fmt.Println("end")
}
