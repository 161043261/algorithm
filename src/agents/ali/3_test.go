package main

import "testing"

// Test command for .//src/agents/3.go:
// cd .//src/agents && go test -run TestSolve3
func TestSolve3(t *testing.T) {
	input := `4
1
7
3
1 2 1
2
1 1
5
1 2 3 2 1
`
	want := "1\n2\n1\n3"
	got := Solve3(input)
	if got != want {
		t.Fatalf("Solve3() = %q, want %q", got, want)
	}
}
