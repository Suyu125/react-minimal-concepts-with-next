"use client";

import { use } from "react";

/**
 * CommentsDemo - Demonstrates React 19's `use` hook in Client Components
 * 
 * KEY CONCEPTS:
 * 1. Server Component passes Promise as prop to Client Component
 *    - Server starts the promise but doesn't await it
 *    - Client Component receives the promise and uses `use` hook
 *    - This enables streaming without blocking server rendering
 * 
 * 2. use Hook in Client Components:
 *    - Consumes promises passed from Server Components
 *    - Automatically suspends until promise resolves
 *    - Works seamlessly with Suspense boundaries
 * 
 * 3. Streaming Strategy:
 *    - Critical content (post) awaited on server
 *    - Lower-priority content (comments) streamed to client
 *    - Better perceived performance and user experience
 */

interface Comment {
  id: number;
  text: string;
  author: string;
  createdAt: string;
}

// Client Component that uses the `use` hook to consume a promise
function CommentsDemo({ commentsPromise }: { commentsPromise: Promise<Comment[]> }) {
  const comments = use(commentsPromise);
  
  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-sm">Comments ({comments.length})</h4>
      <div className="max-h-32 overflow-y-auto space-y-2">
        {comments.slice(0, 3).map(comment => (
          <div key={comment.id} className="text-xs p-2 bg-gray-800 rounded">
            <div className="font-medium">{comment.author}</div>
            <div className="text-gray-300">{comment.text}</div>
            <div className="text-gray-500 text-xs">{comment.createdAt}</div>
          </div>
        ))}
        {comments.length > 3 && (
          <div className="text-xs text-gray-500 text-center">
            ... and {comments.length - 3} more comments
          </div>
        )}
      </div>
    </div>
  );
}

// Export the Comments component for use in Server Components
export default CommentsDemo;
