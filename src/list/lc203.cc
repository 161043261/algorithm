using namespace std;

struct ListNode {
  int val;
  ListNode* next;
  ListNode() : val(0), next(nullptr) {}
  ListNode(int x) : val(x), next(nullptr) {}
  ListNode(int x, ListNode* next) : val(x), next(next) {}
};

class Solution {
 public:
  ListNode* removeElements(ListNode* head, int val) {
    auto root = ListNode{0, head};
    auto pre = &root;
    auto cur = head;
    while (cur != nullptr) {
      if (cur->val == val) {
        pre->next = cur->next;
        cur = pre->next;
      } else {
        pre = cur;
        cur = cur->next;
      }
    }
    return root.next;
  }
};
