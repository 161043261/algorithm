.DEFAULT_GOAL=help

.PHONY: chore
chore: ## Regular code maintenance
	git add -A
	git commit -m "chore: Regular code maintenance"
	git push origin main

.PHONY: feat
feat: ## Introduce new features
	git add -A
	git commit -m "feat: Introduce new features"
	git push origin main

.PHONY: fix
fix: ## Fix some bugs
	git add -A
	git commit -m "fix: Fix some bugs"
	git push origin main

.PHONY: style
style: ## Update styling
	git add -A
	git commit -m "style: Update styling"
	git push origin main

.PHONY: refactor
refactor: ## Refactor code
	git add -A
	git commit -m "refactor: Refactor code"
	git push origin main

.PHONY: test
test: ## Create/Update testing
	git add -A
	git commit -m "test: Create/Update testing"
	git push origin main

.PHONY: docs
docs: ## Create/Update documentation
	git add -A
	git commit -m "docs: Create/Update docs"
	git push origin main

.PHONY: perf
perf: ## Performance optimization
	git add -A
	git commit -m "perf: Performance optimization"
	git push origin main

.PHONY: init
init: ## Initial commit
	rm -rf ./.git
	git init
	git remote add origin git@github.com:161043261/algorithm.git
	git add -A
	git commit -m "Initial commit"
	git push -f origin main --set-upstream

.PHONY: build
build: ## Go build
	rm -rf ./target && mkdir ./target ./src/go/dir
	echo "hello go" > ./src/go/dir/file.txt
	echo "123"      > ./src/go/dir/file1.hash
	echo "456"      > ./src/go/dir/file2.hash
	for file in $$(find ./src/go -name '*.go'); do    \
		name=$$(basename $$file .go);                   \
		case $$name in                                  \
      *_test) continue ;;                           \
    esac;                                           \
		tag=$$(basename $$file .go);                    \
		go build -tags $$tag -o ./target/$$name $$file; \
	done
	rm -rf ./src/go/dir

.PHONY: clean
clean: ## Remove ./build ./dist ./out ./target ./lib
	rm -rf ./build ./dist ./out ./target ./lib
	@echo "./build  -- Linux clang++ binary files"
	@echo "./dist   -- tsc compiled JavaScript code"
	@echo "./out    -- Windows g++ binary files"
	@echo "./target -- Go build binary files"
	@echo "./lib    -- babel compiled JavaScript code"

.PHONY: build2
build2: ## Cmake build: CC=gcc CXX=g++
	CC=gcc CXX=g++ cmake -S ./ -B ./out
	cmake --build ./out

.PHONY: build3
build3: ## Cmake build: CC=clang CXX=clang++
	CC=clang CXX=clang++ cmake -S ./ -B ./build
	cmake --build ./build

.PHONY: cp
cp: ## Copy to ./gobyexample-optimize
	cp ./src/go/*.go      ./gobyexample-optimize/src/
	cp ./src/go/README.md ./gobyexample-optimize/
	cp ./Makefile         ./gobyexample-optimize

.PHONY: help
help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
	cut -d ":" -f1- |                                        \
	awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
