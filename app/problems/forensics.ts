import { Category, Question } from "./types"

const questions: Question[] = [
  {
    id: 1,
    title: "My Password v1",
    description: "I saw how this dude hid his password inside an image and showed it on stream! But this guy is a fake terminal user, he doesnt know much...",
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


const forensics: Category = {
  questions: questions,
  description: "Some Cool Description",
  category: "Forensics"
}

export default forensics;
