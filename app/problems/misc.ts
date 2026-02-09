
import { Category, Question } from "./types"

const questions: Question[] = [
  {
    id: "e1979e63-f018-4370-8906-973186f0ad9c",
    description: "I snuck into the SCP Foundation and found some classified documents!! But my Security Card was not strong enough, curse that SCP-914! My RNG was too bad to get the Omni Keycard 🥀. Can you make work of this? Lowkey reminds me of the Little Island Incident.",
    title: "REDACTED DOCUMENTS",
    points: 100,
    attachments: [
      {
        name: "The File",
        type: "file",
        url: "/2026/redacted.pdf"
      }
    ]
  }
]



const misc: Category = {
  questions: questions,
  description: "Can you find them all?",
  category: "Misc",
}

export default misc;
