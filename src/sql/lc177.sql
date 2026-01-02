Create table If Not Exists Employee (Id int, Salary int);

Truncate table Employee;

insert into
  Employee (id, salary)
values
  ('1', '100');

insert into
  Employee (id, salary)
values
  ('2', '200');

insert into
  Employee (id, salary)
values
  ('3', '300');

CREATE FUNCTION getNthHighestSalary (N INT) RETURNS INT BEGIN declare m int;

set
  m = N - 1;

RETURN (
  -- Write your MySQL query statement below.
  select
    ifnull (
      (
        select distinct
          salary
        from
          Employee
        order by
          salary desc
          -- limit <startIndex>, <pageSize>;
          -- limit <pageSize> offset <startIndex>;
        limit
          m, 1
      ),
      null
    )
);

END
