interface ListNode {
  next: ListNode | null;
  val: number;
}

function partition(head: ListNode | null, x: number): ListNode | null {
  const lt: ListNode = { next: null, val: 0 };
  let ltt = lt;
  const gt: ListNode = { next: null, val: 0 };
  let gtt = gt;
  for (
    let pre: ListNode | null = null, p = head;
    p !== null;
    pre = p, p = p.next
  ) {
    if (pre) {
      pre.next = null;
    }
    if (p.val < x) {
      ltt.next = p;
      ltt = p;
    } else {
      gtt.next = p;
      gtt = p;
    }
  }
  ltt.next = gt.next;
  gtt.next = null;
  return lt.next;
}
