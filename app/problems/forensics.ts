import { Category, Question } from "./types"

const questions: Question[] = [
  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    title: "My Password v1",
    description: "I saw how this dude hid his password inside an image and showed it on stream! But this guy is a fake terminal user, he doesnt know much...",
    hints: ["Text Editor?", "placeholder fr", "cat??"],
    points: 25,
    attachments: [
      {
        name: "How Hungry...",
        type: "image",
        url: "/how-hungry.png"
      },
    ]
  },
  {
    id: "035eb28f-fc95-4f51-86f5-adb45e1238e9",
    title: "Club Classics",
    description: "The dub siren is a staple of sound system culture which has spilled into adjacent genres like jungle and UK garage.",
    points: 50,
    attachments: [
      {
        name: "wheelup.wav",
        type: "file",
        url: "/wheelup.wav"
      }
    ]
  },
  {
    id: "3c14b4dc-3149-44bc-b774-f7e59d430ca0",
    title: "OwO what's this?",
    description: "Arnav and Jake are Rustaceans, but they're bored of that nonsensical drivel! Time for something else!\nThey're better fans of shrimp anyway.\n\nRather than never touch a computer again, they have decided to put their expertise into steganography.\nApparently, they have discovered an ingenious new way to hide a flag in a PNG.\nProve them wrong and shatter their fragile egos...",
    points: 50,
    attachments: [
      {
        name: "A Pair of Cocky Bastards",
        type: "image",
        url: "/owo-whats-this.png"
      },
    ]
  },
  {
    id: "d7fb88cb-c9b9-43cf-aac0-d18a02854230",
    title: "Doxxed",
    description: "STACSDEV held a secret flag brainstorming camping trip in a remote forest - bet you can't figure out where it happened...",
    points: 25,
    attachments: [
      {
        name: "secret-forest.png",
        type: "image",
        url: "/forest.png"
      },
    ]
  },
  {
    id: "f8197d63-29d8-4400-b4ed-6b10746fe34a",
    title: "Not quite my size",
    description: "Huh? This flag was supposed to be free but the image is corrupted!\nI remember resizing it so that it had a 16:9 aspect ratio, what's gone wrong?",
    points: 100,
    attachments: [
      {
        name: "free-flag.png",
        type: "image",
        url: "/free-flag.png"
      },
    ]
  },
  {
    id: "032afa02-f28f-468a-a26d-5b2591a86141",
    title: "Bad trip :0",
    description: "Damn - I had a wild night last night... but I think I lost my flag in a haze.\nDon't take drugs kids...",
    points: 150,
    attachments: [
      {
        name: "LSB.png",
        type: "image",
        url: "/LSB.png"
      },
    ]
  },
  {
    id: "638c2889-7071-4c3e-b35a-482d44eadad5",
    title: "My ZIP's bulging??",
    description: "Hiya everyone, I've zipped up some of my favourite images, but the archive is larger than I expected.\nThere's nothing when extracting - but something seems off...",
    points: 250,
    attachments: [
      {
        name: "cashmoneyy.zip",
        type: "file",
        url: "/cashmoneyy.zip"
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
