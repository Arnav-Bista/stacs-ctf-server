import Page from "./page";

export enum Category {
  FORENSICS = "forensics",
  MISC = "misc",
  ENGINEERING = "engineering",
  MATH = "math-and-cryptography",
  LATTICE = "lattice",
  SYMMETRIC = "symmetric",
}

export interface Attachment {
  name: string;
  type: 'image' | 'file';
  url: string;
}

export interface RequestFormat {
  type: 'json' | 'text' | 'binary';
  example?: string;
}

export interface API {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  requestFormat?: RequestFormat;
}

export type Question = {
  category: Category;
  title: string;
  description: string;
  hints?: string[];
  points: number;
  attachments?: Attachment[];
  link?: string;
  api?: API;
  lockedPassword?: string;
  lockedHint?: string;
}

// I know this isnt the best way of doing it, but im a lil lazy to think of a more efficient way 

export const questions: Question[] = [
  {
    title: "My Password v1",
    description: "I saw how this dude hid his password inside an image and showed it on stream!",
    // hints: ["Text Editor?"],
    points: 50,
    category: Category.FORENSICS,
    attachments: [
      {
        name: "How Hungry...",
        type: "image",
        url: "/how-hungry.png"
      },
    ]
  },
  {
    title: "My Password v2",
    description: "Time for a little more security!",
    points: 250,
    category: Category.FORENSICS,
    attachments: [
      {
        name: "lsd? is that allowed?",
        type: "image",
        url: "/lsd.png"
      }
    ]
  },
  {
    title: "My Password v3",
    description: "You might think you're smart for solving the previous puzzle, but try this!\nI've mixed my orignal password with the obfuscation_img provided, and now my password is completely invisible!!\nNot so easy now, huh?",
    hints: [
      "Use the python Pillow library for image processing."
    ],
    points: 250,
    category: Category.FORENSICS,
    attachments: [
      {
        name: "Encrypted Flag",
        type: "image",
        url: "/encrypted_flag.png"
      },
      {
        name: "Obfuscation Image",
        type: "image",
        url: "/obfuscation_image.png"
      }
    ]
  },
  {
    title: "DOXX THIS B****!",
    description: "I may have flamed a bit to hard in my ranked game...",
    points: 150,
    category: Category.FORENSICS,
    attachments: [
      {
        name: "Sky",
        type: "image",
        url: "/sky.jpg"
      }
    ]
  },
  {
    title: "Newjeans? Yeah I've heard of them...",
    description: "I bought these new jeans the other day from my black market connection, where is the contraband flag that I ordered? \nI called back but the dunce didn't pick up and told me I've already got it???? \n\nHelp me out here please!",
    points: 300,
    category: Category.FORENSICS,
    // hints:
    //   ["We already have the flag? It must be in the jeans!",
    //     "I guess I'll turn them inside out... Huh? There's an extra zipper?"
    // ],
    attachments: [
      {
        name: "newjeans.png",
        type: "image",
        url: "/newjeans.png"
      }
    ]
  },
  {
    title: "https://us-tuna-sounds-images.voicemod.net/5b23cd9b-0c2d-471f-8589-9e6bdee73d4c-1680393318917.jpeg",
    description: "What the dog doing?",
    points: 200,
    category: Category.FORENSICS,
    attachments: [
      {
        name: "vineboom.mp3",
        type: "file",
        url: "/vineboom.mp3"
      }
    ]
  },
  {
    title: "Basic Authentication",
    description: "Checkout this basic authentication system I made in C! It's super secure, I promise!\n\n Checksum for nerds (not part of the problem): \n915516d7d0c5b3b13093d3130d56db3889617d0ece655ff40e1080bc6d49e2d1  basic-auth",
    points: 100,
    category: Category.ENGINEERING,
    attachments: [
      {
        name: "basic-auth",
        type: "file",
        url: "/basic-auth"
      }
    ]
  },
  {
    title: "gcvc'z i sypt pizxi",
    description: "",
    points: 150,
    category: Category.MATH,
    attachments: [
      {
        name: "syptpizxi.txt",
        type: "file",
        url: "/syptpizxi.txt"
      }
    ]
  },
  {
    title: "Chinese Remainder Theorem",
    description: "The Chinese Remainder Theorem is the basis for Ring encryption, a vital process which allows for untracable repudiation (say for whistleblowers), it gives a unique solution to a system of linear congruences, provided that the moduli of said congruences are coprime.\n\n\nI.e. Given a set of arbitrary integers a_i, and a set of pairwise coprime integers p_i, given the following linear congruences hold:\n\n    x = a_1 mod p_1\n    x = a_2 mod p_2\n    x = a_3 mod p_3\n        ...\n    x = a_n mod p_n\n\nWe can get a solution: x = a mod N, where N is p_1 * p_2 * p_3 * ... * p_n.\n\n\nGiven the following congruences:\n\n    x = 4 mod 5\n    x = 5 mod 17\n    x = 34 mod 37\n\nFind the values of x & a such that: x = a mod 3145, and x satisfies the given congruences. \n\nProvide your answer in the form 'x = N, a = M'",
    points: 200,
    category: Category.MATH
  },
  {
    title: "\"Encryption\"",
    description: "I've just encrypted the flag!!1!!1 I bet you can't do anything with the cipher text!\n\nYou know what, here it is: ZmxhZ197YmFzZTY0LWlzLW5vdC1lbmNyeXB0aW9ufQ== ",
    points: 100,
    category: Category.MATH,
    attachments: [
      {
        name: "Hint",
        type: "file",
        url: "/hint.png"
      }
    ]
  },
  {
    title: "SQLi v1",
    category: Category.ENGINEERING,
    description: "This is my first time learning SQL, checkout this simple auth page I made!\nBut it'll be of no use to you since you dont know my credentials 😎",
    link: "/archives/2025/sqli/basic-auth",
    points: 150,
  },
  {
    title: "SQLi v2",
    category: Category.ENGINEERING,
    description: "So can login and bypass the authentication system... but can you find the flag?\n\nUse this login:\ntester\npassword",
    hints: ["It's a sqlite database"],
    link: "/archives/2025/sqli/tables",
    points: 300,
  },
  {
    title: "SQLi v3",
    category: Category.ENGINEERING,
    description: "You've just gotten news that someone else is changing their password...\n\nUse this login:\ntester\npassword",
    hints: ["🔫"],
    link: "/archives/2025/sqli/stealer",
    points: 400,
  },
  {
    title: "Buffers v1",
    category: Category.ENGINEERING,
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
    title: "Buffers v2",
    category: Category.ENGINEERING,
    description: "Wait I can rewrite variables with overflow??\n\n Compiled using the following:\n gcc -o buffers2 -fno-stack-protector -z execstack -no-pie buffers.c",
    points: 450,
    api: {
      endpoint: "/api/archives/2025/buffers",
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
    title: "Buffers v3",
    category: Category.ENGINEERING,
    description: "The win function is never called, what are you going to do about it?\n\n Compiled using the following:\n gcc -o buffers3 -fno-stack-protector -z execstack -no-pie buffers.c",
    points: 500,
    api: {
      endpoint: "/api/archives/2025/buffers",
      method: "POST",
      description: "Send your payload to the buffer overflow challenge. The payload will be passed to the program via stdin.",
      requestFormat: {
        type: "json",
        example: '{ "question": "buffers3", "payload": "Slim Shady" }'
      },
    },
    attachments: [
      {
        name: "Source Code",
        type: "file",
        url: "/buffers/buffer3.c"
      }
    ]
  },
  {
    title: "The Gram-Schmidt process",
    category: Category.LATTICE,
    description: "Lattices are formed using a set of 'basis vectors', and each point in a lattice is found using a linear combination of these basis vectors.\n\n The simplest lattice would be one where the points are orthogonal to one another, where all the point's inner products equal 0, this is called an 'orthogonal basis'.\n If all the vectors are unit vectors as well, the basis is an 'orthonormal basis'.\n We can generate an orthonormal basis from any set of non-orthogonal, non-unit vectors via an algorithm called the Gram-Schmidt process.\n\n Research and write code to produce an orthonormal basis for these vectors, using the Gram-Schmidt process.\n [3, 4, 0, -2]\n [2, -3, 1, 4]\n [1, 0, 7, 9]\n [6, 1, -1, -5]\n\n The flag is the first 7 significant digits, of the first component, of the fourth vector in the final basis. \n\n DO NOT ROUND YOUR ANSWER.",
    // hints:
    //   ["Try first to generate an *orthogonal* basis, before an orthonormal basis.",
    //     "Create separate functions for vector-vector operations and scalar-vector operations.",
    //     "Wikipedia is your friend."],
    points: 250
  },
  {
    title: "Gaussian Reduction",
    category: Category.LATTICE,
    description: "Recommended to attempt the 'Gram-Schmidt' question before this one.\n\n When attempting to solve the Learning with Errors problem in a lattice, a lot of the difficulty comes from an 'inoptimal basis'.\n Other than the communicating parties using this cryptosystem, no-one will have access to an optimal (not necessarily orthogonal/orthonormal) basis for the lattice which will reduce the complexity of solving the problem.\n\n A way of computing an near-optimal basis from an arbitrary basis is the process of 'Lattice Reduction'.\n 'Gaussian Reduction' is a process to find an optimal basis for a 2-dimensional lattice.\n\n Research Gaussian Reduction, and find the optimal basis for these two basis vectors:\n [8468127585,983815398552]\n [875020913,123094942980]\n\n The flag for this question is the inner product of the two new basis vectors.",
    points: 250
    // hints:
    //   ["Gaussian reduction requires an algorithm to be carried out sequentially on each vector. Split up the process into functions.",
    //     "Again, Wikipedia is your friend."]
  },
  {
    title: "I can write comments?!",
    description: "Mausemaster from 2m2t (2 mause 2 tools) just made a new comment section which he will be checking!",
    points: 250,
    link: "/archives/2025/web/tokens",
    category: Category.ENGINEERING
  },
  {
    title: "THERE CAN ONLY BE ONE",
    description: "I've always wondered why people use the product of two primes as a modulus for RSA. \nWouldn't it be *so much*, literally twice as simple if we just used one? \nThink about all that sweet processing power we'd save. Why has no one thought of this?? \n\nI bet you can't get my flag from this encrypted ciphertext. \nI'll even give you the prime modulus I'm that confident! \n\nExponent: \ne = 65537 \n\nPrime Modulus: \nn = 171731371218065444125482536302245915415603318380280392385291836472299752747934607246477508507827284075763910264995326010251268493630501989810855418416643352631102434317900028697993224868629935657273062472544675693365930943308086634291936846505861203914449338007760990051788980485462592823446469606824421932591 \n\nEncrypted Ciphertext: \n13829909971889644924790568818571784528797417477792978927034694285330969327915990825983910776123122360054812019973736417749652884278423148745913808564996953719743791174719326978138722252297395877091537757360608498139227274417309049643225326140020616249558538065652338412499938849688963840148765702790180654815 \n\nAfter you have decrypted the ciphertext, convert the string of numbers into bytes to retrieve the flag!",
    points: 500,
    category: Category.MATH
  },
  {
    title: "Sometimes bigger is definitely better...",
    description: "I'm planning on implementing RSA into my system, but since I have an unhealthy distrust in authority and a raging ego - I'm not going to listen whatsoever to the advice to use 2048 bits of security. \n\nMy program uses two 100 bit primes and an 8 bits exponent for a total of 1600 bits of security. \nBeat that NIST. \n\nModulus n: \n984994081290620368062168960884976209711107645166770780785733 \n\nExponent e: \n65537 \n\nCiphertext: \n915674621072223460624529383442331899587647161451973453046598 \n\n\nOnce you have decrypted the ciphertext, convert it from a long into bytes to retrieve the flag.",
    points: 500,
    category: Category.MATH
    // hints:
    //   ["Recommended to use PyCryptoDome and FactorDB for this question. The long_to_bytes and bytes_to_long function from PyCryptoDome are good for that specific conversion."]
  },
  {
    title: "Just hashing it out",
    description: "I've built an AES_ECB encryption system that uses MD5 hashing to make my short keys harder to figure out!\n Because of this, I only have to use one word from my dictionary so I can cut costs on SSDs... Take that Big M.2!\n\n I bet you can't extract my key from this ciphertext:\n 8f3512874323615b95e3d48ba2b6f7f431dbbfff0322b1b29d3ac97c475b0f3afa4dac39426b8a7ef6dbaf6ea179599abb626e8d334e9fd8d3fd071305feaaee\n\n My ultra secret dictionary would be here, I'm feeling weirdly cocky and arrogant today. But mom said no so nah.",
    points: 250,
    category: Category.SYMMETRIC,
    hints: [
      "Use PyCryptoDome library for AES functions - 'pip install pycryptodome'",
      "Use hashlib for MD5, included in standard library - 'import hashlib'"
    ]
    // attachments: [
    //   {
    //     type: "file",
    //     name: "dict.txt",
    //     url: "/dict.txt"
    //   }
    // ]
  },
  {

    title: "Scry the bones",
    description:
      "I bet you can't crack *this* AES implementation. \nThis time I won't even provide possible keys! \n\nI will however provide this oracle api :)",
    points: 400,
    category: Category.SYMMETRIC,
    // hints: [
    //   "The padding in the encryption is very important",
    //   "Explore how it relates to ECB mode of AES and how this might affect the final output from encryption",
    //   "You don't need to worry about the key, only the flag..."
    // ],
    attachments: [
      {
        type: "file",
        name: "The encryption function in question",
        url: "/encrypt.py"
      }
    ],
    api: {
      method: "POST",
      endpoint: "/aes-oracle",
      description: `A Flask server is running the encryption function. Send your payload to the server to get the encrypted payload


Send your data in this format: bytes.hex(your_data_here.encode())


Then send as a json using: requests.post(url, json = your_json_here)`,
      requestFormat: {
        type: "json",
        example: '{ "data": "datayouwantencrypted" }'
      }
    }
  },
  {
    title: "Cool picture, bro",
    description: "Friend of mine just sent me this picture, bro said he wants a number...",
    points: 150,
    category: Category.MISC,
    attachments: [
      {
        name: "picture.png",
        type: "image",
        url: "/picture.png"
      }
    ]
  },
  {
    title: "Uncrackable",
    points: 150,
    category: Category.SYMMETRIC,
    description: `I've just learnt about this mathematically uncrackable system! Its literally foolish to try and solve it!!!

You know what? To rub salt in the wound, I'll even give you another one! 😎`,
    attachments: [
      {
        type: "image",
        name: "cipher1.png",
        url: "/cipher1.png"
      },
      {
        type: "image",
        name: "cipher2.png",
        url: "/cipher2.png"
      }
    ]
  },
  {
    title: "Insecure Transmission",
    description: `Thanks to your efforts in cracking the encryption systems, we've been able to get a hold of some super high level secrets...`,
    points: 0,
    category: Category.SYMMETRIC,
    lockedPassword: "hashingseemsits",
    lockedHint: "Take the first word inside the curly brackets of each flag and concatenate them together.",
    attachments: [
      {
        type: "file",
        name: "R̴̜̹̂̈̕2̷̛̣̗̉̚9̸̳̟̠̈́͐̾v̶͍̑̽͜͝ͅẐ̸̪͗̈́ͅn̵̩͑̈́l̴̳̩̆̕H̸̪̺̄̌͝ċ̵̢̽͌m̸̩̟̘̓̎9̴̠̦͋v̸̞̗̗̍͌͝Ŷ̶̨̹̮̋m̶̱͖̞̌V̷̠̱̎̇̓ỵ̷̨̜̿",
        url: "/transmission-symmetric.txt"
      }
    ]
  },
  {
    title: "Decrypted Photocopy",
    description: `We were waiting for someone with the forensics investigation skills to help us with this document.`,
    points: 0,
    category: Category.FORENSICS,
    lockedPassword: "ssgbmh",
    lockedHint: "Take the first character inside the curly brackets of each flag and concatenate them together. In the case that the flag is not a string, take the first digit of each number.",
    attachments: [
      {
        type: "file",
        name: "R̵͓͜͠3̸̝͎͐̒̾J̵͇̭̒̒͑v̷̺͔͋̇b̵̬͒̎2̷̡̩̽̿̂J̵̘̘̈́̀̀ḽ̷͔̓̽c̵̩͂ͅk̵̯̿̉d̴̫̤̀ͅv̴͇͈̾b̵̨͔̆͂̾2̷͎̄͋Z̷͈̲͇̓͊5̴͖̍̓͘",
        url: "/transmission-forensics.txt"
      }
    ]
  },
  {
    title: "Breaking Lattice",
    description: `The numbers Mason, what do they mean?`,
    points: 0,
    category: Category.LATTICE,
    lockedPassword: "8250585890883507031664608",
    lockedHint: "Concatenate the two flags together.",
    attachments: [
      {
        type: "file",
        name: "Q̴̢̕m̷̳͑̾̅l̴̤͇͇̒s̵̜͇͗̐b̴̭̻̀̂͝Ḥ̸̉̈́̾ļ̶̝̓Ṭ̵̹͇͝a̷̞̰̠̎Ẅ̵͍͜x̸̛̞̋̏s̸̮̟͐͆e̵̍͌̅ͅQ̷̢̡̯͌≠͚̀≠̺̔̔",
        url: "/transmission-lattice.txt"
      }
    ]
  },
  {
    title: "Mathing Around",
    description: `We've got some math problems that need solving!`,
    points: 0,
    category: Category.MATH,
    lockedPassword: "d91bds",
    lockedHint: "Take the first character inside the curly brackets of each flag and concatenate them together. In the case that the flag is not a string, take the first digit of each number.",
    attachments: [
      {
        type: "file",
        name: "Ṷ̸̿̓2̶͔̥͆ͅl̶̢̗̲̑́̄ṡ̵͉̬͠b̸͔̔͋̈́ͅH̵̪͍̼͝͝l̶̘̼̑C̵̲͚̕͜å̵̩̙͕Ẅ̴̞͙̀x̸͎͋̃s̵̤̩͘ẻ̵̢̫̈́̆Q̶̱̘̄̈́=̴̥͓͓͊=̷̘̹̿̃̂",
        url: "/transmission-math.txt"
      }
    ]
  }

];
