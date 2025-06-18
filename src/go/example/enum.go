//go:build enum

package main

import "fmt"

type ServerState int

const (
	StateIdle ServerState = iota
	StateConnected
	StateError
	StateRetrying
)

var stateName = map[ServerState]string{
	StateIdle:      "idle",
	StateConnected: "connected",
	StateError:     "error",
	StateRetrying:  "retrying",
}

func (ctx ServerState) ToString() string {
	return stateName[ctx]
}

func transition(ctx ServerState) ServerState {
	switch ctx {
	case StateIdle:
		return StateConnected
	case StateConnected, StateRetrying:
		return StateIdle
	case StateError:
		return StateError
	default:
		panic(fmt.Errorf("Unknown state: %s\n", ctx))
	}
}

func main() {
	nextState := transition(StateIdle)
	fmt.Println(nextState)

	nextState2 := transition(nextState)
	fmt.Println(nextState2)
}
