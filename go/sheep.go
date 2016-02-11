package main

import "fmt"
import "time"

func sheep(i int) {
	for ; ; i += 2 {
		fmt.Println(i)
	}
}

func main() {
	go sheep(1)
	go sheep(2)

	time.Sleep(time.Millisecond)
}
