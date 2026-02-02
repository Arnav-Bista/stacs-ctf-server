import { Category, Question } from "./types"

const questions: Question[] = [
  {
    id: "5a6b7c8d-9e0f-4a1b-2c3d-4e5f6a7b8c9d",
    title: "Some LLM Question IDK",
    description: "Tokens tokens tokens, hallucinations????",
    // hints: ["Text Editor?"],
    points: 50,
    attachments: [
      {
        name: "How Hungry...",
        type: "image",
        url: "/how-hungry.png"
      },
    ]
  },
];


const llm: Category = {
  questions: questions,
  description: "AI Hype? Time to pop the bubble.",
  category: "LLM"
}

export default llm;
