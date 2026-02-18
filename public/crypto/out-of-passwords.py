
import os
from Crypto.Util.strxor import strxor
from Crypto.Util.Padding import pad
from hashlib import md5

counter = 0

def encrypt(plaintext: bytes) -> bytes:
        global counter
        keystream = md5(counter.to_bytes(8, 'big')).digest()
        counter += 1

        if counter >= 128:
                counter = 0
        
        print(len(plaintext))
        return strxor(pad(plaintext, 16), keystream)


if __name__ == "__main__":
        flag = b"flag_{use-rngs}" 

        user_input = os.args[1]
        
        if len(user_input) >= 16:
                return "Input too long! Must be less than 16 bytes."



        ciphertext = encrypt(user_input)
        # print(f"Ciphertext: {ciphertext.hex()}")

        flag_ct = encrypt(flag)
        # print(f"Flag Ciphertext: {flag_ct.hex()}")

        return f"Message Ciphertext: {ciphertext.hex()}\nFlag ciphertext: {flag_ct.hex()}"
