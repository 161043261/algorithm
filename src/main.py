from typing import Dict, List, Tuple
from heapq import heapify, heappush, heappop


class TaskManager:
    def __init__(self, tasks: List[List[int]]):
        self.mp: Dict[int, Tuple[int, int]] = {
            taskId: (priority, userId) for userId, taskId, priority in tasks
        }

        self.h: List[Tuple[int, int, int]] = [
            (-priority, -taskId, userId) for userId, taskId, priority in tasks
        ]

        heapify(self.h)

    def add(self, userId: int, taskId: int, priority: int) -> None:
        self.mp[taskId] = (priority, userId)
        heappush(self.h, (-priority, -taskId, userId))

    def edit(self, taskId: int, newPriority: int) -> None:
        userId = self.mp[taskId][1]
        self.add(userId, taskId, newPriority)

    def rmv(self, taskId: int) -> None:
        self.mp[taskId] = (-1, -1)

    def execTop(self) -> int:
        while len(self.h) > 0:
            negPriority, negTaskId, userId = heappop(self.h)
            priority, userId2 = self.mp[-negTaskId]
            if -negPriority == priority and userId == userId2:
                self.rmv(-negTaskId)
                return userId

        return -1
