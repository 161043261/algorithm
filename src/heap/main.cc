#include <utility>  // swap
#include <vector>

using namespace std;

void maxHeapify(vector<int> &nums, int idx, int heapSize) {
  auto childIdx = idx;
  auto left = idx * 2 + 1;
  auto right = idx * 2 + 2;
  if (left < heapSize && nums[left] > nums[childIdx]) {
    childIdx = left;
  }
  if (right < heapSize && nums[right] > nums[childIdx]) {
    childIdx = right;
  }
  if (childIdx != idx) {
    swap(nums[idx], nums[childIdx]);
    maxHeapify(nums, childIdx, heapSize);
  }
}

void minHeapify(vector<int> &nums, int idx, int heapSize) {
  auto childIdx = idx;
  auto left = idx * 2 + 1;
  auto right = idx * 2 + 2;
  if (left < heapSize && nums[left] < nums[childIdx]) {
    childIdx = left;
  }
  if (right < heapSize && nums[right] < nums[childIdx]) {
    childIdx = right;
  }
  if (childIdx != idx) {
    swap(nums[idx], nums[childIdx]);
    minHeapify(nums, childIdx, heapSize);
  }
}

void buildMaxHeap(vector<int> &nums, int heapSize) {
  auto lastLeafIdx = heapSize - 1;
  auto lastNonLeafIdx = (lastLeafIdx - 1) / 2;
  for (auto idx = lastNonLeafIdx; idx >= 0; idx--) {
    maxHeapify(nums, idx, heapSize);
  }
}

void buildMinHeap(vector<int> &nums, int heapSize) {
  auto lastLeafIdx = heapSize - 1;
  auto lastNonLeafIdx = (lastLeafIdx - 1) / 2;
  for (auto idx = lastNonLeafIdx; idx >= 0; idx--) {
    minHeapify(nums, idx, heapSize);
  }
}

class Solution {
 public:
  void sortColors(vector<int> &nums) {
    auto heapSize = static_cast<int>(nums.size());
    buildMaxHeap(nums, heapSize);
    auto targetHeapSize = 0;
    while (heapSize > targetHeapSize) {
      auto lastLeafIdx = heapSize - 1;
      swap(nums[0], nums[lastLeafIdx]);
      heapSize--;
      maxHeapify(nums, 0, heapSize);
    }
  }
};

int main() {
  auto test = Solution{};
  auto nums = vector<int>{2, 0, 2, 1, 1, 0};
  test.sortColors(nums);
}
