"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Created { id: string }
interface ReadResult { value?: any }

export default function SecretStorePage() {
    const router = useRouter();

    const [secret, setSecret] = useState<string>("");
    const [index, setIndex] = useState<string>("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<{ code: number; text: string } | null>(null);

    const [createResp, setCreateResp] = useState<Created | null>(null);
    const [readResp, setReadResp] = useState<ReadResult | null>(null);
    const [flag, setFlag] = useState<string | null>(null);
    const [hintType, setHintType] = useState<string | null>(null);
    const [baseUrl, setBaseUrl] = useState<string>("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setBaseUrl(window.location.origin);
        }
    }, []);

    const createUrl = baseUrl ? `${baseUrl}/api/proxy/bigarray/createsecret` : `/api/proxy/bigarray/createsecret`;
    const readUrl = baseUrl ? `${baseUrl}/api/proxy/bigarray/readarray` : `/api/proxy/bigarray/readarray`;

    async function handleCreate(e: any) {
        e.preventDefault();
        setError(null);
        setCreateResp(null);
        setIsLoading(true);
        try {
            const res = await fetch(`/api/proxy/bigarray/createsecret`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });
            const bodyText = await res.text();
            if (!res.ok) {
                setError({ code: res.status, text: bodyText });
                return;
            }

            try {
                const parsed = JSON.parse(bodyText);
                if (parsed?.flag) setFlag(parsed.flag);
                if (parsed?.id) setCreateResp({ id: parsed.id });
            } catch (e) {
                if (bodyText.trim()) setCreateResp({ id: bodyText.trim() });
            }

            setSecret("");
        } catch (e) {
            setError({ code: 0, text: String(e) });
        } finally {
            setIsLoading(false);
        }
    }

    async function handleRead(e: any) {
        e.preventDefault();
        setError(null);
        setReadResp(null);
        setIsLoading(true);
        try {
            const idx = Number(index);
            const res = await fetch(`/api/proxy/bigarray/readarray`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ index: idx }),
            });
            const bodyText = await res.text();
            if (!res.ok) {
                setError({ code: res.status, text: bodyText });
                return;
            }

            try {
                const parsed = JSON.parse(bodyText);
                if (parsed?.flag) setFlag(parsed.flag);
                setReadResp(parsed.message as ReadResult);
            } catch (e) {
                if (bodyText.trim()) setReadResp({ value: bodyText });
            }
        } catch (e) {
            setError({ code: 0, text: String(e) });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative w-full">
            <div className="flex gap-2 mb-4">
                <Button onClick={() => router.back()}>Back</Button>
            </div>

            <Card className="w-full max-w-4xl">
                <CardHeader>
                    <CardTitle>Secret Store</CardTitle>
                    <CardDescription>You can use these API endpoints (or buttons) to allocate as many secret stores in memory as you want, there is also a character array in the same memory pool. You can read that array at any index</CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <form autoComplete="off" onSubmit={handleCreate} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="secret">Create Secret</Label>
                                </div>

                                {createResp && (
                                    <div className="text-sm font-medium text-green-600">Created ID: {createResp.id}</div>
                                )}

                                <Button type="submit" disabled={isLoading} className="w-full">
                                    {isLoading ? "Sending..." : "Create Secret"}
                                </Button>
                            </form>

                            <div className="mt-6 space-y-4">
                                <form onSubmit={handleRead} className="space-y-2">
                                    <Label htmlFor="index">Read Array At Index</Label>
                                    <Input id="index" value={index} onChange={(e) => setIndex(e.target.value)} placeholder="e.g. 0" />
                                    <Button type="submit" disabled={isLoading} className="mt-2">Read</Button>
                                </form>

                                {readResp && (
                                    <div className="p-3 border rounded">
                                        <div className="font-medium">Value:</div>
                                        <div className="text-sm text-muted-foreground">{String((readResp as any).value ?? JSON.stringify(readResp))}</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="mb-2">
                                <h3 className="text-lg font-medium">API Endpoints (full URLs)</h3>
                            </div>

                            <div className="space-y-2">
                                <div className="p-3 border rounded">
                                    <div className="text-sm font-medium">Create Secret (POST)</div>
                                    <div className="text-xs text-muted-foreground break-all">{createUrl}</div>
                                </div>

                                <div className="p-3 border rounded">
                                    <div className="text-sm font-medium">Read Array (POST, body: {'{'}index{'}'}:&nbsp;number)</div>
                                    <div className="text-xs text-muted-foreground break-all">{readUrl}</div>
                                </div>
                            </div>

                            {error && (
                                <div className="mt-4 text-sm font-medium text-destructive">Error {error.code}: {error.text}</div>
                            )}

                            {isLoading && <div className="mt-2 text-sm text-muted-foreground">Loading...</div>}
                        </div>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <div className="mt-4 flex justify-center">
                            <div className="flex gap-2">
                                <Button type="button" onClick={() => setHintType('api')}>Hint One</Button>
                                <Button type="button" onClick={() => setHintType('heap')}>Hint Two</Button>
                            </div>

                            {hintType && (
                                <div className="fixed inset-0 items-center justify-center z-50 flex">
                                    <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
                                    <div className="relative z-10 max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mx-4">
                                        <div className="flex items-start justify-between">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Hint</h3>
                                            <button onClick={() => setHintType(null)} className="cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">✕</button>
                                        </div>

                                        {hintType === 'api' && (
                                            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                                                To solve this problem, you will probably need to make a custom program that hits these APIs yourself.<br />
                                                If you do this, you MUST include a User-Agent header in your request.
                                            </p>
                                        )}

                                        {hintType === 'heap' && (
                                            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                                                If you went to the Exploit Workshop last semester, you will know what a "Heap Spray" is. The number 350 seems very nice to me (wink wink).
                                            </p>
                                        )}

                                        <div className="mt-4 flex justify-end">
                                            <Button type="button" onClick={() => setHintType(null)}>Close</Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        {flag && (
                            <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded">
                                <h4 className="font-medium">ME SERVICE IS CRASHED!!!! The flag is:</h4>
                                <div className="mt-2 font-mono">{flag}</div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
