package main

import (
	"algorithms"
)

const ARRAY_LEN = 100000

func main() {
	var sortArray []int = algorithms.GetSlice(ARRAY_LEN)

	algorithms.TestBubbleSort(sortArray, false)
	algorithms.TestInsertionSort(sortArray, false)
}
