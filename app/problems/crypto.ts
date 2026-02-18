
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
    description: "We've upgraded our OTP system. Now we're making sure that we're changing up our keys haha.\nIt just took a bit of work adjusting it to work on our new system.\nIdk if its because we cracked windows vista but it can only accept up to 16 byte data structures.",
    points: 50,
    api: {
      endpoint: "/api/problems/crypto",
      method: "POST",
      description: "Send your payload to be encrypted.",
      requestFormat: {
        type: "json",
        example: '{ "question": "out-of-passwords", "payload": "I only care about BTC crypto." }'
      },
    }
  }
]



const crypto: Category = {
  questions: questions,
  description: "TODO",
  category: "Cryptography",
}

export default crypto;
