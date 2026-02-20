package main

import (
	"crypto/rand"
	"fmt"
	"log"
	"math/big"
	"net/http"
	"time"

	"github.com/google/uuid"
)

const flagOtp1 = "flag_{the-plagu3s-carefu11y-prep4red-mem0}"
const flagOtp2 = "flag_{1f-at-first-u-d0nt-succ3d}"

type otp struct {
	code string
	exp  time.Time
}

func otpServer(mux *http.ServeMux) {

	otpdb := map[string]otp{}

	mux.HandleFunc("GET /otp/code/{user}", func(w http.ResponseWriter, r *http.Request) {

		if r.PathValue("user") != "admin" {
			http.Error(w, "User not found", http.StatusNotFound)
			return
		}

		if len(otpdb) > 1000 {
			now := time.Now()
			for k := range otpdb {
				if otpdb[k].exp.Before(now) {
					delete(otpdb, k)
				}
			}
		}

		if len(otpdb) > 1000 {
			http.Error(
				w,
				"Too many too many live otp codes, use an existing one",
				http.StatusTooManyRequests,
			)

			return
		}

		code, err := rand.Int(rand.Reader, big.NewInt(999_999))
		if err != nil {
			http.Error(
				w,
				"Internal server error",
				http.StatusInternalServerError,
			)
			return
		}

		token := uuid.NewString()

		otpdb[token] = otp{
			code: fmt.Sprint(code),
			exp:  time.Now().Add(time.Minute),
		}

		log.Println("new opt token: " + token + ", code: " + code.String())

		fmt.Fprintf(w, `
		<!DOCTYPE html>
		<html>
		<head>
		</head>
		<body>
			<h1>Welcome back, admin</h1>
			<p>Enter the 6-digit code sent to your email</p>
			<p>Your quote of the day is: %s</p>
			<form action="./admin?token=%s" method="post">
				<input name="code" type="text" />
				<input type="submit" />
			</form>
		</body>
		</html>
		`, flagOtp1, token)
	})

	mux.HandleFunc("POST /otp/code/{user}", func(w http.ResponseWriter, r *http.Request) {

		if r.PathValue("user") != "admin" {
			http.Error(w, "user not found", http.StatusNotFound)
			return
		}

		err := r.ParseForm()
		if err != nil {
			http.Error(w, "bad request", http.StatusBadRequest)
			return
		}

		token := r.Form.Get("token")
		code := r.Form.Get("code")

		log.Println("code: " + code + ", token: " + token)

		if otp, ok := otpdb[token]; !ok || otp.exp.Before(time.Now()) || otp.code != code {
			http.Error(w, "Invalid code", http.StatusForbidden)
			return
		}

		fmt.Fprintf(w, `
		<!DOCTYPE html>
		<html>
		<head>
		</head>
		<body>
			<h1>You've logged in</h1>
			<p>New message from corporate: %s</p>
		</body>
		</html>
		`, flagOtp2)
	})
}
