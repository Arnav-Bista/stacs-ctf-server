# Julio's challanges

The two exploit challanges run on the same server accessible at:

https://jcbg1.teaching.cs.st-andrews.ac.uk/ctf/otp/code/your-username
https://jcbg1.teaching.cs.st-andrews.ac.uk/ctf/mem

## otp

1. guess the username `admin` for /otp/code/admin
2. when trying to log in, the tokem can be used infinitely and
   takes minutes to expire so it can be brute-forced


## mem

* create request exactly 4096 bytes long anding in `...&password=`
* the server ignores unknown url params
* this will segfault on the server, signaled by a 504 gatway error
* you can use this to progressively guess letters of the password
  * segfault means the letter is correct, auth error is wrong

## waveform

* run the file through a spectrogram like `spek`
