# Algorithm

[Go by Example](./src/go/example/README.md)

```sh
# 查看本地分支
git branch
# 在 HEAD 指向的 commitHash 处创建本地分支
git branch bugfix
# 在指定的 commitHash 处创建本地分支
git branch bugfix <commitHash>
# 删除本地分支
git branch -d bugfix # -D 强制删除
# 切换到本地分支
git switch bugfix # git checkout bugfix

# 查看远程分支
git branch -r
# 创建并切换到本地分支
git branch bugfix && git switch bugfix
# 等价于
git checkout -b bugfix
# 将本地分支推送到远程仓库, 以创建远程分支
git push origin bugfix
# 删除远程分支
git push origin --delete bugfix

# 查看本地分支和远程分支
git branch -a
```

## merge

```sh
git merge <mergedBranch>

#! git checkout main && git merge bugfix
# bugfix   main*
#  |        |
#  *------ main*

#! git checkout bugfix && git merge main
# bugfix*   main
#  |         |
# bugfix* ---*
```

## rebase

```sh
git rebase <baseBranch>
git rebase <baseBranch> <targetBranch>
#! git checkout bugfix && git rebase main
# bugfix*    main
#             |
#            bugfix*

#! git rebase bugfix main
#            bugfix, main*

```

## HEAD

- branch: branch 是指向的 commitHash 的别名
- 未 detach 的 HEAD (HEAD 等于某个 branch): HEAD 是指向的 branch 的别名 (C++ 指向 commitHash 的二级指针)
- detach 的 HEAD (HEAD 不等于任何一个 branch): HEAD 是指向的 commitHash 的别名 (C++ 指向 commitHash 的一级指针)

```sh
cat .git/HEAD # ref: refs/heads/main
git symbolic-ref HEAD # refs/heads/main
```

分离 HEAD

```sh
git checkout main^ # git checkout main~1
git checkout main^^ # git checkout main~2
git checkout HEAD^ # git checkout HEAD~1
git checkout HEAD^^ # git checkout HEAD~2
# 强制移动 main 分支
git branch -f main [main^ | main~1  | HEAD^ | HEAD~1 | <commitHash>]
```

## reset & revert

```sh
git reset <ref> # 未 push, 撤销提交
git revert HEAD # 已 push, 创建一个新提交`  以撤销提交
```

## cherry-pick

将一些提交复制到 HEAD (当前 branch 或 commitHash) 下

```sh
git cherry-pick <commitHash1> <commitHash2>...
```

## 交互式 rebase

交互式 rebase: `--interactive`, 简写为 `-i`

```sh
git rebase HEAD~5 --interactive
# 合并前 5 个提交为 1 个提交后, 推送本地 main 分支到远程 main 分支
git push origin main --force-with-lease
```

`git commit --amend` 修改提交的 message

## tag

tag 也是别名

```bash
# 创建一个指向 HEAD 的标签, 表示 v1.0.0 版本
git tag v1.0.0
# 创建一个指向 commitHash 的标签, 表示 v1.0.0 版本
git tag v1.0.0 <commitHash>

git describe <ref>
# <ref> 可以是 HEAD, branchName, commitHash, tagName 等
# 输出 <tag>_<numCommits>_g<hash>
# tag: 距离 ref 最近的标签名
# numCommits: ref 比 tag 多 numCommits 个提交
# hash: ref 所在的 commitHash 的前缀
```

## 多个 parent 节点

```sh
# 第一个 parent 节点 -> 第二个 parent 节点 -> grandparent 节点
git checkout HEAD~ && git checkout HEAD^2 && git checkout HEAD~2
# 等价于
git checkout HEAD~^2~2
```

## fetch

1. 从远程仓库中下载本地仓库中缺少的 commit 记录
2. 更新远程 origin/main 分支 (不要 checkout/switch 到 origin/\* 分支上!!!)
3. 不会更新本地 main 分支, 即不会修改本地文件

`git fetch && git merge origin/main` 等价于 `git pull`

## push

### fetch + rebase + push

`git fetch && git rebase origin/main && git push` 等价于 `git pull --rebase && git push`

### fetch + merge + push

`git fetch && git merge origin/main && git push` 等价于 `git pull && git push`

## 本地分支跟踪 (track) 远程分支

默认本地 main 分支跟踪远程 main 分支

```shell
# 创建并切换到跟踪远程 main 分支的新分支 anotherMain
git checkout -b anotherMain origin/main
# branch 'anotherMain' set up to track 'origin/main'

#! 等价于
# 创建新分支 anotherMain
git branch anotherMain
# 切换到新分支 anotherMain
git switch anotherMain
# 新分支 anotherMain 跟踪远程 main 分支
git branch -u origin/main
# branch 'anotherMain' set up to track 'origin/main'

#! 等价于
# 创建新分支 anotherMain
git branch anotherMain
# 新分支 anotherMain 跟踪远程 main 分支
git branch -u origin/main anotherMain
# branch 'anotherMain' set up to track 'origin/main'
```

## push 参数

`git push <remote> <branchName>`, 例如 `git push origin main`

推送本地 main 分支到远程 main 分支 (默认是 HEAD 指向的分支)

`git push <remote> <localRef>:<remoteBranchName>`

localRef 可以是 HEAD, branchName, commitHash, tagName 等, 例如 `git push origin foo^:main`

## fetch 参数

`git fetch <remote> <branchName>`, 例如 `git fetch origin main`

从远程仓库中下载本地仓库中缺少的 commit 记录, 并更新远程 main 分支

`git fetch <remote> <remoteRef>:<localBranchName>`

remoteRef 可以是 HEAD, branchName, commitHash, tagName 等, 例如 `git fetch origin HEAD^:main`

如果只是 `git fetch`, 则将更新所有 origin/tagName 分支

## 没有 localRef 的 push, 没有 remoteRef 的 fetch

- `git push <remote> :<remoteBranchName>`, 例如 `git fetch origin :bugfix`, 删除远程 bugfix 分支
- `git fetch <remote> :<localBranchName>`, 例如 `git fetch origin :bugfix`, 新建本地 bugfix 分支
- `git push origin --delete bugfix` 删除远程 bugfix 分支
- `git branch -d bugfix` 删除本地 bugfix 分支

## pull 的参数

`git pull <remote> <remoteRef>:<localBranchName>`

等价于 `git fetch <remote> <remoteRef>:<localBranchName> && git merge <localBranchName>`

## pull request

```sh
# fork 并克隆原始仓库
# fork 的仓库中, 创建并切换到 pr 分支
git checkout -b pr
git add -A
git commit -m 'feat: Test pr'
git push origin pr
# 原始仓库中, 创建 issue 和 pull request
# pull request 被原始仓库合并

# fork 的仓库中, 切换到 main 分支
git checkout main
# 添加原始仓库为 upstream
git remote add upstream git@github.com:tianchenghang/solution.git
# 下载原始仓库的变更
git fetch upstream
# 合并原始仓库的变更
git merge upstream/master
# 推送变更到 fork 的仓库
git push origin main
# 删除 upstream
git remote rm upstream
# 删除无用的 pr 分支
git branch -d pr # 本地
git push origin --delete pr # 远程
```
