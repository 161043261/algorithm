//go:build timeFormattingAndParsing

package main

import (
	"fmt"
	"time"
)

func main() {
	print := fmt.Println
	now := time.Now()
	print(now.Format(time.RFC3339))

	t1, _ := time.Parse(time.RFC3339, "2001-04-16T04:32:51+00:00")
  print(t1)

	print(t1.Format("3:04PM"))
	print(t1.Format("Mon Jan _2 15:04:05 2006"))
	print(t1.Format("2006-01-02T15:04:05.999999-07:00"))

	t2, _ := time.Parse("3 04 PM", "4 32 AM")
	print(t2)

	fmt.Printf("%d-%02d-%02dT%02d:%02d:%02d\n",
		now.Year(), now.Month(), now.Day(),
		now.Hour(), now.Minute(), now.Second())

	layout := "Mon Jan _2 15:04:05 2006"
	_, err := time.Parse(layout, "4:32AM")
	print(err)
}
