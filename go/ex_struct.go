package main

import "fmt"

type Rect struct {
	Width, Height float32
}

func (r *Rect) Area() float32 {
	return r.Width * r.Height
}

type MyRect struct {
	Rect
}

func (r *MyRect) SetRect(Width float32, Height float32) {
	r.Width = Width
	r.Height = Height
}

func main() {
	rect1 := &Rect{32, 34}
	rect2 := new(MyRect)

	rect1Area := rect1.Area()

	rect2.SetRect(12, 12)
	rect2Area := rect2.Area()

	fmt.Println(rect1Area, rect2Area)
}
