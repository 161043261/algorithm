# Algorithm

> [!important]
>
> Algorithms implemented by JS/TS/C++/Golang/Python

Hi，杭天铖同学，

非常感谢你对米哈游校园招聘的关注！

十分感谢你参加米哈游校园招聘【日常实习】前端开发工程师职位的面试。很抱歉经过慎重评估，你暂时不合适当前的岗位需求。

别灰心！我们已将你的简历加入冒险家储备库，并对你的应聘信息严格保密。后续如有合适的岗位开放，我们将第一时间和你联系！

少年的征途是星辰大海，而米哈游一直在路上。期待再见的那天！我们一起完成拯救世界的约定呀！

关注@米哈游招聘 微信公众号，获取更多校园招聘一手信息！

如有任何疑问，请仔细阅读校招官网公告，如仍然没有解决你的问题，请发送邮件至campus@mihoyo.com

米哈游 miHoYo

TECH OTAKUS SAVE THE WORLD

https://campus.mihoyo.com/

## ACM 模式

JS/TS

```ts
import { createInterface } from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineno = 0;

rl.on("line", (line: string) => {
  const [a, b] = line.trim().split(" ");
  console.log(a, b);
  lineno++;

  if (lineno === 3) {
    rl.close();
  }
});
```

Python

```py
a, b = list(map(int, input().split(" ")))
print(a, b)
```

Golang

```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	var a, b str

	fmt.Scan(&a, &b)
	fmt.Scanf("%d %d", &a, &b)

	reader := bufio.NewReader(os.Stdin)
	line, _, _ := reader.ReadLine()
	words := strings.Split(string(line), " ")
	fmt.Println(words)

	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		words := strings.Split(line, " ")
		fmt.Println(words)
	}
}
```

## TODO

- greedy
- dp
