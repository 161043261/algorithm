package utils_test

import (
	"fmt"
	"testing"

	"github.com/161043261/algorithm/src/go-by-example/utils"
)

func TestMinInt(t *testing.T) {
	ans := utils.MinInt(2, -2)
	if ans != -2 {
		t.Errorf("MinInt(2, -2) = %d; want -2", ans)
	}
}

func TestMinInt2(t *testing.T) {
	var tests = []struct {
		a, b int
		want int
	}{
		{0, 1, 0},
		{1, 0, 0},
		{0, -1, -1},
		{-1, 0, -1},
		{2, -2, -2},
		{-2, 2, -2},
	}

	for _, test := range tests {
		testName := fmt.Sprintf("%d,%d", test.a, test.b)
		t.Run(testName, func(t *testing.T) {
			ans := utils.MinInt(test.a, test.b)
			if ans != test.want {
				t.Errorf("MinInt(%d, %d) = %d; want %d", test.a, test.b, ans, test.want)
			}
		})
	}
}

func BenchmarkMinInt(b *testing.B) {
	for b.Loop() {
		utils.MinInt(2, -2)
	}
}
