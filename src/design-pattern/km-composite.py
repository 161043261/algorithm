from typing import List


class Component:
    def __init__(self, name: str):
        self.name = name

    def getName(self):
        return self.name

    def display(self, depth: int) -> None:
        raise NotImplementedError()

    def add(self, component: "Component") -> None:
        raise NotImplementedError()

    def remove(self, component: "Component") -> None:
        raise NotImplementedError()


class Department(Component):
    def __init__(self, name: str):
        super().__init__(name)
        self.children: List[Component] = []

    def display(self, depth: int) -> None:
        indent = " " * 2 * depth
        print(f"{indent}{self.name}")

        for child in self.children:
            child.display(depth + 1)

    # Add sub department or employee
    def add(self, component: Component):
        self.children.append(component)


class Employee(Component):
    def __init__(self, name: str):
        super().__init__(name)

    def display(self, depth: int) -> None:
        indent = " " * 2 * depth
        print(f"{indent}{self.name}")


class Company:
    def __init__(self, name: str) -> None:
        self.name = name
        self.root: Department = Department(name)

    def getRoot(self) -> Department:
        return self.root

    def display(self):
        print("Company Structure:")
        print(self.root.getName())

        for child in self.root.children:
            child.display(1)


def getLeadingSpaceCnt(line: str) -> int:
    cnt = 0
    for chr in line:
        if chr == " ":
            cnt += 1
        else:
            break
    return cnt


companyName = input().strip()
# Root department name
company = Company(companyName)

latestCreatedDepartment: Department = company.getRoot()
curParentDepartment: Department = company.getRoot()
departmentStack: List[Department] = [company.getRoot()]

totalCnt = int(input().strip())

for _ in range(totalCnt):
    # Line with leading spaces
    line = input().rstrip()
    leadingSpaceCnt = getLeadingSpaceCnt(line)
    curLevel = leadingSpaceCnt // 2

    itemType, itemName = line.lstrip().split(" ", 1)

    # Current level = 0
    if curLevel == 0:
        # Add top level department
        if itemType == "D":
            department = Department(itemName)
            latestCreatedDepartment = department

            company.getRoot().add(department)

            departmentStack.clear()
            departmentStack.append(company.getRoot())
            departmentStack.append(department)

        elif itemType == "E":
            employee = Employee(itemName)
            latestCreatedDepartment.add(employee)

    # Current level > 0
    else:
        # fix: while curLevel < len(departmentStack) - 2:
        while curLevel < len(departmentStack) - 2:
            departmentStack.pop()

        curParentDepartment = departmentStack[-1]

        # Add sub level department
        if itemType == "D":
            department = Department(itemName)
            latestCreatedDepartment = department

            curParentDepartment.add(department)
            departmentStack.append(department)

        elif itemType == "E":
            employee = Employee(itemName)
            curParentDepartment.add(employee)

company.display()
