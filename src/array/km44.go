package array

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
)

func Km44() {
	var n, m int
	// fmt.Scan(&n, &m)
	fmt.Scanf("%d %d\n", &n, &m)
	grid := make([][]int, 0)

	scanner := bufio.NewScanner(os.Stdin)
	for range n {
		scanner.Scan()
		line := scanner.Text()
		words := strings.Split(line, " ")
		row := []int{}
		for _, w := range words {
			i, _ := strconv.Atoi(w)
			row = append(row, i)
		}
		grid = append(grid, row)
	}

	xPreSum := make([]int, m+1) // m
	yPreSum := make([]int, n+1) // n
	for x := 1; x <= m; x++ {
		sum := 0
		for y := range n {
			sum += grid[y][x-1]
		}
		xPreSum[x] = xPreSum[x-1] + sum
	}
	for y := 1; y <= n; y++ {
		sum := 0
		for x := range m {
			sum += grid[y-1][x]
		}
		yPreSum[y] = yPreSum[y-1] + sum
	}

	ans := math.MaxInt
	abs := func(a int) int {
		if a < 0 {
			return -a
		}
		return a
	}
	for x := 1; x < m; x++ {
		cur := xPreSum[m] - 2*xPreSum[x]
		ans = min(ans, abs(cur))
	}
	for y := 1; y < n; y++ {
		cur := yPreSum[n] - 2*yPreSum[y]
		ans = min(ans, abs(cur))
	}
	fmt.Println(ans)
}
