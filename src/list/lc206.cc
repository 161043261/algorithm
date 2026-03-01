struct ListNode {
  int val;
  ListNode* next;
  ListNode() : val(0), next(nullptr) {}
  ListNode(int x) : val(x), next(nullptr) {}
  ListNode(int x, ListNode* next) : val(x), next(next) {}
};

class Solution {
 public:
  ListNode* reverseList(ListNode* head) {
    if (head == nullptr) {
      return head;
    }
    auto root = ListNode{0, nullptr};
    for (auto cur = head, post = head->next; cur != nullptr; cur = post) {
      post = cur->next;
      cur->next = root.next;
      root.next = cur;
    }
    return root.next;
  };
};
