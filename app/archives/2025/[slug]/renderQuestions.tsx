"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { API, Question, questions } from "../questions";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import FlagSubmissionPopover from "@/app/submit/flag-submission-popover";

export default function RenderQuestions({ slug }: { slug: string }) {

  return (
    <div className="px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8 text-center">
        {slug.split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}
      </h1>
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-center mb-4 sm:mb-8">
        <FlagSubmissionPopover />
        <Link href="/archives/2025"> <Button>Back</Button> </Link>
      </div>
      <div className="space-y-6">
        {questions.map((question, index) => (
          question.category === slug &&
          <Card key={`forensics-${index}`} className="max-w-screen-md mx-auto">
            <CardHeader className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <CardTitle className="text-lg sm:text-xl break-words">{question.title}</CardTitle>
                <span className="rounded-full text-sm bg-secondary px-3 py-1 w-fit">
                  {question.points} points
                </span>
              </div>
              <CardDescription className="whitespace-pre-line break-words text-wrap">
                {question.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 mb-4">
              <QuestionContent question={question} />
            </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                {question.lockedHint}
                </p>
              </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

interface QuestionContentProps {
  question: Question;
}

function QuestionContent({ question }: QuestionContentProps) {
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
        <p className="text-center text-muted-foreground">This question is locked</p>
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
        {error && (
          <p className="text-sm text-red-500">Incorrect password</p>
        )}
      </div>
    );
  }

  return (
    <>
      {question.hints && question.hints.length > 0 && (
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="text-sm font-medium">Need hints?</span>
              <ChevronDown className="h-4 w-4 transition-transform duration-200" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="bg-muted p-4 rounded-md space-y-2">
              {question.hints.map((hint, index) => (
                <p key={index} className="text-sm">
                  <span className="font-semibold">Hint {index + 1}:</span> {hint}
                </p>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

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




interface ApiDocumentationProps {
  api?: API;
}

function ApiDocumentation({ api }: ApiDocumentationProps) {
  return (api && api.endpoint) && (
    <div className="space-y-4 mt-4">
      <h3 className="text-lg font-semibold">API Documentation:</h3>
      <div className="bg-muted p-3 sm:p-4 rounded-md space-y-4">
        <div className="grid gap-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">ENDPOINT</p>
            <code className="block bg-background px-2 py-1 rounded text-xs sm:text-sm break-all">
              {api.endpoint}
            </code>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">METHOD</p>
            <code className="inline-block bg-background px-2 py-1 rounded text-xs sm:text-sm">
              {api.method}
            </code>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">DESCRIPTION</p>
            <p className="whitespace-pre-line break-words text-wrap text-xs">
              {api.description}
            </p>
          </div>
        </div>

        {api.requestFormat && (
          <div className="space-y-2 pt-2 border-t border-border">
            <p className="text-xs font-semibold text-muted-foreground">REQUEST FORMAT</p>
            <p className="text-xs sm:text-sm">Type: {api.requestFormat.type}</p>
            {api.requestFormat.example && (
              <div className="bg-background p-2 rounded overflow-x-auto">
                <ReactMarkdown
                  className="text-xs sm:text-sm font-mono"
                  components={{
                    pre: ({ children }) => <pre className="whitespace-pre-wrap break-all">{children}</pre>,
                    code: ({ children }) => <code>{children}</code>
                  }}
                >
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

interface AttachmentsProps {
  attachments?: Question['attachments'];
}

function Attachments({ attachments }: AttachmentsProps) {
  return (
    attachments && <div className="space-y-4">
      <h3 className="text-lg font-semibold">Attachments:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {attachments.map((attachment, index) => (
          <div key={index} className="flex flex-col gap-2">
            {attachment.type === 'image' ? (
              <div className="relative group">
                <Image
                  src={attachment.url}
                  alt={attachment.name}
                  width={400}
                  height={192}
                  className="rounded-lg w-full object-cover max-h-48 cursor-pointer hover:opacity-90 transition-opacity outline outline-2 outline-black"
                  onClick={() => window.open(attachment.url, '_blank')} />
                <span className="text-sm mt-2 text-muted-foreground break-words">{attachment.name}</span>
              </div>
            ) : (
              <Button
                variant="secondary"
                className="w-full justify-start"
                asChild
              >
                <a href={attachment.url} download>
                  <Download className="mr-2 h-4 w-4" />
                  {attachment.name}
                </a>
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
