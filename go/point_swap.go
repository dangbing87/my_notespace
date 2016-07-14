package main

import (
	"fmt"
	"math/rand"
	"time"
)

func Swap(a *int, b *int) {
	var tmp int
	tmp = *a
	*a = *b
	*b = tmp
}

func main() {
	var a, b int = 1, 2
	var rnd *rand.Rand = rand.New(rand.NewSource(time.Now().UnixNano()))

	fmt.Println(a, b)
	Swap(&a, &b)
	fmt.Println(a, b)
	fmt.Println(rnd.Intn(100))
}
