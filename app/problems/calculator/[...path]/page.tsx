"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface CalcSuccess {
    answer: number;
    flag?: string;
    message?: string;
}

export default function Calculator() {
    const router = useRouter();

    const [a, setA] = useState<string>("");
    const [b, setB] = useState<string>("");
    const [op, setOp] = useState<"Add" | "Sub" | "Mul" | "Div">("Add");
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<CalcSuccess | null>(null);
    const [error, setError] = useState<{ code: number; text: string } | null>(null);

    async function handleSubmit(e: any) {
        e.preventDefault();
        setResult(null);
        setError(null);
        setIsLoading(true);

        try {
            const payload = {
                operand1: a,
                operand2: b,
                operation: op,
            };

            // Choise the url based on the url path
            // Choose the url based on the current path (easy/medium/hard)
            const pathname = typeof window !== "undefined" ? window.location.pathname : "";
            let url = "/api/proxy/calculatorone";
            if (/\/easy(\/|$)/.test(pathname)) {
                url = "/api/proxy/calculatorone";
            } else if (/\/medium(\/|$)/.test(pathname)) {
                url = "/api/proxy/calculatortwo";
            } else if (/\/hard(\/|$)/.test(pathname)) {
                url = "/api/proxy/calculatorthree";
            }

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const text = await res.text();
                setError({ code: res.status, text });
                return;
            }

            const data = (await res.json()) as CalcSuccess;
            setResult(data);
        } catch (e) {
            setError({ code: 0, text: String(e) });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative">
            <div className="flex gap-2 mb-4">
                <Button onClick={() => router.back()}>Back</Button>
            </div>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Very Good Calculator</CardTitle>
                    <CardDescription>MMMM Cookie Calculator, me like cookies, yum yum cookies!!</CardDescription>
                    {/* Image of cookie monster */}
                    <img src="/cookiemonster.jpg" alt="Cookie Monster" className="w-24 h-24 mx-auto" />
                </CardHeader>
                <CardContent>
                    <form autoComplete="off" onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="a">Operand A</Label>
                            <Input
                                id="a"
                                name="a"
                                type="number"
                                inputMode="decimal"
                                placeholder="Enter number a"
                                value={a}
                                onChange={(e) => setA(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="b">Operand B</Label>
                            <Input
                                id="b"
                                name="b"
                                type="number"
                                inputMode="decimal"
                                placeholder="Enter number b"
                                value={b}
                                onChange={(e) => setB(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="op">Operation</Label>
                            <select
                                id="op"
                                name="op"
                                value={op}
                                onChange={(e) => setOp(e.target.value as any)}
                                className="w-full rounded-md border px-3 py-2"
                                required
                            >
                                <option value="Add">Add</option>
                                <option value="Sub">Sub</option>
                                <option value="Mul">Mul</option>
                                <option value="Div">Div</option>
                            </select>
                        </div>

                        {error && (
                            <div className="text-sm font-medium text-destructive">
                                Error {error.code}: {error.text}
                            </div>
                        )}

                        {result && (
                            <div className="space-y-2">
                                {result.answer && (
                                <div className="text-sm font-medium text-green-600">Answer: {result.answer}</div>
                                )}
                                {result.flag && (
                                    <>
                                    <div className="w-full text-xl font-medium text-red-600 text-center">ME CALCULATOR IS CRASHED</div>
                                    <div className="text-sm font-medium text-yellow-600">{result.flag}</div>
                                    </>
                                )}
                                {result.message && (
                                    <div className="text-sm font-medium text-muted-foreground">{result.message}</div>
                                )}
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Calculating..." : "Calculate"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
