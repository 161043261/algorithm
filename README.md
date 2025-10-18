# Algorithm

> [!important]
>
> Algorithms implemented by JS/TS/Go/C++/Java/Python

```bash
conda create --prefix .venv python=3.9 -y

go env -w CGO_ENABLED=0
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct

mvn clean -DskipTests
mvn exec:exec
mvn com.spotify.fmt:fmt-maven-plugin:format
mvn -Pnative package -DskipTests
```
