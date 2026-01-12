import { Category, Question } from "./types"

const questions: Question[] = [
  {
    id: 5,
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
