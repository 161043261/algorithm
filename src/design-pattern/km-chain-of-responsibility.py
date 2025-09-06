from abc import ABC, abstractmethod


class LeaveRequest:
    def __init__(self, name: str, days: int) -> None:
        self.name: str = name
        self.days: int = days

    def getName(self):
        return self.name

    def getDays(self):
        return self.days


class LeaveHandler(ABC):
    @abstractmethod
    def handleRequest(self, request: LeaveRequest) -> None:
        pass


class Supervisor(LeaveHandler):
    maxDaysCanApprove = 3

    def __init__(self, nextHandler: LeaveHandler):
        self.nextHandler: LeaveHandler = nextHandler

    def handleRequest(self, request: LeaveRequest) -> None:
        if request.getDays() <= self.maxDaysCanApprove:
            print(f"{request.getName()} Approved by Supervisor.")
        elif self.nextHandler:
            self.nextHandler.handleRequest(request)
        else:
            print(f"{request.getName()} Denied by Supervisor.")


class Manager(LeaveHandler):
    maxDaysCanApprove = 7

    def __init__(self, nextHandler: LeaveHandler):
        self.nextHandler: LeaveHandler = nextHandler

    def handleRequest(self, request: LeaveRequest) -> None:
        if request.getDays() <= self.maxDaysCanApprove:
            print(f"{request.getName()} Approved by Manager.")
        elif self.nextHandler:
            self.nextHandler.handleRequest(request)
        else:
            print(f"{request.getName()} Denied by Manager.")


class Director(LeaveHandler):
    maxDaysCanApprove = 10

    def handleRequest(self, request: LeaveRequest) -> None:
        if request.getDays() <= self.maxDaysCanApprove:
            print(f"{request.getName()} Approved by Director.")
        else:
            print(f"{request.getName()} Denied by Director.")


director = Director()
manager = Manager(director)
supervisor = Supervisor(manager)

totalCnt = int(input().strip())

for _ in range(totalCnt):
    name, daysStr = input().strip().split(" ")
    days = int(daysStr)
    request = LeaveRequest(name, days)
    supervisor.handleRequest(request)
