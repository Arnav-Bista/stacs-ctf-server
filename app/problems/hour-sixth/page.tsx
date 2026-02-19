"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FlagSubmissionPopover from "@/app/submit/flag-submission-popover";

export default function HourSixth() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("/api/wetterbericht");
        const json = await response.json();
        if (!response.ok) {
          setError(json.error || "Failed to fetch");
          return;
        }
        setData(json.wetterbericht);
      } catch (e) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    }
    getData();
    const interval = setInterval(getData, 60000);
    return () => clearInterval(interval);
  }, []);

  const timeStr = now.toTimeString().slice(0, 8);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4 flex flex-col">
      <div className="flex gap-2 mb-6">
        <FlagSubmissionPopover />
        <Link href="/problems">
          <Button variant="outline" className="border-green-700 text-green-400 hover:bg-green-950">
            Back to Problems
          </Button>
        </Link>
      </div>

      <div className="max-w-3xl w-full mx-auto flex-1">
        <div className="border border-green-700 rounded p-4 mb-4">
          <div className="flex justify-between items-center text-xs text-green-600 mb-1">
            <span>INTERCEPT TERMINAL — JOHN HONEY BUILDING</span>
            <span>{timeStr}</span>
          </div>
          <div className="border-t border-green-900 mt-2 pt-2 text-xs text-green-600">
            SIGNAL ACQUIRED · AUTO-REFRESH 60s
          </div>
        </div>

        <div className="border border-green-700 rounded p-4 min-h-64">
          {loading && (
            <p className="text-green-600 animate-pulse">RECEIVING TRANSMISSION...</p>
          )}
          {error && (
            <p className="text-red-500">ERROR: {error}</p>
          )}
          {data && (
            <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed">{data}</pre>
          )}
        </div>

        <div className="mt-4 text-xs text-green-700">
          <p>Direct access: <span className="text-green-500">GET /api/wetterbericht</span></p>
        </div>
      </div>
    </div>
  );
}
