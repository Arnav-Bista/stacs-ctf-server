"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import FlagSubmissionPopover from "@/app/submit/flag-submission-popover";

interface Comment {
  id: number;
  data: string;
  created_at: string;
}

export default function CleanThoughts() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNotifying, setIsNotifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch comments on mount
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/problems/xss/comments');
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      setComments(data.comments || []);
      setError(null);
    } catch (err) {
      setError('Failed to load comments');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const comment = new FormData(form).get('comment') as string;

    if (!comment.trim()) return;

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/problems/xss/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment })
      });

      if (!response.ok) throw new Error('Failed to post comment');

      form.reset();
      await fetchComments(); // Reload comments
    } catch (err) {
      alert('Failed to post comment');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const notifyAdmin = async () => {
    setIsNotifying(true);
    try {
      const response = await fetch('/api/problems/xss/visit', {
        method: 'POST'
      });

      if (!response.ok) throw new Error('Failed to notify admin');

      const data = await response.json();
      alert(data.message || 'Admin notified!');
    } catch (err) {
      alert('Failed to notify admin');
      console.error(err);
    } finally {
      setIsNotifying(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col space-y-4 items-center justify-center p-4">
      <div className="flex gap-2">
        <FlagSubmissionPopover />
        <Link href="/problems">
          <Button>Back to Problems</Button>
        </Link>
      </div>

      <Card className="w-full max-w-screen-md">
        <CardHeader>
          <CardTitle>Admin Announcement: Share Your Thoughts!</CardTitle>
          <CardDescription>Posted by Admin • Just now</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p>
              Hey everyone! We&apos;ve set up this new comment system so you can share your thoughts and feedback with us.
            </p>
            <p>
              Feel free to use HTML to make your comments more expressive! We trust our community. 😊
            </p>
            <p className="text-sm text-muted-foreground">
              I&apos;ll be checking the comments regularly to see what you all think!
            </p>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                name="comment"
                placeholder="Share your thoughts... (HTML allowed!)"
                className="min-h-[100px]"
                required
              />
              <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Posting..." : "Post Comment"}
                </Button>
                <Button
                  type="button"
                  onClick={notifyAdmin}
                  disabled={isNotifying}
                  variant="secondary"
                >
                  {isNotifying ? "Notifying..." : "Notify Admin"}
                </Button>
              </div>
            </form>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">Comments ({comments.length})</h3>
            {isLoading ? (
              <p className="text-muted-foreground text-sm">Loading comments...</p>
            ) : error ? (
              <p className="text-red-500 text-sm">{error}</p>
            ) : (
              <div className="space-y-3">
                {comments.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No comments yet. Be the first!</p>
                ) : (
                  comments.map((comment) => (
                    <Card key={comment.id}>
                      <CardHeader className="py-3">
                        <CardDescription className="text-xs">
                          {new Date(comment.created_at).toLocaleString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div
                          className="whitespace-pre-wrap break-words"
                          dangerouslySetInnerHTML={{ __html: comment.data }}
                        />
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
