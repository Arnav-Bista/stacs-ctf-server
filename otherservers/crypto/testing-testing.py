
from base64 import b64encode
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

import os

from flask import Flask, request, jsonify
from Crypto.Util.number import bytes_to_long, long_to_bytes
import json

app = Flask(__name__)

def encrypt(pt: bytes) -> string, string:
    flag = b"flag_{dontreuse}"
    key = b'force-of-inertia'
    nonce = get_random_bytes(8)

    test_cipher = AES.new(key, AES.MODE_CTR, nonce=nonce)
    test_ct = test_cipher.encrypt(pt)
    test_ct_b64 = b64encode(test_ct).decode('utf-8')
    
    cipher = AES.new(key, AES.MODE_CTR, nonce=nonce)
    ct_bytes = cipher.encrypt(flag)
    ct = b64encode(ct_bytes).decode('utf-8')

    return test_ct_b64, ct


@app.route('/crypto/out-of-passwords', methods=['POST'])
def encrypt_handler():
    try:
        data = request.get_json(force=True, cache=True)
    except Exception as e:
        return jsonify({"error": str(e), "human-err": "Not a json bro"})

    if 'data' not in data:
        return jsonify({"error": "Missing 'data' field"}), 400

    plaintext = data['data']
    try:
        test, result = encrypt(long_to_bytes(plaintext))
    except Exception as e:
        return jsonify({"error": str(e), "human-err": "Failed to encrypt."}), 400

    return jsonify({"test": test, "data": result})


if __name__ == "__main__":
    from waitress import serve
    serve(app, host="127.0.0.1", port=3212)
 
