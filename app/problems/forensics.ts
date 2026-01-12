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
  {
    id: 6,
    title: "https://us-tuna-sounds-images.voicemod.net/5b23cd9b-0c2d-471f-8589-9e6bdee73d4c-1680393318917.jpeg",
    description: "What the dog doing?",
    points: 200,
    attachments: [
      {
        name: "vineboom.mp3",
        type: "file",
        url: "/vineboom.mp3"
      }
    ]
  },
];


const forensics: Category = {
  questions: questions,
  description: "Some Cool Description",
  category: "Forensics"
}

export default forensics;
