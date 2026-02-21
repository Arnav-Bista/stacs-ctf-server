import { Category, Question } from "./types"

// Engineering/programming challenges from various CTF categories
const questions: Question[] = [
  {
    id: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
    title: "SQLi v1 - Broken Login",
    description: "Day 1 of doing SQL. Just watched my first lecture from AYS (Academy of Youtube Shorts). I have secured my website so no one but those with a username AND a password can login!!",
    link: "/problems/sqli/broken-login",
    points: 25,
    hints: ["No bro just google SQL Injection"]
  },
  {
    id: "f7a8b9c0-d1e2-4f3a-5b6c-7d8e9f0a1b2c",
    title: "SQLi v2 - My Messages",
    description: "Day 4 of AYS! I learned about 'parameterized queries' from the comments section (thanks hackers!). Now I'm using them EVERYWHERE for user registration - 100% SQLi proof! Built a secure messaging system where users can view their personal messages. Since the username is stored safely in the database, it's totally safe to use it in queries later, right? What could possibly go wrong?",
    link: "/problems/sqli/my-messages",
    points: 100,
    hints: [
      "The registration is secure, but what about when your username is used later?",
      "Think about what happens when stored data becomes part of a query"
    ]
  },
  {
    id: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
    title: "SQLi v3 - My Super Cool Items!",
    description: "Day 2 from AYS! My login got bypassed >:( I've disabled the login for now while I fix it. In the meantime, check out my product catalog! At least this endpoint is safe - it only reads from the products table. Not like anyone could access the users table from here... that'd be ridiculous!",
    link: "/problems/sqli/look-at-my-items",
    points: 175,
  },
  {
    id: "ede6dff9-0936-4a52-8dc7-c705caa8b85c",
    title: "SQLi v4 - The Oracle",
    description: (
      <>
        <p>
          Day 3 of AYS! I've pivoted to a new business - mystical item shop! Now users can check if items are in stock. YoutubeGPT told me to "limit information exposure" so now I only return YES or NO - no actual data! This means hackers can't steal my data anymore right? Much secure, very production!
        </p>
      </>
    ),
    link: "/problems/sqli/the-oracle",
    points: 400,
    hints: [
      "Honestly? For the first hint i'll just tell you that 'Ancient Scroll' is one of the items (not really a hint)"
    ]
  },
  {
    id: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a",
    title: "Buffers v1",
    description: "My mate dared me to write a C program asking the most important question known to mankind. He said the code was unbreakable. He was wrong.\n\n Compiled using the following:\n gcc -o buffers1 -fno-stack-protector -z execstack -no-pie buffers.c",
    points: 50,
    api: {
      endpoint: "/api/problems/buffers",
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
    id: "5ad271a3-cb3b-4e4f-8169-a7aa0c53c30a",
    title: "Buffers v2",
    description: "I upgraded my survey with a COMPLETELY UNCRACKABLE check this time. There is no way you are getting past a specific magic number check. No way.\n\n Compiled using the following:\n gcc -o buffers2 -fno-stack-protector -z execstack -no-pie buffers.c",
    points: 150,
    api: {
      endpoint: "/api/problems/buffers",
      method: "POST",
      description: "Send your payload to the buffer overflow challenge. The payload will be passed to the program via stdin.",
      requestFormat: {
        type: "json",
        example: '{ "question": "buffers2", "payload": "Yes! I love cats!" }'
      },
    },
    attachments: [
      {
        name: "Source Code",
        type: "file",
        url: "/buffers/buffer2.c"
      }
    ]
  },
  {
    id: "302e2189-1fd0-44ed-acb5-65a684fd90af",
    title: "Buffers v3",
    description: "Okay maybe turning off the stack protection was bad, well I'm not even gonna try to get better at writing code so I'm gonna use mprotect(.., PROT_NONE) around my allocations to keep you HACKERS out of my server",
    points: 300,
    api: {
      endpoint: "https://jcbg1.teaching.cs.st-andrews.ac.uk/ctf/mem",
      method: "POST",
      description: "Send your payload to my C webserver, I even wrote the HTML form parser myself. Don't even think about buffer overflows!",
      requestFormat: {
        type: "application/x-www-form-urlencoded",
        example: 'username=me&password=shhhh'
      },
    },
    attachments: [
      {
        name: "Source Code",
        type: "file",
        url: "/buffers/buffer3-mprotect.c"
      }
    ]
  },
  {
    id: "6179193a-5287-4a75-b55e-e01a2cddcb13",
    title: "Buffers v4",
    description: "The win function is never called, what are you going to do about it?\n\n Compiled using the following:\n gcc -o buffers4 -fno-stack-protector -z execstack -no-pie buffers.c",
    points: 500,
    api: {
      endpoint: "/api/problems/buffers",
      method: "POST",
      description: "Send your payload to the buffer overflow challenge. The payload will be passed to the program via stdin.",
      requestFormat: {
        type: "json",
        example: '{ "question": "buffers4", "payload": "Slim Shady" }'
      },
    },
    attachments: [
      {
        name: "Source Code",
        type: "file",
        url: "/buffers/buffer4.c"
      }
    ]
  },
  {
    id: "e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b",
    title: "Yes, read my clean thoughts.",
    description: "The admins wants to know your thoughts through commenting. But maybe too much freedom in how you can comment stuff...",
    points: 150,
    link: "/problems/clean-thoughts",
  },
  {
    id: "2804906d-dfc9-445e-b0dc-0a94a75823fb",
    title: "Paper Trail",
    hints: [
      "alice & alice123"
    ],
    description: "Someone left the filing cabinet unlocked. Not every document is meant for your eyes — but that's never stopped anyone before.",
    points: 350,
    link: "/problems/paper-trail"
  },
  {
    id: "f56e4c05-f024-4dad-8a10-37cb124e586e",
    title: "Strong <strike>passwords</strike> usernames",
    description: "Since I didn't tell anyone my username, surely it's secure. Do you not think I'm a good engineer?",
    points: 50,
    link: "https://jcbg1.teaching.cs.st-andrews.ac.uk/ctf/otp/code/your-username"
  },
  {
    id: "6cf36663-df57-473f-8b34-55f5d712efe2",
    title: "One factor is better than two",
    description: "Even if you did know my username, my slick new web app skips old boring passwords and lets you login quickly via email. Less friction, more security, What could possibly go wrong?",
    points: 150,
    link: "https://jcbg1.teaching.cs.st-andrews.ac.uk/ctf/otp/code/your-username"
  }
];


const engineering: Category = {
  questions: questions,
  description: "Programming challenges including web security, buffer overflows, and SQL injection.",
  category: "Engineering"
}

export default engineering;
