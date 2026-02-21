
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
    lockedPassword: "JP 77",
    lockedHint: "The previous answer"
  },
  {
    id: "5a6b7c8d-9e0f-491b-3c3d-4e5f637b8c9d",
    title: "The Middle 2 Electric Bogalooo",
    description: (
      <p>
        <strong>Excerpt from Sir Edwin's Diary</strong>
        <br />
        <br />

        Heare I sitte, broken of spirite,
        <br />
        Mine bowels promised what they dared not write.
        <br />
        A throne of stone, a kingdom small,
        <br />
        Yet nought descendeth — nothing at all.
        <br />
        <br />

        Now hear me, pilgrim, thou who reads
        <br />
        These words whilst tending to thy needs:
        <br />
        A path there lies beyond this wall,
        <br />
        But first, the riddle of the stall.
        <br />
        <br />

        Three knights rode forth from Londontowne,
        <br />
        The first bore pepper, wore a crown.
        <br />
        The second carried leaf of bay,
        <br />
        The third bore turmeric, gold as day.
        <br />
        <br />

        They sought a witch of Eastern lore,
        <br />
        Who stirred a cauldron none ignore.
        <br />
        She hath no name in Western tongue,
        <br />
        But every traveller hath her sung.
        <br />
        <br />

        Cry out — but not in vain, dear friend,
        <br />
        Append the sound that doth not end.
        <br />
        When hounds give chase, they rush, they scurry —
        <br />
        Remove the head and what's the flurry?
        <br />
        <br />

        What word unites the riders three
        <br />
        With what the witch doth brew for thee?
        <br />
        Speak not aloud — inscribe the path,
        <br />
        A slash before, then face the wrath.
        <br />
        <br />

        For he who sitteth here too long
        <br />
        Shall never hear the pilgrim's song.
        <br />
        Rise now, and seek — thy quest won't tarry.
        <br />
        The answer waits beyond the —
      </p>
    ),
    // hints: ["Text Editor?"],
    points: 0,
    lockedPassword: "nomadic-monad",
    lockedHint: "The previous answer"
  },
  {
    id: "5a6b7c8d-9e0f-431b-3c3d-4e5f6a7b8c9d",
    title: "The End",
    description: "We want you to take a photo of you/your team, recreating a famous meme, goofy pose, anything! We just want some memories and a good laugh.\n\nCome show us and we'll give you a flag.",
    // hints: ["Text Editor?"],
    points: 400,
    lockedPassword: "endofunctor",
    lockedHint: "The previous answer"
  },
];


const arg: Category = {
  questions: questions,
  description: "Let's go on an adventure",
  category: "ARG"
}

export default arg;
