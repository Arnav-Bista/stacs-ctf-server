"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { initializeSqlJs } from "@/utils/initSqlJs";
import { memo, useEffect, useState } from "react";
import { Database } from "sql.js";
import { FlagSubmission } from "@/app/submit/flag-submission";
import Link from "next/link";
import FlagSubmissionPopover from "@/app/submit/flag-submission-popover";

const Comments = memo(
  function Comments({ isLoading, db, updateCounter }: { isLoading: boolean, db: Database | null, updateCounter: number }) {
    return (
      <div className="space-y-4" id="comments">
        {!isLoading && db && (() => {
          const comments = db.exec('SELECT * FROM comments ORDER BY created_at DESC');
          return comments[0]?.values?.map((comment, index) => (
            <Card key={index}>
              <CardHeader className="py-4">
                <CardDescription>
                  {new Date(comment[2] as string).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p dangerouslySetInnerHTML={{ __html: comment[1] as TrustedHTML }} className="whitespace-pre-wrap break-words" />
              </CardContent>
            </Card>
          )) || null;
        })()}
      </div>
    );
  });

export default function XSS() {
  const [db, setDb] = useState<Database | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    window.localStorage.clear();
    async function init() {
      const SQL = await initializeSqlJs();
      const db = new SQL.Database();

      db.run(`
        CREATE TABLE comments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          data TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      db.run(` INSERT INTO comments (data) VALUES ('Yooo, Mausemaster! Im a huge fan! Can I get free passes tho?')`);

      setDb(db);
      setIsLoading(false);
    }
    init();
  }, []);

  async function simulateAdminBot() {
    setIsSimulating(true);
    const iframe = document.createElement('iframe');
    iframe.srcdoc = `
      <html>
        <head>
          <script>
            // Set up localStorage in the iframe's context before loading content
            localStorage.setItem('secret-token', 'flag_{dangerouslySetInnerHTML-is-dangerous-shocker!!!}');
          </script>
        </head>
        <body>
          <div id="content"></div>
        </body>
      </html>
    `;
    document.body.appendChild(iframe);


    // Wait for iframe to load
    await new Promise(resolve => iframe.onload = resolve);

    const comments = document.getElementById('comments')?.innerHTML;
    if (iframe.contentDocument) {
      iframe.contentDocument.getElementById('content')!.innerHTML = comments ?? "";
    }



    await new Promise((resolve) => setTimeout(resolve, 1000));
    iframe.remove();
    localStorage.clear();
    setIsSimulating(false);
  }

  return (
    <div className="min-h-screen flex flex-col space-y-4 items-center justify-center">
      <div className="flex gap-2">
        <FlagSubmissionPopover />
        <Link href="/archives/2025/engineering" className="mb-4"> <Button>Back</Button> </Link>
      </div>
      <Card className="w-full max-w-screen-md">
        <CardHeader>
          <CardTitle>Admin Post: Feedback for the Server</CardTitle>
          <CardDescription>By Mausemaster, owner of 2m2t, Admin</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Hello everyone. It&apos;s Mausemaster. I&apos;ve just created this new website and hopefully it will be the new face of 2m2t (2 mause 2 tools).
          </p>
          <br />
          <p>
            I&apos;m currently working on the server and I&apos;m planning to add some new features. I&apos;ve just made this comment section with some basic db stuff, so feel free to leave a comment.
          </p>
          <br />
          <p>
            Since you guys are 100X Frontend developers, you can put some HTML!
            But I&apos;ve disabled the script tags for security reasons. Also, I&apos;m not clicking any links you guys post here.
          </p>
          <br />
          <p>
            I&apos;ll be checking back on this every minute!
          </p>

          <br />
          <p className="text-xs text-muted-foreground">
            The admin bot is simulated via an iframe, it cannot make requests outside of this domain. This also means the admin simulation will run on your browser.
            <br />
            <br />
            All the iframe will do is setup whatever it means to be an admin and rerender the comments section.
          </p>

        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            <form
              className="mb-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const comment = new FormData(form).get('comment') as string;
                if (db && comment.trim()) {
                  // Remove script tags but keep other HTML tags
                  // Does not remove inline event handlers :eyes:
                  const sanitizedComment = comment.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*comments<\/script>/gi, '');
                  db.run('INSERT INTO comments (data) VALUES (?)', [sanitizedComment]);
                  form.reset();
                  setCounter(counter + 1);
                }
              }}
            >
              <Textarea
                name="comment"
                placeholder="Write a comment..."
                className="min-h-[100px]"
              />
              <Button type="submit">
                Post Comment
              </Button>
              <Button
                type="button"
                onClick={simulateAdminBot}
                className="mx-4"
                disabled={isSimulating}
              >
                Notify Mausemaster
              </Button>
            </form>

            {/* Comments display */}
            <Comments isLoading={isLoading} db={db} updateCounter={counter} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
