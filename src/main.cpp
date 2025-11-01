#include <unordered_set>
#include <vector>

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
  ListNode* modifiedList(vector<int>& nums, ListNode* head) {
    auto numSet = unordered_set<int>(nums.begin(), nums.end());
    auto root = ListNode{0, head};
    auto pre = &root;
    auto cur = root.next;
    while (cur != nullptr) {
      if (numSet.contains(cur->val)) {
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
