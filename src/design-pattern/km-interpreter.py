from abc import ABC, abstractmethod
from typing import List


class Expression(ABC):
    @abstractmethod
    def interpret(self) -> int:
        pass


class OperatorExpression(Expression):
    def __init__(self, operator: str) -> None:
        self.operator: str = operator

    def interpret(self) -> int:
        raise NotImplementedError()

    def getOperator(self) -> str:
        return self.operator


class NumberExpression(Expression):
    def __init__(self, value: str) -> None:
        self.value: int = int(value)

    def interpret(self):
        return self.value


class AddExpression(Expression):
    def __init__(self, left: Expression, right: Expression) -> None:
        self.left: Expression = left
        self.right: Expression = right

    def interpret(self):
        return self.left.interpret() + self.right.interpret()


class MultiplyExpression(Expression):
    def __init__(self, left: Expression, right: Expression) -> None:
        self.left: Expression = left
        self.right: Expression = right

    def interpret(self) -> int:
        return self.left.interpret() * self.right.interpret()


def parseExpression(line: str):
    elements = line.split(" ")
    stack: List[Expression] = []

    for element in elements:
        if element.isdigit():
            stack.append(NumberExpression(element))  # value
        elif element == "+" or element == "*":
            stack.append(OperatorExpression(element))  # operator
        else:
            continue

    while len(stack) > 1:
        right = stack.pop()
        operatorExpr = stack.pop()
        left = stack.pop()

        if isinstance(operatorExpr, OperatorExpression):
            operator = operatorExpr.getOperator()
            if operator == "+":
                stack.append(AddExpression(left, right))
                continue
            if operator == "*":
                stack.append(MultiplyExpression(left, right))

    return str(stack.pop().interpret())


lines: List[str] = []
while True:
    try:
        line = input().strip()
        lines.append(line)
    except EOFError as _:
        break

for i, line in enumerate(lines, start=1):
    res = parseExpression(line)
    print(res)
