
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
  }
]



const crypto: Category = {
  questions: questions,
  description: "TODO",
  category: "Cryptography",
}

export default crypto;
