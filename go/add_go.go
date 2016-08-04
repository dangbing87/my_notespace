package main

import "fmt"

func Add(x int, c chan int) {
    var sum int
    sum = x + x
    fmt.Printf("%d+%d=%d\n", x, x, sum)
    c <- sum
}

func main() {
    var c chan int
    c = make(chan int)

    for i := 0; i < 10; i++ {
        go Add(i, c)
        go Add(i*2, c)
        _, _ = <-c, <-c
    }
}
