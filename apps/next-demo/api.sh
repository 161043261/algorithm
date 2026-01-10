curl -X GET "http://localhost:3000/api/user?name=lark&age=23"

curl -X POST 'http://localhost:3000/api/user' \
  -H 'Content-Type: application/json' \
  -d '{ "name": "lark", "age": 23 }'

curl -X GET "http://localhost:3000/api/user/406"

curl -X GET "http://localhost:3000/api/login"

curl -X POST 'http://localhost:3000/api/login' \
  -H 'Content-Type: application/json' \
  -d '{ "username": "admin", "password": "pass" }'
