from flask import Flask, request, jsonify
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import json

app = Flask(__name__)

KEY = b'phew_it_isnt_cpp'
FLAG = 'flag_{seems_ecb_is_vry_insecure}'


def encrypt(plaintext):
    try:
        plaintext = bytes.fromhex(plaintext)
        padded = pad(plaintext + FLAG.encode(), 16)
        cipher = AES.new(KEY, AES.MODE_ECB)
        encrypted = cipher.encrypt(padded)
        return encrypted.hex()
    except Exception as e:
        return str(e)


@app.route('/crypto/tainted-love', methods=['POST'])
def encrypt_handler():
    try:
        data = request.get_json(force=True, cache=True)
    except Exception as e:
        return jsonify({"error": str(e), "human-err": "Not a json bro"})

    if 'data' not in data:
        return jsonify({"error": "Missing 'data' field"}), 400

    plaintext = data['data']
    try:
        result = encrypt(plaintext)
    except Exception as e:
        return jsonify({"error": str(e), "human-err": "Failed to encrypt."}), 400

    return jsonify({"data": result})


if __name__ == "__main__":
    from waitress import serve
    serve(app, host="127.0.0.1", port=3210)
    # app.run(host='127.0.0.1', port=3210, debug=True)
