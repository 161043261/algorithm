from typing import Callable, List

dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]

turn_left: Callable[[int], int] = lambda x: (x + 3) % 4
turn_right: Callable[[int], int] = lambda x: (x + 1) % 4


class Solution:
    def robotSim(self, commands: List[int], obstacles: List[List[int]]) -> int:
        obstacle_set = set(map(tuple, obstacles))

        x, y, dir_idx, ans = 0, 0, 0, 0

        for command in commands:
            if command == -1:
                dir_idx = turn_right(dir_idx)
            elif command == -2:
                dir_idx = turn_left(dir_idx)
            else:
                while (
                    command > 0
                    and (x + dirs[dir_idx][0], y + dirs[dir_idx][1]) not in obstacle_set
                ):
                    x += dirs[dir_idx][0]
                    y += dirs[dir_idx][1]
                    command -= 1
                ans = max(ans, x * x + y * y)

        return ans

class Robot:

    def __init__(self, width: int, height: int):
        self.grid = [[0] * width for _ in range(height)]


    def step(self, num: int) -> None:


    def getPos(self) -> List[int]:


    def getDir(self) -> str:



# Your Robot object will be instantiated and called as such:
# obj = Robot(width, height)
# obj.step(num)
# param_2 = obj.getPos()
# param_3 = obj.getDir()
