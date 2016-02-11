package main

import "fmt"
import "time"

func say(word string) {
	for i := 0; i < 5; i++ {
		fmt.Println(word)
		time.Sleep(100 * time.Millisecond)
	}
}

func main() {
	go say("hello")
	// go say("world")
}
