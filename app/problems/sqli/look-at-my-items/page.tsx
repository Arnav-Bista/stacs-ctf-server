"use client";


import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import FlagSubmissionPopover from "@/app/submit/flag-submission-popover";
import { useRouter } from "next/navigation";

interface Responses {
  name: string,
  details: string,
  price: string
}

export default function SQLiItems() {

  const router = useRouter();

  const [query, setQuery] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{errorMessage?: string, data: Responses[]} | null>(null);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const request = await fetch("/api/problems/sqli/look-at-my-items", {
        method: "POST",
        body: JSON.stringify({
          query: query,
        })
      });
      const data = await request.json();
      if (!request.ok) {
        setMessage({
          data: [],
          errorMessage: data.message || JSON.stringify(data)
        });
        return;
      }
      setMessage({
        data: data as Responses[],
        errorMessage: undefined
      })
    }
    catch (e) {
      setMessage({
        errorMessage: String(e),
        data: [],
      });
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <div className="flex gap-2 mb-4">
        <FlagSubmissionPopover />
        <Button onClick={() => router.back()}>Back</Button>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Super Cool Items!</CardTitle>
          <CardDescription>Okok I need to go fix my login page, in the mean while, how about you look at my super cool items? It's just items so I don't think this needs to be that secure right???</CardDescription>
        </CardHeader>
        <CardContent>
          <form autoComplete='off' onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="query">Search for Items</Label>
              <Input
                id="query"
                type="text"
                placeholder="Your Smile"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            {message?.errorMessage && (
              <div className="text-sm font-medium text-destructive">
                {message.errorMessage}
              </div>
            )}
            {message?.data && message.data.length > 0 && (
              <ul className="space-y-3 mt-4">
                {message.data.map((item, index) => (
                  <li key={index} className="border rounded-lg p-4">
                    <div className="font-semibold text-lg">{item.name}</div>
                    <div className="text-muted-foreground text-sm">{item.details}</div>
                    <div className="text-primary font-medium mt-1">{item.price}</div>
                  </li>
                ))}
              </ul>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
