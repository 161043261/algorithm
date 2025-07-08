package algo_test

import (
	"testing"
	"time"

	"io.github.tianchenghang/algorithm/src/go/algo"
)

func TestManyLocalCache(t *testing.T) {
	c := algo.NewLocalCache[int](10)

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

	c.AddWithDeadline(k, v1, time.Now().Add(time.Hour))
	v, ok = c.Get(k)
	if v.(int) == 0 {
		t.Error("v == 0")
	}
	if !ok {
		t.Error("ok == false")
	}

	if c.Len() != 1 {
		t.Error("c.Len() != 1")
	}

	c.AddWithDeadline(k, v2, time.Now().Add(time.Hour))
	v, ok = c.Get(k)
	if v != v2 {
		t.Error("v != v2")
	}
	if !ok {
		t.Error("ok == false")
	}
	if c.Len() != 1 {
		t.Error("c.Len() != 1")
	}
}

func TestZeroSizeLocalCache(t *testing.T) {
	defer func() {
		if r := recover(); r == nil {
			t.Error("r == nil")
		}
	}()

	_ = algo.NewLocalCache[struct{}](0)
}

func TestLocalCacheSize(t *testing.T) {
	c := algo.NewLocalCache[int](2)
	deadline := time.Now().Add(time.Hour)
	c.AddWithDeadline(1, 1, deadline)
	c.AddWithDeadline(2, 2, deadline)
	c.AddWithDeadline(3, 3, deadline)
	if c.Len() != 2 {
		t.Error("c.Len() != 2")
	}
	_, ok := c.Get(1)
	if ok {
		t.Error("ok == true")
	}
}

func TestLocalCacheDeadline(t *testing.T) {
	c := algo.NewLocalCache[int](2)
	deadline := time.Now().Add(-time.Hour)
	c.AddWithDeadline(1, 1, deadline)
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
