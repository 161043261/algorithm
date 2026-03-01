struct MyNode {
  int val;
  MyNode* next;
  MyNode() : val(0), next(nullptr) {}
  MyNode(int val, MyNode* next) : val(val), next(next) {}
};

class MyLinkedList {
 public:
  MyNode* root;
  MyNode* head;
  MyNode* tail;
  MyLinkedList() : root(new MyNode{0, nullptr}), head(nullptr), tail(nullptr) {}

  // Functions that differ only in their return type cannot be overloaded
  MyNode* getPtr(int index) {
    if (index == -1) {
      return root;
    }
    auto cur = head;
    for (auto i = 0; i < index; i++) {
      if (cur == nullptr) {
        return nullptr;
      }
      cur = cur->next;
    }
    return cur;
  }

  int get(int index) {
    if (index < 0) {
      return -1;
    }
    auto ptr = getPtr(index);
    return ptr == nullptr ? -1 : ptr->val;
  }

  void addAtHead(int val) {
    auto newNode = new MyNode{val, head};
    root->next = newNode;
    head = newNode;
    if (head->next == nullptr) {
      tail = head;
    }
  }

  void addAtTail(int val) {
    auto newNode = new MyNode{val, nullptr};
    if (tail == nullptr) {
      root->next = newNode;
      head = newNode;
      tail = newNode;
    } else {
      tail->next = newNode;
      tail = newNode;
    }
  }

  void addAtIndex(int index, int val) {
    auto pre = getPtr(index - 1);
    if (pre == nullptr) {
      return;
    }
    auto newNode = new MyNode{val, pre->next};
    if (pre == root) {
      root->next = newNode;
      head = newNode;
      if (head->next == nullptr) {
        tail = head;
      }
      return;
    }
    if (pre == tail) {
      tail->next = newNode;
      tail = newNode;
      return;
    }
    pre->next = newNode;
  }

  void deleteAtIndex(int index) {
    auto pre = getPtr(index - 1);
    if (pre == nullptr) {
      return;
    }
    auto cur = pre->next;
    if (cur == nullptr) {
      return;
    }
    if (cur == head && cur == tail) {
      root->next = nullptr;
      head = nullptr;
      tail = nullptr;
      delete cur;
      return;
    }
    if (cur == head) {
      root->next = head->next;
      head = root->next;
      delete cur;
      return;
    }
    if (cur == tail) {
      pre->next = nullptr;
      tail = pre;
      delete cur;
      return;
    }
    pre->next = pre->next->next;
    delete cur;
  }
};
