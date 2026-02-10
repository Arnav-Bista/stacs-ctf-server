package main

import (
	"log"
	"net/http"
)

func main() {
	mux := http.NewServeMux()

	otpServer(mux)
	memServer(mux)

	log.Println("starting")
	http.ListenAndServe(":8080", mux)
}
