"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import FlagSubmissionPopover from "@/app/submit/flag-submission-popover";

interface Invoice {
  id: number;
  vendor: string;
  amount: number;
  is_admin: boolean;
}

interface InvoiceDetail {
  id: number;
  vendor: string;
  description: string;
  amount: number;
  is_admin: boolean;
}

export default function PaperTrail() {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selected, setSelected] = useState<InvoiceDetail | null>(null);
  const [selectedError, setSelectedError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoadingInvoice, setIsLoadingInvoice] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      const res = await fetch("/api/problems/paper-trail/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || "Login failed");
        return;
      }
      setToken(data.token);
      await fetchInvoices(data.token);
    } catch {
      setLoginError("Network error");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const fetchInvoices = async (t: string) => {
    const res = await fetch("/api/problems/paper-trail/invoices", {
      headers: { Authorization: `Bearer ${t}` },
    });
    const data = await res.json();
    setInvoices(data.invoices || []);
  };

  const viewInvoice = async (id: number) => {
    setSelected(null);
    setSelectedError(null);
    setIsLoadingInvoice(true);
    try {
      const res = await fetch(`/api/problems/paper-trail/invoices/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setSelectedError(res.status === 403 ? "403 Forbidden — insufficient privileges" : (data.error ?? "Error"));
        return;
      }
      setSelected(data.invoice);
    } finally {
      setIsLoadingInvoice(false);
    }
  };

  // Login screen
  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-4">
        {/* dev note: test credentials alice / alice123 */}
        <div className="flex gap-2">
          <FlagSubmissionPopover />
          <Link href="/problems"><Button variant="outline">Back to Problems</Button></Link>
        </div>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>InvoicePortal</CardTitle>
            <CardDescription>Sign in to view your invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={login} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              {loginError && <p className="text-sm text-red-500">{loginError}</p>}
              <Button type="submit" className="w-full" disabled={isLoggingIn}>
                {isLoggingIn ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Invoice dashboard
  return (
    <div className="min-h-screen flex flex-col items-center p-4 pt-8 space-y-4">
      <div className="flex gap-2">
        <FlagSubmissionPopover />
        <Link href="/problems"><Button variant="outline">Back to Problems</Button></Link>
      </div>

      <div className="w-full max-w-screen-md space-y-4">
        <div>
          <h1 className="text-2xl font-bold">InvoicePortal</h1>
          <p className="text-sm text-muted-foreground">Your invoices</p>
        </div>

        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">ID</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Vendor</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Amount</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b last:border-0 hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground">#{inv.id}</td>
                    <td className="px-4 py-3">{inv.vendor}</td>
                    <td className="px-4 py-3 text-right">£{inv.amount.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="outline" onClick={() => viewInvoice(inv.id)}>
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {(selected || selectedError || isLoadingInvoice) && (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {selected ? `Invoice #${selected.id}` : "Invoice"}
                </CardTitle>
                <Button size="sm" variant="ghost" onClick={() => { setSelected(null); setSelectedError(null); }}>
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingInvoice && <p className="text-sm text-muted-foreground">Loading...</p>}
              {selectedError && (
                <p className="text-sm text-red-500 font-mono">{selectedError}</p>
              )}
              {selected && (
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Vendor</p>
                      <p className="font-medium">{selected.vendor}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Amount</p>
                      <p className="font-medium">£{selected.amount.toFixed(2)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Description</p>
                    <pre className="whitespace-pre-wrap font-sans bg-muted p-3 rounded text-sm">{selected.description}</pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
