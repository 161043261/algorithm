struct ListNode {
  int val;
  ListNode* next;
  ListNode() : val(0), next(nullptr) {}
  ListNode(int x) : val(x), next(nullptr) {}
  ListNode(int x, ListNode* next) : val(x), next(next) {}
};

class Solution {
 public:
  ListNode* swapPairs(ListNode* head) {
    auto root = ListNode{0, head};
    auto pre = &root;
    auto left = head;
    if (left == nullptr) {
      return head;
    }
    while (left != nullptr && left->next != nullptr) {
      auto right = left->next;
      left->next = right->next;
      pre->next = right;
      right->next = left;

      pre = left;
      left = left->next;
    }
    return root.next;
  }
};
