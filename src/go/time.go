//go:build time

package main

import (
	"fmt"
	"time"
)

func main() {
	print := fmt.Println
	now := time.Now()
	print(now)

	birthday := time.Date(2001, 04, 16, 4, 32, 51, 1 /* nano seconds */, time.UTC)
	print(birthday)

	print(birthday.Year())       // 2001
	print(birthday.Month())      // April
	print(birthday.Day())        // 16
	print(birthday.Hour())       // 4
	print(birthday.Minute())     // 32
	print(birthday.Second())     // 51
	print(birthday.Nanosecond()) // 1
	print(birthday.Location())   // UTC
	print(birthday.Weekday())    // Monday
	print(birthday.Before(now))  // true
	print(birthday.After(now))   // false
	print(birthday.Equal(now))   // false

	diff := now.Sub(birthday)
	print(diff)
	print(diff.Hours())
	print(diff.Minutes())
	print(diff.Seconds())
	print(diff.Nanoseconds())
  print(birthday.Add(diff))
  print(now.Add(-diff))
}
