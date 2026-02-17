"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Created { id: string }
interface Message { id: string; content: string }

export default function MessagesPage() {
    const router = useRouter();

    const [content, setContent] = useState<string>("");
    const [fetchId, setFetchId] = useState<string>("");
    const [deleteId, setDeleteId] = useState<string>("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<{ code: number; text: string } | null>(null);

    const [created, setCreated] = useState<Created | null>(null);
    const [message, setMessage] = useState<Message | null>(null);
    const [messages, setMessages] = useState<Message[] | null>(null);
    const [flag, setFlag] = useState<string | null>(null);
    const [showHint, setShowHint] = useState<boolean>(false);

    useEffect(() => {
        // load all messages on mount
        fetchAll();
    }, []);

    async function fetchAll() {
        setError(null);
        setIsLoading(true);
        try {
            const res = await fetch(`/api/proxy/messages`, { method: "GET" });
            const bodyText = await res.text();
            if (!res.ok) {
                setError({ code: res.status, text: bodyText });
                return;
            }

            // Try parse JSON, otherwise treat as plain text error or empty list
            try {
                const parsed = JSON.parse(bodyText);
                if (parsed?.flag) {
                    setFlag(parsed.flag);
                }
                if (Array.isArray(parsed)) {
                    setMessages(parsed as Message[]);
                } else if (parsed && typeof parsed === 'object' && parsed.length === undefined) {
                    // parsed object that's not an array -> maybe a single message or wrapper
                    // try to normalize
                    if (Array.isArray((parsed as any).messages)) {
                        setMessages((parsed as any).messages as Message[]);
                    }
                }
            } catch (e) {
                // not JSON: if bodyText non-empty, show it as an informational message
                if (bodyText.trim()) {
                    setError({ code: res.status, text: bodyText });
                } else {
                    setMessages([]);
                }
            }
        } catch (e) {
            setError({ code: 0, text: String(e) });
        } finally {
            setIsLoading(false);
        }
    }

    async function handleCreate(e: any) {
        e.preventDefault();
        setError(null);
        setCreated(null);
        setIsLoading(true);
        try {
            const res = await fetch(`/api/proxy/messages`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });
            const bodyText = await res.text();
            if (!res.ok) {
                setError({ code: res.status, text: bodyText });
                return;
            }

            try {
                const parsed = JSON.parse(bodyText);
                if (parsed?.flag) {
                    setFlag(parsed.flag);
                }
                if (parsed?.id) {
                    setCreated({ id: parsed.id });
                }
            } catch (e) {
                // not JSON - show raw text as created id or message
                if (bodyText.trim()) setCreated({ id: bodyText.trim() });
            }
            setContent("");
            await fetchAll();
        } catch (e) {
            setError({ code: 0, text: String(e) });
        } finally {
            setIsLoading(false);
        }
    }

    async function handleGetById(e: any) {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setIsLoading(true);
        try {
            const res = await fetch(`/api/proxy/messages/${encodeURIComponent(fetchId)}`, { method: "GET" });
            const bodyText = await res.text();
            if (!res.ok) {
                setError({ code: res.status, text: bodyText });
                return;
            }

            try {
                const parsed = JSON.parse(bodyText);
                if (parsed?.flag) {
                    setFlag(parsed.flag);
                }
                if (parsed?.id && typeof parsed?.content === 'string') {
                    setMessage({ id: parsed.id, content: parsed.content });
                }
            } catch (e) {
                // not JSON - treat bodyText as message content
                if (bodyText.trim()) {
                    setMessage({ id: fetchId, content: bodyText });
                }
            }
        } catch (e) {
            setError({ code: 0, text: String(e) });
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete(e: any) {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const res = await fetch(`/api/proxy/messages/${encodeURIComponent(deleteId)}`, { method: "DELETE" });
            const bodyText = await res.text();
            if (!res.ok) {
                setError({ code: res.status, text: bodyText });
                return;
            }


            if (bodyText.trim()) {
                // show confirmation as created for visibility
                setCreated({ id: bodyText.trim() });
            }
            
            setDeleteId("");
            await fetchAll();
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

            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Message Board</CardTitle>
                    <CardDescription>Create, view, list, and delete messages for everyone to see!!</CardDescription>
                    <img src="/cookiemonster.jpg" alt="Cookie Monster" className="w-24 h-24 mx-auto" />
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <form autoComplete="off" onSubmit={handleCreate} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="content">New Message</Label>
                                    <Textarea
                                        id="content"
                                        name="content"
                                        placeholder="Enter message content"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                    />
                                </div>

                                {created && (
                                    <div className="text-sm font-medium text-green-600">Created id: {created.id}</div>
                                )}

                                <Button type="submit" disabled={isLoading} className="w-full">
                                    {isLoading ? "Sending..." : "Create Message"}
                                </Button>
                            </form>

                            <div className="mt-6 space-y-4">
                                <form onSubmit={handleGetById} className="space-y-2">
                                    <Label htmlFor="fetchId">Get Message By ID</Label>
                                    <Input id="fetchId" value={fetchId} onChange={(e) => setFetchId(e.target.value)} />
                                    <Button type="submit" disabled={isLoading} className="mt-2">Get</Button>
                                </form>

                                {message && (
                                    <div className="p-3 border rounded">
                                        <div className="font-medium">ID: {message.id}</div>
                                        <div className="text-sm text-muted-foreground">{message.content}</div>
                                    </div>
                                )}

                                <form onSubmit={handleDelete} className="space-y-2">
                                    <Label htmlFor="deleteId">Delete Message By ID</Label>
                                    <Input id="deleteId" value={deleteId} onChange={(e) => setDeleteId(e.target.value)} />
                                    <Button type="submit" disabled={isLoading} className="mt-2">Delete</Button>
                                </form>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-medium">All Messages</h3>
                                <Button onClick={fetchAll} size={"sm" as any} disabled={isLoading}>Refresh</Button>
                            </div>

                            {error && (
                                <div className="text-sm font-medium text-destructive">Error {error.code}: {error.text}</div>
                            )}

                            {isLoading && <div className="text-sm text-muted-foreground">Loading...</div>}

                            <div className="space-y-3 max-h-[480px] overflow-auto">
                                {messages && messages.length === 0 && (
                                    <div className="text-sm text-muted-foreground">No messages yet.</div>
                                )}
                                {messages && messages.map((m) => (
                                    <div key={m.id} className="p-3 border rounded">
                                        <div className="flex justify-between items-start gap-2">
                                            <div>
                                                <div className="font-medium">{m.content}</div>
                                                <div className="text-sm text-muted-foreground">{m.id}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

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
                                            {`Me eat cookie! Me like cookie!!! But me cant eat cookie again, me already eaten it... Me go find more cookies now`}
                                        </p>

                                        <div className="mt-4 flex justify-end">
                                            <Button type="button" onClick={() => setShowHint(false)}>Close</Button>
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
