"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { allQuestions } from "../problems";
import { API, Question } from "../types";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import FlagSubmissionPopover from "@/app/submit/flag-submission-popover";
import { useTrackerData } from "../tracker";

export default function RenderQuestions({ slug }: { slug: string }) {
  const questionTracker = useTrackerData();
  const filteredQuestions = allQuestions.filter(q => q.category === slug);
  const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="px-4 sm:px-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">{title}</h1>

      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-8">
        <FlagSubmissionPopover />
        <Link href="/problems"><Button>Back</Button></Link>
      </div>

      <div className="space-y-6">
        {filteredQuestions.map((question) => {
          const isSolved = questionTracker?.found_flag_ids.has(question.id);
          const solveCount = questionTracker?.flag_found_count_map?.get(question.id) ?? "?";

          return (
            <Card key={question.id} className={`max-w-screen-md mx-auto ${isSolved ? "border-2 border-green-600" : ""}`}>
              <CardHeader className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <CardTitle className="text-xl break-all">{question.title}</CardTitle>
                  <span className="rounded-full text-sm bg-secondary px-3 py-1 w-fit whitespace-nowrap">
                    {question.points} pts • {solveCount} solves
                  </span>
                </div>
                <CardDescription className="whitespace-pre-line">{question.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 mb-4">
                <QuestionContent question={question} />
              </CardContent>

              {question.lockedHint && (
                <CardFooter>
                  <p className="text-xs text-muted-foreground">{question.lockedHint}</p>
                </CardFooter>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function QuestionContent({ question }: { question: Question }) {
  const [isUnlocked, setIsUnlocked] = useState(!question.lockedPassword);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleUnlock = () => {
    if (password === question.lockedPassword) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <Lock className="w-12 h-12 text-muted-foreground" />
        <p className="text-muted-foreground">This question is locked</p>
        <div className="flex gap-2 max-w-sm w-full">
          <Input
            type="password"
            placeholder="Enter password to unlock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error ? "border-red-500" : ""}
            onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
          />
          <Button onClick={handleUnlock}>Unlock</Button>
        </div>
        {error && <p className="text-sm text-red-500">Incorrect password</p>}
      </div>
    );
  }

  return (
    <>
      <Hints hints={question.hints} />
      <Attachments attachments={question.attachments} />
      <ApiDocumentation api={question.api} />
      {question.link && (
        <Link href={question.link} className="w-full">
          <Button className="w-full">View Problem</Button>
        </Link>
      )}
    </>
  );
}

function Hints({ hints }: { hints?: string[] | React.ReactNode }) {
  if (!hints || (Array.isArray(hints) && hints.length === 0)) return null;

  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between p-0 h-auto">
          <span className="text-sm font-medium">Need hints?</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <div className="bg-muted p-4 rounded-md space-y-2">
          {Array.isArray(hints) && hints.map((hint, i) => (
            <p key={i} className="text-sm">
              <span className="font-semibold">Hint {i + 1}:</span> {hint}
            </p>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function ApiDocumentation({ api }: { api?: API }) {
  if (!api?.endpoint) return null;

  return (
    <div className="space-y-4 mt-4">
      <h3 className="text-lg font-semibold">API Documentation:</h3>
      <div className="bg-muted p-4 rounded-md space-y-3">
        <ApiField label="ENDPOINT" value={api.endpoint} mono />
        <ApiField label="METHOD" value={api.method} mono />
        <ApiField label="DESCRIPTION" value={api.description} />

        {api.requestFormat && (
          <div className="space-y-2 pt-2 border-t">
            <p className="text-xs font-semibold text-muted-foreground">REQUEST FORMAT</p>
            <p className="text-sm">Type: {api.requestFormat.type}</p>
            {api.requestFormat.example && (
              <div className="bg-background p-2 rounded overflow-x-auto">
                <ReactMarkdown className="text-sm font-mono">
                  {'```json\n' + api.requestFormat.example + '\n```'}
                </ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ApiField({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      {mono ? (
        <code className="block bg-background px-2 py-1 rounded text-sm break-all">{value}</code>
      ) : (
        <p className="text-sm whitespace-pre-line">{value}</p>
      )}
    </div>
  );
}

function Attachments({ attachments }: { attachments?: Question['attachments'] }) {
  if (!attachments) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Attachments:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {attachments.map((att, i) => (
          att.type === 'image' ? <ImageAttachment key={i} {...att} /> : <FileAttachment key={i} {...att} />
        ))}
      </div>
    </div>
  );
}

function ImageAttachment({ url, name }: { url: string; name: string }) {
  return (
    <div>
      <Image
        src={url}
        alt={name}
        width={400}
        height={192}
        className="rounded-lg w-full object-cover max-h-48 cursor-pointer hover:opacity-90 outline outline-2 outline-black"
        onClick={() => window.open(url, '_blank')}
      />
      <p className="text-sm mt-2 text-muted-foreground">{name}</p>
      <DownloadButton url={url} label="Download" />
    </div>
  );
}

function FileAttachment({ url, name }: { url: string; name: string }) {
  return <DownloadButton url={url} label={name} />;
}

function DownloadButton({ url, label }: { url: string; label: string }) {
  return (
    <Button variant="secondary" className="w-full justify-start mt-2" asChild>
      <a href={url} download>
        <Download className="mr-2 h-4 w-4" />
        {label}
      </a>
    </Button>
  );
}
