"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FlagSubmissionPopover from "@/app/submit/flag-submission-popover";
import { useRouter } from "next/navigation";

export default function TheOracle() {
  const router = useRouter();

  const [itemName, setItemName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string, inStock: boolean } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const request = await fetch("/api/problems/sqli/the-oracle", {
        method: "POST",
        body: JSON.stringify({
          itemName: itemName,
        })
      });
      const data = await request.json();
      setMessage({ text: data.message || "Error", inStock: data.inStock });
    } catch (e) {
      setMessage({ text: String(e), inStock: false });
    } finally {
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
          <CardTitle>The Oracle's Inventory</CardTitle>
          <CardDescription>
            Check if The Oracle has mystical items in stock. Simply ask, and she will tell you if it's available...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form autoComplete="off" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="itemName">Item Name</Label>
              <Input
                id="itemName"
                type="text"
                placeholder="Crystal Ball"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>
            {message && (
              <div className={`text-sm font-medium ${message.inStock ? 'text-green-500' : 'text-muted-foreground'}`}>
                {message.text}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Checking..." : "Check Stock"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
