Create table If Not Exists Employee (id int, salary int);

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

-- Solution
select
  (
    select distinct
      Salary -- as SecondHighestSalary
    from
      Employee
    order by
      Salary desc
    limit
      1
    offset
      1
  ) as SecondHighestSalary;

-- Solution
select
  ifnull(
    (
      select distinct
        Salary
      from
        Employee
      order by
        Salary desc
      limit
        1
      offset
        1
    ),
    null
  ) as SecondHighestSalary;
