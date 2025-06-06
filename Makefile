.PHONY: push degit gobuild clean gcc clang

push:
	git add -A
	git commit -m "chore: Regular code maintenance"
	git push origin main

degit:
	rm -rf ./.git
	git init
	git remote add origin git@github.com:161043261/algorithm.git
	git add -A
	git commit -m "feat: Introduce new feature"
	git push -f origin main --set-upstream

gobuild:
	# rm -rf ./target && mkdir ./target # shift + option
	go build -tags main                        -o ./target/main                        ./src/main.go
	go build -tags helloWorld                  -o ./target/helloWorld                  ./src/go/helloWorld.go
	go build -tags variable                    -o ./target/variable                    ./src/go/variable.go
	go build -tags constant                    -o ./target/constant                    ./src/go/constant.go
	go build -tags for                         -o ./target/go                          ./src/go/for.go
	go build -tags switch                      -o ./target/switch                      ./src/go/switch.go
	go build -tags array                       -o ./target/array                       ./src/go/array.go
	go build -tags slice                       -o ./target/slice                       ./src/go/slice.go
	go build -tags map                         -o ./target/map                         ./src/go/map.go
	go build -tags function                    -o ./target/function                    ./src/go/function.go
	go build -tags multipleReturnValues        -o ./target/multipleReturnValues        ./src/go/multipleReturnValues.go
	go build -tags variadicFunction            -o ./target/variadicFunction            ./src/go/variadicFunction.go
	go build -tags closure                     -o ./target/closure                     ./src/go/closure.go
	go build -tags recursion                   -o ./target/recursion                   ./src/go/recursion.go
	go build -tags rangeOverBuiltinTypes       -o ./target/rangeOverBuiltinTypes       ./src/go/rangeOverBuiltinTypes.go
	go build -tags pointer                     -o ./target/pointer                     ./src/go/pointer.go
	go build -tags stringAndRune               -o ./target/stringAndRune               ./src/go/stringAndRune.go
	go build -tags struct                      -o ./target/struct                      ./src/go/struct.go
	go build -tags method                      -o ./target/method                      ./src/go/method.go
	go build -tags interface                   -o ./target/interface                   ./src/go/interface.go
	go build -tags enum                        -o ./target/enum                        ./src/go/enum.go
	go build -tags structEmbedding             -o ./target/structEmbedding             ./src/go/structEmbedding.go
	go build -tags generic                     -o ./target/generic                     ./src/go/generic.go
	go build -tags rangeOverIterator           -o ./target/rangeOverIterator           ./src/go/rangeOverIterator.go
	go build -tags error                       -o ./target/error                       ./src/go/error.go
	go build -tags customError                 -o ./target/customError                 ./src/go/customError.go
	go build -tags goroutine                   -o ./target/goroutine                   ./src/go/goroutine.go
	go build -tags channel                     -o ./target/channel                     ./src/go/channel.go
	go build -tags channelBuffering            -o ./target/channelBuffering            ./src/go/channelBuffering.go
	go build -tags channelSynchronization      -o ./target/channelSynchronization      ./src/go/channelSynchronization.go
	go build -tags channelDirection            -o ./target/channelDirection            ./src/go/channelDirection.go
	go build -tags select                      -o ./target/select                      ./src/go/select.go
	go build -tags timeout                     -o ./target/timeout                     ./src/go/timeout.go
	go build -tags nonBlockingChannelOperation -o ./target/nonBlockingChannelOperation ./src/go/nonBlockingChannelOperation.go
	go build -tags closingChannel              -o ./target/closingChannel              ./src/go/closingChannel.go
	go build -tags rangeOverChannel            -o ./target/rangeOverChannel            ./src/go/rangeOverChannel.go
	go build -tags timer                       -o ./target/timer                       ./src/go/timer.go
	go build -tags ticker                      -o ./target/ticker                      ./src/go/ticker.go
	go build -tags workerPool                  -o ./target/workerPool                  ./src/go/workerPool.go
	go build -tags waitGroup                   -o ./target/waitGroup                   ./src/go/waitGroup.go
	go build -tags rateLimiting                -o ./target/rateLimiting                ./src/go/rateLimiting.go
	go build -tags atomicCounter               -o ./target/atomicCounter               ./src/go/atomicCounter.go

clean:
	rm -rf ./build ./dist ./out ./target ./lib
	@echo "./build  -- Linux clang++ binary files"
	@echo "./dist   -- tsc compiled JavaScript code"
	@echo "./out    -- Windows g++ binary files"
	@echo "./target -- Go build binary files"
	@echo "./lib    -- babel compiled JavaScript code"

gcc:
	CC=gcc CXX=g++ cmake -S ./ -B ./out
	cmake --build ./out

clang:
	CC=clang CXX=clang++ cmake -S ./ -B ./build
	cmake --build ./build
