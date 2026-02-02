import { Category, Question } from "./types"

// Engineering/programming challenges from various CTF categories
const questions: Question[] = [
  {
    id: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
    title: "SQLi v1 - Broken Login",
    description: "Day 1 of doing SQL. Just watched my first lecture from AYS (Academy of Youtube Shorts). I have secured my website so no one but those with a username AND a password can login!!",
    link: "/problems/sqli/broken-login",
    points: 20,
    hints: ["No bro just google SQL Injection"]
  },
  {
    id: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
    title: "SQLi v1 - My Super Cool Items!",
    description: "Day 2 from AYS! My login got bypassed >:( I've disabled the login for now while I fix it. In the meantime, check out my product catalog! At least this endpoint is safe - it only reads from the products table. Not like anyone could access the users table from here... that'd be ridiculous!",
    link: "/problems/sqli/look-at-my-items",
    points: 200,
  },
  {
    id: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a",
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
    id: "e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b",
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
