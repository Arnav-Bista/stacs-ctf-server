all: build/julio-server build/julio-mem /host/jcbg1/nginx.d/default/proxy.conf

run: all
	cd build && CTF_PORT=:$$(id -u) ./julio-server

/host/jcbg1/nginx.d/default/proxy.conf:
	cp proxy.conf /host/jcbg1/nginx.d/default/
	nginx -c /host/jcbg1/nginx.conf -s reload

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
