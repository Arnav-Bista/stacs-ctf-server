
import os
from Crypto.Util.strxor import strxor
from hashlib import md5

from flask import Flask, request, jsonify
from Crypto.Util.Padding import pad
from Crypto.Util.number import bytes_to_long, long_to_bytes
import json

app = Flask(__name__)

counter = 0
flag = b"flag_{use-rngs}" 

def encrypt(plaintext: bytes) -> bytes:
    try:
        global counter
        keystream = md5(counter.to_bytes(8, 'big')).digest()
        counter += 1

        if counter >= 128:
                counter = 0
        
        ct = strxor(pad(plaintext, 16), keystream)
        print(ct)

        return ct
        
    except Exception as e:
        print(e)
        return str(e)


@app.route('/crypto/out-of-passwords', methods=['POST'])
def encrypt_handler():
    global flag
    try:
        data = request.get_json(force=True, cache=True)
    except Exception as e:
        return jsonify({"error": str(e), "human-err": "Not a json bro"})

    if 'data' not in data:
        return jsonify({"error": "Missing 'data' field"}), 400

    plaintext = data['data']
    plaintext_bytes = long_to_bytes(plaintext)
    try:
        result = bytes_to_long(encrypt(plaintext_bytes))
        ct = bytes_to_long(encrypt(flag))
    except Exception as e:
        return jsonify({"error": str(e), "human-err": "Failed to encrypt."}), 400

    return jsonify({"data": result, "flag_ct": ct})


if __name__ == "__main__":
    from waitress import serve
    serve(app, host="127.0.0.1", port=3211)
    # app.run(host='127.0.0.1', port=3210, debug=True)
