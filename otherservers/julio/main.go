package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	mux := http.NewServeMux()

	otpServer(mux)
	memServer(mux)

	log.Println("starting")
	err := http.ListenAndServe(os.Getenv("CTF_PORT"), mux)
	if err != nil {
		log.Fatal(err)
	}
}
