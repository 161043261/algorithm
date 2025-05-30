package main

type ListNode struct {
	Val  int
	Next *ListNode
}

func reverseBetween(head *ListNode, left int, right int) *ListNode {
	if left+1 >= right {
		return head
	}

  head = &ListNode{0, head};

	var l, r *ListNode
	for i, p := 0, head; ; i, p = i+1, p.Next {
		if i == left {
			l = p
		}
		if i == right {
			r = p
      break
		}
	}

    // fmt.Println(l.Val)
    // fmt.Println(r.Val)

	p := l.Next

	l.Next = r

	for p != r {
		newP := p.Next
		p.Next = l.Next
		l.Next = p
		p = newP
	}
	return head
}
