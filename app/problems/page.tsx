import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { getCategoryMetadata } from "./problems";

export default function Page() {
  const categories = getCategoryMetadata();

  return (
    <>
      <h1 className="text-4xl font-bold text-center">PROBLEM CATEGORIES</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-screen-lg w-full">
        {categories.map((category, i) =>
          <Card key={`category-${i}`} className="w-full max-w-lg" >
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
              <CardDescription className="whitespace-pre-line break-words text-wrap">
                {category.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span>{category.questionCount} Questions</span>
                <span>{category.totalPoints} Points</span>
              </div>
              <Link href={`/problems/${category.slug}`} className="w-full">
                <Button className="w-full">View</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
      <div>
        <Link href="/">
          <Button>Back</Button>
        </Link>
      </div>
    </>
  );
}
