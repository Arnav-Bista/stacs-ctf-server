from flask import Flask, request, jsonify
from datetime import datetime
from Crypto.Util.strxor import strxor
from enigma.machine import EnigmaMachine

app = Flask(__name__)
machine = EnigmaMachine.from_key_sheet(
    rotors='II IV V',
    reflector='B',
    ring_settings='B U L',
    plugboard_settings='AV BS CG DL FU HZ IN KM OW RX'
)


def encrypt(init_rotors, pt, key):
    # set rotor positions, then encrypt
    machine.set_display(init_rotors)
    e_key = machine.process_text(key)
    
    machine.set_display(key)
    ct = machine.process_text(pt)

    return ct, e_key


def decrypt(ct, encrypted_key, rotors):
    machine.set_display(rotors)
    key = machine.process_text(encrypted_key)
    
    machine.set_display(key)
    pt = machine.process_text(ct)

    return pt


def transmit(pt, key="STA", init_rotors="STA"):
    
    
    time = datetime.now().strftime("%H%M")
    init_rotors = strxor(init_rotors.encode(),time[1:4].encode()).decode().upper()
    key = strxor(key.encode(),time[1:4].encode()).decode().upper()
    
    ct, e_key = encrypt(init_rotors, pt, key)
    
    transmit_msg = f"""
STA CS X {time} = {len(ct)} = {init_rotors} {e_key} =

{ct}
    """

    return transmit_msg, ct, e_key, init_rotors

    

  
@app.route('/wetterbericht', methods=['GET'])
def encrypt_handler():

    init_rotors = 'WXC'
    key = 'BLA'
    pt = f"""
Weather report for John Honey building 21 February
Horrid as usual, hold off assault of Postgraduate Fishbowl
flag_{{weather-report-goes-brrrr}}
"""

    try:
        transmit_msg, ct, e_key, init_rotors = transmit(pt)
    
        print(transmit_msg)
    
        # pt_dec = decrypt(ct, e_key, init_rotors)
        # print(pt_dec)
 
    
    except Exception as e:
        return jsonify({"error": str(e), "human-err": "Failed to encrypt."}), 400

    return jsonify({"wetterbericht": transmit_msg})


if __name__ == "__main__":
    from waitress import serve
    serve(app, host="127.0.0.1", port=3210)
    
 
