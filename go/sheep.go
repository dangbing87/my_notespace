package main

import "fmt"
import "time"

func sheep(i int) int {
	for ; ; i += 2 {
		fmt.Println(i)
		time.Sleep(time.Millisecond)
	}
}

func main() {
	fmt.Println("start")
	go sheep(1)
	fmt.Println("*****")
	go sheep(2)
	time.Sleep(100 * time.Millisecond)
	fmt.Println("End")
}
