package algo_test

import (
	"testing"
	"time"

	"io.github.tianchenghang/algorithm/src/go/algo"
)

func testMany(t *testing.T, c algo.Cache[int]) {
	const (
		k  = 1
		v1 = 2
		v2 = 3
	)
	if c.Len() != 0 {
		t.Error("c.Len() != 0")
	}

	v, ok := c.Get(k)
	if v != nil {
		t.Error("v != nil")
	}

	if ok {
		t.Error("ok == true")
	}

	c.Add(k, v1, time.Now().Add(time.Hour))

	v, ok = c.Get(k)
	if v == nil {
		t.Error("v == nil")
	}

	if !ok {
		t.Error("ok == false")
	}

	if c.Len() != 1 {
		t.Error("c.Len() != 1")
	}

	c.Add(k, v2, time.Now().Add(time.Hour))

	v, ok = c.Get(k)
	if v.(int) != v2 {
		t.Error("v != v2")
	}
	if !ok {
		t.Error("ok == false")
	}
	if c.Len() != 1 {
		t.Error("c.Len() != 1")
	}
}

func TestManyUnlocked(t *testing.T) {
	testMany(t, algo.NewUnlocked[int](10))
}

func TestManyLocked(t *testing.T) {
	testMany(t, algo.NewLocked[int](10))
}

func TestZeroSizeUnlocked(t *testing.T) {
	defer func() {
		if r := recover(); r == nil {
			t.Error("r == nil")
		}
	}()
	_ = algo.NewUnlocked[any](0)
}

func TestZeroSizeLocked(t *testing.T) {
	defer func() {
		if r := recover(); r == nil {
			t.Error("r == nil")
		}
	}()
	_ = algo.NewLocked[any](0)
}

func TestCacheSize(t *testing.T) {
	c := algo.NewUnlocked[int](2)
	deadline := time.Now().Add(time.Hour)
	c.Add(1, 1, deadline)
	c.Add(2, 2, deadline)
	c.Add(3, 3, deadline)
	if c.Len() != 2 {
		t.Error("c.Len() != 2")
	}
	_, ok := c.Get(1)
	if ok {
		t.Error("ok == true")
	}
}

func TestCacheDeadline(t *testing.T) {
	c := algo.NewUnlocked[int](2)
	deadline := time.Now().Add(-time.Hour)
	c.Add(1, 1, deadline)
	if c.Len() != 1 {
		t.Error("c.Len() != 1")
	}
	_, ok := c.Get(1)
	if ok {
		t.Error("ok == true")
	}
	if c.Len() != 0 {
		t.Error("c.Len() != 0")
	}
}
