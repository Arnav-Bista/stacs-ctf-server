all: build/julio-server build/julio-mem

build/julio-server: build
	go build -o build/julio-server ./*.go 

build/julio-mem: build mem.c
	cc --std=c11 -O3 -o build/julio-mem mem.c

build:
	mkdir build

test-mem: build/julio-mem
	python3 test-mem.py | ./build/julio-mem admin abc ; echo $$?

test-mem-server: 
	python3 test-mem-server.py | curl localhost:8080/mem --data @-

clean:
	rm -rf build
