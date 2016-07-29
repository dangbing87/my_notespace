package algorithms

import (
	"fmt"
	"math/rand"
	"time"
)

func GetSlice(sliceLength int) []int {
	/*
		返回指定长度的slice
		并为每个元素随机赋一个0-n以内的值
	*/
	var random *rand.Rand = rand.New(rand.NewSource(time.Now().UnixNano()))
	var a []int = make([]int, sliceLength)

	for i, _ := range a {
		a[i] = random.Intn(sliceLength)
	}

	return a
}

func BubbleSort(a []int) {
	for i, va := range a {
		for j, vb := range a {
			if va < vb {
				a[i], a[j] = a[j], a[i]
			}
		}
	}
}

func TestBubbleSort(a []int, displaySlice bool) {
	var t1, t2 time.Time
	var tmpArray []int = make([]int, len(a))

	copy(tmpArray, a)

	if displaySlice {
		fmt.Println(tmpArray)
	}

	t1 = time.Now()
	BubbleSort(tmpArray)
	t2 = time.Now()

	if displaySlice {
		fmt.Println(tmpArray)
	}

	fmt.Println("bubble sort:", t2.Sub(t1))
}

func InsertionSort(a []int) {
	var i, j, tmp, arrayLength int

	arrayLength = len(a)

	for j = 1; j < arrayLength; j++ {
		tmp = a[j]

		for i = j - 1; i >= 0 && a[i] > tmp; i-- {
			a[i+1] = a[i]
		}
		a[i+1] = tmp
	}
}

func TestInsertionSort(a []int, displaySlice bool) {
	var t1, t2 time.Time
	var tmpArray []int = make([]int, len(a))

	copy(tmpArray, a)

	if displaySlice {
		fmt.Println(tmpArray)
	}

	t1 = time.Now()
	InsertionSort(tmpArray)
	t2 = time.Now()

	if displaySlice {
		fmt.Println(tmpArray)
	}

	fmt.Println("insertion sort:", t2.Sub(t1))
}

func MergeSort(a []int) []int {
	var left, right []int
	var middle int = len(a) / 2

	if len(a) <= 1 {
		return a
	}

	left = make([]int, 0)
	right = make([]int, 0)

	left = append(a[0:middle])
	right = append(a[middle:])

	left = MergeSort(left)
	right = MergeSort(right)
	return Merge(left, right)
}

func Merge(left, right []int) []int {
	var results []int = make([]int, 0)

	for len(left) > 0 || len(right) > 0 {
		if len(left) > 0 && len(right) > 0 {
			if left[0] <= right[0] {
				results = append(results, left[0])
				left = left[1:len(left)]
			} else {
				results = append(results, right[0])
				right = right[1:len(right)]
			}
		} else if len(left) > 0 {
			results = append(results, left[0])
			left = left[1:len(left)]
		} else if len(right) > 0 {
			results = append(results, right[0])
			right = right[1:len(right)]
		}
	}

	return results
}

func TestMergeSort(a []int, displaySlice bool) {
	var tmpArray []int = make([]int, len(a))
	var startTime, endTime time.Time

	copy(tmpArray, a)

	if displaySlice {
		fmt.Println(tmpArray)
	}

	startTime = time.Now()
	tmpArray = MergeSort(tmpArray)
	endTime = time.Now()

	if displaySlice {
		fmt.Println(tmpArray)
	}

	fmt.Println("merge sort:", endTime.Sub(startTime))
}
