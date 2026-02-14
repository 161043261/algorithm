struct ListNode {
  int val;
  ListNode* next;
  ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
 public:
  ListNode* detectCycle(ListNode* head) {
    if (head == nullptr) {
      return nullptr;
    }
    auto root = ListNode{0};
    root.next = head;
    auto s = &root;
    auto f = &root;
    while (f == &root || (s != f && f != nullptr)) {
      s = s->next;
      f = f->next;
      if (f != nullptr) {
        f = f->next;
      }
    }
    if (f == nullptr) {
      return nullptr;
    }
    for (auto p = &root; p != s; p = p->next, s = s->next);
    return s;
  }
};
