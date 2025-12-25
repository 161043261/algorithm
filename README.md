# Algorithm

> [!important]
>
> Algorithms implemented by JS/TS/C++/Python

- JavaScript, HTML/CSS, SQL, Python, Bash, TypeScript, C++
- MySQL, SQLite, Redis, MongoDB, ElasticSearch
- Node.js, React, Express, Vue.js

## JS/TS

- nvm
- fnm

## C++

```pwsh
winget install Microsoft.VisualStudio.2022.BuildTools --force --override "--wait --passive --add Microsoft.VisualStudio.Workload.VCTools --add Microsoft.VisualStudio.Component.VC.Tools.x86.x64 --add Microsoft.VisualStudio.Component.Windows11SDK.26100"
```

## Golang

```bash
go env -w CGO_ENABLED=0
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct

export GOPATH="$HOME/go"
export GOBIN="$GOPATH/bin"
export PATH="$GOBIN:$PATH"

go install -v github.com/go-delve/delve/cmd/dlv@latest
```

## Python

- miniconda
- poetry
- uv

```bash
conda create -n venv python=3.13 -y
conda activate venv

conda create -p ./.venv python=3.13 -y
conda activate ./.venv
```
