
import { CardCode } from "@/components/ui/card";
import { Category, Question } from "./types"

const questions: Question[] = [
  {
    id: "5a6b7c8d-9e0f-491b-2c3d-4e5f6a7b8c9d",
    title: "The Beginning",
    description: (
      <p>

        <strong>The Testament of Sir Edwin, Knight of Brade</strong>
        <br />
        Sir Edwin, Knight of Brade, doth meet his end,
        <br />
        His armor cracked, his banner torn asunder.
        <br />
        Upon the cold stone wall, he bids transcend
        <br />
        His final breath — a riddle wrapped in wonder.
        <br />
        <br />

        "O ye who trespass through this hallowed keep,
        <br />
        Where pawns of black and white stand ever guard,
        <br />
        Their faces wrought not flesh, but symbols deep —
        <br />
        Each glyph a cipher, every line a shard.
        <br />
        <br />

        Seek not the crown that sits upon the first,
        <br />
        Nor chase the echo of a sovereign's name;
        <br />
        But cast thine eyes where lesser men have cursed,
        <br />
        The final type doth end the ancient game.
        <br />
        <br />

        Where ASCII's art doth bow and take its leave,
        <br />
        The last word spoke is all ye shall receive."
      </p>
    ),
    // hints: ["Text Editor?"],
    points: 0,
  },
  {
    id: "5a6b7c8d-9e0f-491b-353d-4e5f6a7b8c9d",
    title: "The Middle",
    description: (
      <CardCode className="text-transparent">
        {
`
SSSTSSTSTS
T
SSSSSTSSSSTT
T
SSSSSTSSSSS
T
SSSSSTTSSST
T
SSSSSTSTTTS
T
SSSSSTTSSST
T
SSSSSTTSTST
T
SS

`
        }
      </CardCode>
    ),
    // hints: ["Text Editor?"],
    points: 0,
    lockedPassword: "load 500",
    lockedHint: "The previous answer"
  },
  {
    id: "5a6b7c8d-9e0f-491b-3c3d-4e5f637b8c9d",
    title: "The Middle 2 Electric Bogalooo",
    description: "",
    // hints: ["Text Editor?"],
    points: 0,
    lockedPassword: "load 500",
    lockedHint: "The previous answer"
  },
  {
    id: "5a6b7c8d-9e0f-431b-3c3d-4e5f6a7b8c9d",
    title: "The End",
    description: "",
    // hints: ["Text Editor?"],
    points: 250,
    lockedPassword: "load 500",
    lockedHint: "The previous answer"
  },
];


const arg: Category = {
  questions: questions,
  description: "Let's go on an adventure",
  category: "ARG"
}

export default arg;
