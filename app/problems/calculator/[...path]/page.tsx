"use client";

import { useState, useEffect } from "react";
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

    // Initialize to the server-rendered fallback so SSR output matches,
    // then update to the real hint on the client after mount.
    const [hintText, setHintText] = useState<string>("Path captured by [...path]: ");
    const [showHint, setShowHint] = useState<boolean>(false);

    useEffect(() => {
        const pathname = typeof window !== "undefined" ? window.location.pathname : "";
        if (/\/easy(\/|$)/.test(pathname)) {
            setHintText("Zero is a very fun number to use in calculations.");
        } else if (/\/medium(\/|$)/.test(pathname)) {
            setHintText("If we add two very large numbers together, what happens?");
        } else if (/\/hard(\/|$)/.test(pathname)) {
            setHintText("I havent figured this one out yet lol");
        } else {
            const match = pathname.match(/\/problems\/calculator\/(.*)$/);
            const tail = match ? match[1] : "";
            setHintText(`Path captured by [...path]: ${tail || pathname}`);
        }
    }, []);

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
                    <CardDescription className="text-center mb-4">This calculator is implemented as a single service for every team. Your goal is to provide malicious input causing the service to crash</CardDescription>
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
                    {/* Hint button */}
                <div className="mt-4 flex justify-center">
                    <div className="mt-4 flex justify-center">
                        <Button type="button" onClick={() => setShowHint(true)}>Hint</Button>

                        {showHint && (
                            <div className="fixed inset-0 items-center justify-center z-50 flex">
                                <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
                                <div className="relative z-10 max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mx-4">
                                    <div className="flex items-start justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Hint</h3>
                                        <button onClick={() => setShowHint(false)} className="cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">✕</button>
                                    </div>

                                    <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                                        {hintText}
                                    </p>

                                    <div className="mt-4 flex justify-end">
                                        <Button type="button" onClick={() => setShowHint(false)}>Close</Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                </CardContent>
            </Card>
        </div>
    );
}
