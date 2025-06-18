package main_test

import (
	"fmt"
	"testing"
)

func minInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func TestMinInt(t *testing.T) {
	ans := minInt(1, 2)
	if ans != 1 {
		t.Errorf("minInt(1, 2) = %d; expect 1", ans)
	}
}

func TestMinInt2(t *testing.T) {
	tests := []struct {
		a, b   int
		expect int
	}{
		{0, 1, 0},
		{1, 0, 0},
	}

	for _, tt := range tests {
		testName := fmt.Sprintf("minInt(%d, %d)", tt.a, tt.b)
		t.Run(testName, func(t *testing.T) {
			ans := minInt(tt.a, tt.b)
			if ans != tt.expect {
				t.Errorf("minInt(%d, %d) = %d; expect %d", tt.a, tt.b, ans, tt.expect)
			}
		})
	}
}

func BenchmarkMinInt(b *testing.B) {
	for b.Loop() {
		minInt(1, 2)
	}
}

// go test -v
