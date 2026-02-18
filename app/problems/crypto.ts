
import { Category, Question } from "./types"

const questions: Question[] = [
  {
    id: "57504b47-c80f-4b86-8866-c45c3268887f",
    description: "This MATHEMATICALLY IMPOSSIBLE TO DECRYPT method of encryptying is unbeatable 🤓! You know what!? I'm going to show you my encrypted image!          oh yeah?!?! Take two of them!! Yeah I BET you can't do anything with it 😎. IYKYK 😔✊✌️",
    title: "Cracking the Uncrackable",
    points: 100,
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
    description: "We've upgraded our OTP system. Now we're making sure that we're changing up our keys haha.\nIt just took a bit of work adjusting it to work on our new infrastructure.\nIdk if it's because we cracked windows vista, but it can only accept data structures less than 16 bytes.",
    points: 50,
    api: {
      endpoint: "/crypto/out-of-passwords",
      method: "POST",
      description: "Send your payload to be encrypted as a bytestring converted to a long.\nYou can use the PyCryptoDome library's bytes_to_long() & long_to_bytes() functions.\nData will be returned in the format { 'data': bytes_as_long }",
      requestFormat: {
        type: "json",
        example: '{ "data": bytes_as_long }'
      },
    }
  },
  {
    id: "33e9de1b-d25d-444a-8d41-835e74fc3087",
    title: "Rule of Two",
    description: "I've always wondered why people use the product of two primes as a modulus for RSA.\n\nWouldn't it be *so much*, literally twice as simple if we just used one?\nThink about all that sweet processing power we'd save.\nWhy hasn't anyone thought of this??\n\nI bet you can't get my flag from this encrypted ciphertext.\n\nExponent:\ne = 65537\n\nPrime Modulus:\nn = 754504884488355992613475443703197599305472667423685663716426820258038260238341189837002895867489655037509404560697913282037450724137506302619022107255986292722755242991070733926076121552306935170095264015735976922876540696445988233036660723472298434191295086941047447198115204429821\n\nEncrypted Ciphertext:\n148617791026989894858369832552035494039268594239592154462884966640982386546057192504469289129998196008533584484053085096349365640011383213053277642784744255553050542972623418255804552679289507894211631026960831981078742556731837145259588062815863765958076544273171133271203945961735",
    points: 50,
  }
]



const crypto: Category = {
  questions: questions,
  description: "TODO",
  category: "Cryptography",
}

export default crypto;
