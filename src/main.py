class Solution:
    def maxBottlesDrunk(self, numBottles: int, numExchange: int) -> int:
        emptyBottles = 0
        drunkBottles = 0
        while numBottles > 0 or emptyBottles >= numExchange:
            if numBottles > 0:
                emptyBottles += numBottles
                drunkBottles += numBottles
                numBottles = 0

            if emptyBottles >= numExchange:
                emptyBottles = emptyBottles - numExchange
                numExchange += 1
                numBottles += 1

        return drunkBottles
