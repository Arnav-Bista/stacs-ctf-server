
import { Category, Question } from "./types"

const questions: Question[] = [
  {
    id: "57504b47-c80f-4b86-8866-c45c3268887f",
    description: "This MATHEMATICALLY IMPOSSIBLE TO DECRYPT method of encryptying is unbeatable 🤓! You know what!? I'm going to show you my encrypted image!          oh yeah?!?! Take two of them!! Yeah I BET you can't do anything with it 😎. IYKYK 😔✊✌️",
    title: "Cracking the Uncrackable",
    points: 25,
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
      description: "Send your payload to be encrypted as a bytestring converted to a long.\nYou can use the PyCryptoDome library's bytes_to_long() & long_to_bytes() functions.\nData will be returned as a long representation of a bytestring.",
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
  }
]



const crypto: Category = {
  questions: questions,
  description: "TODO",
  category: "Cryptography",
}

export default crypto;
