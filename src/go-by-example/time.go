//go:build time

package main

import (
	"fmt"
	"time"
)

func main() {
	p := fmt.Println
	now := time.Now()
	p(now)

	t := time.Date(
		1970, // year
		1,    // month
		1,    //day
		0,    // hour
		0,    // minute
		0,    // second
		0,    // nanosecond
		time.UTC)
	p(t)

	p(t.Year())       // 1970
	p(t.Month())      // January
	p(t.Day())        // 1
	p(t.Hour())       // 0
	p(t.Minute())     // 0
	p(t.Second())     // 0
	p(t.Nanosecond()) // 0
	p(t.Location())   // UTC

	p(t.Weekday()) // Thursday

	p(t.Before(now)) // true
	p(t.After(now))  // false
	p(t.Equal(now))  // false

	diff := now.Sub(t)
	p(diff)

	p(diff.Hours())
	p(diff.Minutes())
	p(diff.Seconds())
	p(diff.Nanoseconds())

	p(t.Add(diff))
	p(now.Add(-diff))

	p(now.Unix())
	p(now.UnixMilli())
	p(now.UnixNano())
	p(diff.Nanoseconds() == now.UnixNano()) // true

	p(time.Unix(now.Unix(), // second
		0, // nanosecond
	))
	p(time.Unix(0, // second
		now.UnixNano(), // nanosecond
	))

	p(t.Format(time.RFC3339))
}
