struct ListNode {
  int val;
  ListNode* next;
  ListNode() : val(0), next(nullptr) {}
  ListNode(int x) : val(x), next(nullptr) {}
  ListNode(int x, ListNode* next) : val(x), next(next) {}
};

class Solution {
 public:
  ListNode* removeNthFromEnd(ListNode* head, int n) {
    auto root = ListNode{0, head};
    auto pre = &root;
    auto cur = &root;
    for (auto diff = 0; diff < n; diff++) {
      cur = cur->next;
    }
    while (cur->next != nullptr) {
      pre = pre->next;
      cur = cur->next;
    }
    auto tmp = pre->next;
    pre->next = tmp->next;
    delete tmp;
    return root.next;
  }
};
