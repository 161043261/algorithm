from typing import List


class Memento:
    def __init__(self, value: int):
        self.value = value

    def getValue(self):
        return self.value


class Counter:
    def __init__(self) -> None:
        self.value: int = 0
        self.undoStack: List[Memento] = []
        self.redoStack: List[Memento] = []

    def increment(self):
        self.redoStack = []
        self.undoStack.append(Memento(self.value))
        self.value += 1

    def decrement(self):
        self.redoStack = []
        self.undoStack.append(Memento(self.value))
        self.value -= 1

    def undo(self):
        if len(self.undoStack):
            self.redoStack.append(Memento(self.value))
            self.value = self.undoStack.pop().getValue()

    def redo(self):
        if len(self.redoStack):
            self.undoStack.append(Memento(self.value))
            self.value = self.redoStack.pop().getValue()

    def getValue(self):
        return self.value


counter = Counter()
while True:
    try:
        operation = input().strip()
        if operation == "Increment":
            counter.increment()
        elif operation == "Decrement":
            counter.decrement()
        elif operation == "Undo":
            counter.undo()
        elif operation == "Redo":
            counter.redo()
        else:
            continue

        print(counter.getValue())
    except EOFError as _:
        break
