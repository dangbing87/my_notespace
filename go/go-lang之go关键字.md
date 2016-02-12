> main函数执行(4)引发**堵塞**, 此时挂起**唤醒(2)**
>
> 在(2)执行到(5)引发**堵塞**, 此时挂起**唤醒(3)**
>
> 在(3)执行到(5)引发**堵塞**, 此时挂起**唤醒(2)**
>
> 直至(4)完成,所有协程将close


```
package main

import "fmt"
import "time"

func sheep(i int) int {
	for ; ; i += 2 {
		fmt.Println(i)
		time.Sleep(time.Millisecond)    // (5)
	}
}                                       // (1)

func main() {
	go sheep(1)                         // (2)
	go sheep(2)                         // (3)
	time.Sleep(100 * time.Millisecond)  // (4)
}
```

* 假设(4)(5)为I/O堵塞,即time.Sleep模拟堵塞
* (2)(3)使用**go**修饰调用

