package main

import (
	"log"
	"bytes"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"strings"
)

const flagMem = "abc"

func memServer(mux *http.ServeMux) {

	mux.HandleFunc("POST /mem", func(w http.ResponseWriter, r *http.Request) {

		byt, err := io.ReadAll(r.Body)
		defer r.Body.Close()
		if err != nil {
			http.Error(w, "Bad request", http.StatusBadRequest)
			return
		}

		// super fast parsing algorithm
		byt = bytes.Replace(byt, []byte{'&'}, []byte{0}, -1)

		cmd := exec.Command("./mem", "admin", flagMem)
		cmd.Stdin = bytes.NewReader(byt)
		cmd.Stdout = os.Stdout
		cmd.Stderr = os.Stderr
		err = cmd.Run()

		_ = errors.New
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
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

	})
}
