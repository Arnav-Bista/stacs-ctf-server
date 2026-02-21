
import { Category, Question } from "./types"

const questions: Question[] = [
  {
    id: "d0ded40c-5f47-4668-976d-ad22cf284a0d",
    title: "The Basics",
    description: (
      <div>

        <p>syf kpjjpnrex fimftus ygl hffe jpmgsfv qrg opesyl gev zfgtl pk xtrs hjppv gev
          lnfgs pct gesytpupjpxz vfugtsofes ygl hffe xprex mtgwz pqft syrl r ygqf ogegxfv
          sp xfs oz ygevl pe syrl lp myfma rs pcs syf nrlf oge phlftqfl syf kpjjpnrex
          stcsyl yf nyp tcel re ktpes pk mgt xfsl srtfv zfs yf nyp tcel hfyrev mgt xfsl
          fiygclsfv yf nyp bcoul pkk mjrkk bcoul sp mpemjclrpe ngt vpfl eps vfsftoref nyp
          rl trxys pejz nyp rl jfks</p>

        <p>syf kjgx rl syf krtls jfssftl pk fgmy jref hfjpn spxfsyft nrsyre syf tfxcjgt kjgx kptogs</p>

        <p>lcmy nrlvpo r nrjj gvv oz pne gvvrsrpel yftf</p>

        <p>nrlf ofe lufga hfmgclf syfz ygqf lpofsyrex sp lgz kppjl hfmgclf syfz ygqf sp lgz lpofsyrex</p>

        <p>rk zpc myglf snp tghhrsl zpc nrjj mgsmy efrsyft</p>

        <p>lpof ufpujf kffj syf tgre psyftl bcls xfs nfs</p>

        <p>vpxl hgta hcs syf mgtgqge opqfl pe</p>

        <p>pef nyp ljfful nrsy rsmyz hco ngafl nrsy lofjjz krexft</p>

        <p>oge nyp lsgevl pe sprjfs rl yrxy pe ups</p>

      </div>
    ),
    points: 20,
  },
  {
    id: "57504b47-c80f-4b86-8866-c45c3268887f",
    description: "This MATHEMATICALLY IMPOSSIBLE TO DECRYPT method of encryptying is unbeatable 🤓! You know what!? I'm going to show you my encrypted image!          oh yeah?!?! Take two of them!! Yeah I BET you can't do anything with it 😎. IYKYK 😔✊✌️",
    title: "Cracking the Uncrackable",
    points: 75,
    attachments: [
      {
        name: "The First",
        type: "image",
        url: "/2026/first.png"
      },
      {
        name: "The Second",
        type: "image",
        url: "/2026/second.png"
      }
    ]
  },
  {
    id: "1924050a-6107-4db5-83bc-8e088b10ffc3",
    title: "Out of Passwords",
    description: "We've upgraded our OTP system. Now we're making sure that we're changing up our keys.\nIt just took a bit of work adjusting it to work on our new infrastructure.\nIdk if it's because we cracked windows vista, but it can only accept data structures less than 16 bytes.\n\nBut regardless with our new key-changing system, we can preserve the pure security of OTPs.\nWe'll even let you take a look at our output, it wont be of use hahaha.",
    points: 50,
    api: {
      endpoint: "/crypto/out-of-passwords",
      method: "POST",
      description: "Send your payload to be encrypted as a bytestring converted to a long.\nYou can use the PyCryptoDome library's bytes_to_long() & long_to_bytes() functions.\nData will be returned as a long representations of bytestrings.",
      requestFormat: {
        type: "json",
        example: '{ "data": bytes_as_long }'
      },
    }
  },
  {
    id: "33e9de1b-d25d-444a-8d41-835e74fc3087",
    title: "Rule of Two",
    description: "I've always wondered why people use the product of two primes as a modulus for RSA.\n\nWouldn't it be *so much*, literally twice as simple if we just used one?\nThink about all that sweet processing power we'd save.\nWhy hasn't anyone thought of this??\n\nI bet you can't get my flag from this encrypted ciphertext.",
    points: 50,
    attachments: [
      {
        name: "RSA parameters",
        type: "file",
        url: "/rule-of-two.txt"
      }
    ]
  },
  {
    id: "18d1f180-4e53-41ba-bc98-b159c6d9accf",
    title: "Testing Testing",
    description: "I bet you can't crack this implementation!\nWe aren't using ECB anymore for AES, turns out that scheme got deprecated ages ago...\nNow we've got CTR - its uncrackable according to our sources.\n\nEven looking tt our scheme - its mathematically secure! Hahahahaha!\nWait - did our intern leave the test output in there?!",
    points: 50,
    api: {
      endpoint: "/crypto/testing-testing",
      method: "POST",
      description: "Send your payload to be encrypted as a bytestring converted to a long.\nYou can use the PyCryptoDome library's bytes_to_long() & long_to_bytes() functions. Data will be returned as b64.",
      requestFormat: {
        type: "json",
        example: '{ "data": bytes_as_long }'
      }
    }
  },
  {
    id: "cb1255ca-cd4a-43d2-9395-9ee34af179c5",
    title: "Rule of 3DES",
    description: "We've learnt from our mistakes!\nOur DES implementation last year was broken by a brute force attack - but this year we're using 3DES!\nGood luck trying to crack this...\n\nSince we've increased the key search space from 56 bits to 174 bits, we're cutting down on costs for key generation to save on society spending.\nSo instead of an 8 byte key for each section of 3DES, we're using just a 4 byte key twice (i.e. concatenate a 4 byte key to itself).\nThanks to our efficient cost slashing we can afford an extra Taste coffee per week (sponsor us Taste). \n\nHuh?? Use 3 different keys???",
    points: 250,
    attachments: [
      {
        name: "3DES Ciphertext",
        type: "file",
        url: "/rule-of-three.txt"
      }
    ]
  },
  {
    id: "b92be410-a913-45df-9588-bc4b4c3974dd",
    title: "Tainted Love",
    description: `This question is all about padding.\nSee if you can break this encryption scheme...\nThe encryption function is as follows:\n\nfrom Crypto.cipher import AES\nfrom Crypto.Util.padding import pad\nKEY = ????????????????????\nFLAG = ?????????????????????`,
    code: `def encrypt(plaintext):
    plaintext = bytes.fromhex(plaintext)
    padded = pad(plaintext + FLAG.encode(), 16)
    cipher = AES.new(KEY, AES.MODE_ECB)
    encrypted = cipher.encrypt(padded)
    
    return encrypted.hex()`,
    points: 250,
    api: {
      endpoint: "/crypto/tainted-love",
      method: "POST",
      description: `Wrap your data in this format: bytes.hex(your_data_here.encode())
                    Then send as a json using: requests.post(url, json = your_json_here)`,
      requestFormat: {
        type: "json",
        example: '{ "data": "datatoencrypt" }'
      }
    }
  },
  {
    id: "1d453157-8e13-4675-a353-b9ab6ae5b5c5",
    title: "NOBUS (Nobody But Us)",
    description: `We intercepted communications from a suspicious organization using a "proprietary" 
                  random number generator for their encryption keys. Their documentation claims it's 
                  based on "advanced mathematical principles" and is "provably secure."

                  We managed to capture several outputs from their RNG before it generated an 
                  encryption key for a secret message. The RNG uses public parameters A and B that 
                  are supposedly "randomly chosen."

                  Something feels off about this system... almost like it was designed with a backdoor 
                  in mind. We also recovered what we believe to be a backdoor key. Can you break their
                  encryption?

                  Hint: Research the Dual_EC_DRBG controversy. What happens when the relationship 
                  between two public parameters isn't actually random?


                  Historical Context:
                  ------------------
                  In 2013, documents leaked by Edward Snowden suggested that the NSA had backdoored 
                  the Dual_EC_DRBG random number generator, which was standardized by NIST. The 
                  backdoor relied on the NSA knowing the relationship between two elliptic curve 
                  points (P and Q). If you know the secret scalar relating these points, you can 
                  predict all future outputs after seeing just one output.
                  
                  Good luck!`,
    code: "Encrypted Flag (hex): 8157f1707e9809d83799e7b60ca306cd5ea87ee3a34f8d3d20a7cb9289dbf3b270b9117d10a290854ad19e83179e6b12",
    points: 500,
    attachments: [
      {
        name: "Intercepted Paramters & Output",
        type: "file",
        url: "/intercepted-params.txt"
      },
      {
        name: "Classified Intercept",
        type: "file",
        url: "/classified-intercept.txt"
      }
    ]
  },
  {
    id: "be2cf98e-a534-4cfa-b4e5-9378ed7f7ae9",
    title: "Ne comprends pas",
    description: "Bonjour, mes amis!\nI've encrypted an excerpt of one of my favourite French stories.\nDon't surrender too soon trying to crack it!",
    points: 100,
    attachments: [
      {
        name: "The Extraordinary Adventures of Arsène Lupin, Gentleman-Burglar | Chapter 1",
        type: "file",
        url: "/lupin.txt"
      }
    ]
  },
  {
    id: "64ef2e42-fe95-4794-bb09-75694fa52ac2",
    title: "Die großartige Arbeit von Herrn Scherbius",
    description: `We've intercepted these interesting messages coming from a weird terminal in the John Honey building.
                  They seem to change every minute, and have a puzzling format...

                  We also received an anonymous message - "Kenngruppen". Not sure what to do with it...`,
    points: 500,
    link: "/problems/hour-sixth",
  }
]



const crypto: Category = {
  questions: questions,
  description: "Break ciphers, exploit weak keys, and crack encryption schemes spanning classical to modern cryptography.",
  category: "Cryptography",
}

export default crypto;
