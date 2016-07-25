package main

import (
	"algorithms"
	"fmt"
	"os"
)

const ArrayLen = 10000

func main() {
	var sortArray []int = algorithms.GetSlice(ArrayLen)
	var displayMode bool = false

	fmt.Println("start...")

	if len(os.Args) < 2 {
		algorithms.TestBubbleSort(sortArray, displayMode)
		algorithms.TestInsertionSort(sortArray, displayMode)
		algorithms.TestMergeSort(sortArray, displayMode)
		os.Exit(1)
	}

	for i, v := range os.Args {
		if i == 0 {
			continue
		}

		switch v {
		case "bubble":
			algorithms.TestBubbleSort(sortArray, displayMode)
		case "insertion":
			algorithms.TestInsertionSort(sortArray, displayMode)
		case "merge":
			algorithms.TestMergeSort(sortArray, displayMode)
		default:
			fmt.Println("end")
		}
	}
}
