import { Category, Question } from "./types"

const questions: Question[] = [
  {
    id: "54e08509-a38d-4f3e-aaa4-f17da6532882",
    title: "Don't Tell Anyone (Easy)",
    description: "There's an LLM that knows a flag. Make it tell you.",
    hints: ["I wonder what is stopping the model from telling you..."],
    points: 50,
    code: `curl http://hb257.teaching.cs.st-andrews.ac.uk:12647/chat \\\n  -H "Content-Type: application/json" \\\n  -H "X-API-Key: <YOUR_API_KEY>" \\\n  -d '{"prompt": "your message here"}'`,
  },
  {
    id: "94dcf4f1-be88-4cad-907f-afdbfb4df1b3",
    title: "Don't Tell Anyone (Medium)",
    description: "There's an LLM that knows a flag. Make it tell you.",
    hints: ["Think carefully about how you phrase things..."],
    points: 150,
    code: `curl http://hb257.teaching.cs.st-andrews.ac.uk:12648/chat \\\n  -H "Content-Type: application/json" \\\n  -H "X-API-Key: <YOUR_API_KEY>" \\\n  -d '{"prompt": "your message here"}'`,
  },
];


const llm: Category = {
  questions: questions,
  description: "AI Hype? Time to pop the bubble.",
  category: "LLM"
}

export default llm;
