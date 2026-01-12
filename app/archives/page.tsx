import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type Archive = {
  year: number,
  description: string,
  categories: string[]
}

export default function Archives() {

  const archive: Archive[] = [
    {
      year: 2025,
      description: `Our first ever STACS CTF. Featuring fun Steganography, Exploiting Vulnerabilities and Cracking Mathematical Codes.`,
      categories: ["Forensics", "Engineering", "Lattice", "Symmetric", "Math and Cryptography"]
    },
  ];

  return (
    <>
      <h1 className="text-4xl font-bold text-center">
        ARCHIVES
      </h1>
      <div className="max-w-screen-sm text-justify">
        Here we&apos;ll store all of our past competitions. If  you&apos;re bored, nostalgic or finished the competition early, come check these out!
        <p className="text-sm text-muted-foreground mt-2 text-justify">
          Note that some of the questions may have their own mini server deployed (such as the Oracle from 2025), this may or may not be up.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-screen-lg w-full">
        {
          archive.map((entry, i) => (
            <Card key={`category-${i}`} className="w-full max-w-lg" >
              <CardHeader>
                <CardTitle>{`STACS CTF ${entry.year}`}</CardTitle>
                <CardDescription className="whitespace-pre-line break-words text-wrap">
                  {entry.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <h2>Categories</h2>
                <div className="flex flex-wrap gap-4">
                  {
                    entry.categories.map((category, i) => (
                      <div key={i} className="flex-1 p-2 rounded bg-muted w-min h-min text-nowrap text-center">
                        {category}
                      </div>
                    ))
                  }
                </div>
                <Link href={`/archives/${entry.year}`} className="w-full">
                  <Button className="w-full">View</Button>
                </Link>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </>
  );
}
