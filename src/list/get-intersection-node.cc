struct ListNode {
  int val;
  ListNode* next;
  ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
 public:
  ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
    auto aLen = 0;
    auto bLen = 0;
    for (auto curA = headA; curA != nullptr; curA = curA->next, aLen++);
    for (auto curB = headB; curB != nullptr; curB = curB->next, bLen++);
    if (aLen < bLen) {
      auto tmpHead = headA;
      headA = headB;
      headB = tmpHead;

      auto tmpLen = aLen;
      aLen = bLen;
      bLen = tmpLen;
    }
    auto diffLen = aLen - bLen;
    auto curA = headA;
    auto curB = headB;
    for (; diffLen > 0; curA = curA->next, diffLen--);
    for (; curA != nullptr && curA != curB;
         curA = curA->next, curB = curB->next);
    return curA;
  }
};
