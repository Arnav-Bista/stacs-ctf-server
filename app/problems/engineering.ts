import { Category, Question } from "./types"

// Engineering/programming challenges from various CTF categories
const questions: Question[] = [
  {
    id: 2,
    title: "SQLi v1",
    description: "Day 1 of doing SQL. Just watched my first lecture from AYS (Academy of Youtube Shorts). I have secured my website so no one but those with a username AND a password can login!!",
    link: "/problems/sqli/broken-login",
    points: 100,
  },
  {
    id: 3,
    title: "Buffers v1",
    description: "Nothing is impossible in C\n\n Compiled using the following:\n gcc -o buffers1 -fno-stack-protector -z execstack -no-pie buffers.c",
    points: 50,
    api: {
      endpoint: "/api/archives/2025/buffers",
      method: "POST",
      description: "Send your payload to the buffer overflow challenge. The payload will be passed to the program via stdin.",
      requestFormat: {
        type: "json",
        example: '{ "question": "buffers1", "payload": "Yes, I happen to actually like them!" }'
      },
    },
    attachments: [
      {
        name: "Source Code",
        type: "file",
        url: "/buffers/buffer1.c"
      }
    ]
  },
  {
    id: 4,
    title: "I can write comments?!",
    description: "Mausemaster from 2m2t (2 mause 2 tools) just made a new comment section which he will be checking!",
    points: 250,
    link: "/archives/2025/web/tokens",
  },
];


const engineering: Category = {
  questions: questions,
  description: "Programming challenges including web security, buffer overflows, and SQL injection.",
  category: "Engineering"
}

export default engineering;
