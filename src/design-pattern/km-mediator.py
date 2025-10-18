from typing import Dict, List, Optional


class ChatRoomMediator:
    def __init__(self) -> None:
        self.name2user: Dict[str, "ChatUser"] = {}

    def forwardMessage(self, senderName: str, message: str):
        for user in self.name2user.values():
            if user.name != senderName:
                user.receiveMessage(senderName, message)

    def addUser(self, user: "ChatUser"):
        self.name2user[user.name] = user


class ChatUser:
    def __init__(self, name: str, mediator: ChatRoomMediator):
        self.name = name
        self.mediator = mediator
        self.messageList: List[str] = []

    def sendMessage(self, message: str):
        self.mediator.forwardMessage(self.name, message)

    def receiveMessage(self, senderName: str, message: str):
        #! feat: Update receivedMessage
        # receivedMessage = f"{self.name} received: {message}"
        receivedMessage = f"{self.name} <--- {message} ---- {senderName}"
        self.messageList.append(receivedMessage)
        print(receivedMessage)


totalCnt = int(input().strip())
usernameList = input().strip().split(" ")
mediator = ChatRoomMediator()

for username in usernameList:
    mediator.addUser(ChatUser(username, mediator))

while True:
    try:
        sender, message = input().strip().split(" ")
        user: Optional[ChatUser] = mediator.name2user.get(sender)
        if user:
            user.sendMessage(message)
    except EOFError as _:
        break
