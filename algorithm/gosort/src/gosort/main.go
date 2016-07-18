package main

import (
	"algorithms"
	"fmt"
	"os"
)

const ARRAY_LEN = 100000

func main() {
	var sortArray []int = algorithms.GetSlice(ARRAY_LEN)

	if len(os.Args) < 2 {
		algorithms.TestBubbleSort(sortArray, false)
		algorithms.TestInsertionSort(sortArray, false)
		os.Exit(1)
	}

	for i, v := range os.Args {
		if i == 0 {
			continue
		}

		switch v {
		case "bubble":
			algorithms.TestBubbleSort(sortArray, false)
		case "insertion":
			algorithms.TestInsertionSort(sortArray, false)
		default:
			fmt.Println("end")
		}
	}
}
