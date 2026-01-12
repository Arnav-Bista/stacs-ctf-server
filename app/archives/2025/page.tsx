import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


import { Category, questions } from "./questions";

const categoryInfo = [
  {
    id: Category.FORENSICS,
    name: 'Forensics',
    description: 'Analyze digital evidence and extract hidden information.',
    link: '/archives/2025/forensics',

  },
  {
    id: Category.ENGINEERING,
    name: "Engineering",
    description: "Understanding exploits, vulnerabilities, and reverse engineering.",
    link: '/archives/2025/engineering',

  },
  {
    id: Category.LATTICE,
    name: "Lattice",
    description: "Lattice cryptography is the foundation for almost all new cryptosystems which are designed to be Quantum-Safe.\n The 'Learning with Errors' problem upon which its security is based involves finding the closest lattice point in an N-dimensional space to a given target point.\n\nRead more online at \n- https://cims.nyu.edu/~regev/papers/lwesurvey.pdf \n- https://www.youtube.com/watch?v=QDdOoYdb748",
    link: '/archives/2025/lattice'

  },
  {
    id: Category.SYMMETRIC,
    name: "Symmetric",
    description: "Symmetric cryptography is a type of encryption where only one key (a secret key) is used to both encrypt and decrypt information.",
    link: '/archives/2025/symmetric',
  },
  {
    id: Category.MATH,
    name: "Math and Cryptography",
    description: "Tackle mathematical backbones of cryptography.",
    link: '/archives/2025/math-and-cryptography',

  },

  // {
  //   id: Category.MISC,
  //   name: "Misc",
  //   description: "Anything that doesn't fit in the other categories.",
  //   link: '/archives/2025/misc',
  //   
  // }
];

const categories = categoryInfo.map(category => {
  const categoryQuestions = questions.filter(q => q.category === category.id);
  const totalPoints = categoryQuestions.reduce((sum, q) => sum + q.points, 0);

  return {
    ...category,
    totalPoints,
    questionCount: categoryQuestions.length
  };
});
export default function Page() {
  return (
    <>
      <h1 className="text-4xl font-bold text-center">PROBLEM CATEGORIES</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-screen-lg w-full">
        {
          categories.map((category, i) => (
            <Card key={`category-${i}`} className="w-full max-w-lg" >
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription className="whitespace-pre-line break-words text-wrap">
                  {category.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span>{category.questionCount} Questions</span>
                  <span>{category.totalPoints} Points</span>
                </div>
                <Link href={category.link} className="w-full">
                  <Button className="w-full">View</Button>
                </Link>
              </CardContent>
            </Card>
          ))
        }
      </div>
      <div>
        <Link href="/">
          <Button>Back</Button>
        </Link>
      </div>
    </>
  );
}
