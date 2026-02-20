package main

import (
	"log"
	"bytes"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"strings"
	"net/url"
)

const flagMem = "flag_{p00l-on-the-r00f-must-have-a-l3ak}"

func memServer(mux *http.ServeMux) {

	mux.HandleFunc("GET /mem", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, `
		<!DOCTYPE html>
		<html>
		<head>
		</head>
		<body>
			<h1>Please log in</h1>
			<form action="" method="post">
				<input name="username" type="text" />
				<input name="password" type="password" />
				<input type="submit" />
			</form>
		</body>
		</html>
		`)
	})

	mux.HandleFunc("POST /mem", func(w http.ResponseWriter, r *http.Request) {

		byt, err := io.ReadAll(r.Body)
		defer r.Body.Close()
		if err != nil {
			http.Error(w, "Bad request", http.StatusBadRequest)
			return
		}

		// super fast parsing algorithm
		parsed, err := url.QueryUnescape(string(bytes.Replace(byt, []byte{'&'}, []byte{0}, -1)))
		if err != nil {
			http.Error(w, "Bad request", http.StatusBadRequest)
			return
		}

		cmd := exec.Command("./julio-mem", "admin", flagMem)
		cmd.Stdin = strings.NewReader(parsed)
		cmd.Stdout = os.Stdout
		cmd.Stderr = os.Stderr
		err = cmd.Run()

		log.Println(err)

		if exit, ok := err.(*exec.ExitError); ok {
			if strings.Contains(exit.String(), "signal") {
				http.Error(w, "Gateway unavailable", http.StatusBadGateway)
				return
			}


			status := []int{
				http.StatusOK,
				http.StatusUnauthorized,
				http.StatusBadRequest,
				http.StatusInternalServerError,
			}

			w.WriteHeader(status[exit.ExitCode()])
			fmt.Fprintf(w, "%s\n", http.StatusText(status[exit.ExitCode()]))
			return
		} else if (err != nil){
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		} else {
			w.WriteHeader(http.StatusOK)
			fmt.Fprintln(w, "logged in!")
		}

	})
}
