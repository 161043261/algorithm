package main

import "testing"

// Test command for .//src/agents/2.go:
// cd .//src/agents && go test -run TestSolve2
func TestSolve2(t *testing.T) {
	input := `2
5 3
1 2 3 4 5
1 2
2 4
5 5
4 4
5 -2 5 -2
1 1
1 3
3 3
1 4
`
	want := "14\n10"
	got := Solve2(input)
	if got != want {
		t.Fatalf("Solve2() = %q, want %q", got, want)
	}
}
