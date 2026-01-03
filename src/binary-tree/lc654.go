package binary_tree

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func constructMaximumBinaryTree(nums []int) *TreeNode {
	getMaxIdx := func(l, r int) (ret int) {
		ret = l
		for i := l + 1; i <= r; i++ {
			if nums[i] > nums[ret] {
				ret = i
			}
		}
		return
	}

	var f func(l, r int) *TreeNode

	f = func(l, r int) *TreeNode {
		if l > r {
			return nil
		}
		maxIdx := getMaxIdx(l, r)
		node := &TreeNode{
			Val:   nums[maxIdx],
			Left:  nil,
			Right: nil,
		}
		node.Left = f(l, maxIdx-1)
		node.Right = f(maxIdx+1, r)
		return node
	}

	return f(0, len(nums)-1)
}
