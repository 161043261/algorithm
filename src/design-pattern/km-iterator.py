from typing import List


class Student:
    def __init__(self, name: str, studentId: str):
        self.name = name
        self.studentId = studentId

    def getName(self):
        return self.name

    def getStudentId(self):
        return self.studentId


class StudentCollection:
    def __init__(self) -> None:
        self.studentList: List[Student] = []

    def addStudent(self, student: Student):
        self.studentList.append(student)

    def __iter__(self):
        return iter(self.studentList)


studentCollection = StudentCollection()
studentCnt = int(input().strip())

for _ in range(studentCnt):
    name, studentId = input().strip().split(" ")
    student = Student(name, studentId)
    studentCollection.addStudent(student)

for student in studentCollection:
    print(student.getName(), student.getStudentId())
