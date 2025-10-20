import { Suspense } from "react";

import CommentsDemo from "./CommentsDemo";
import Code from "./UI/Code";
import FallbackLoading from "./UI/FallbackLoading";

/**
 * PostWithCommentsDemo - Server Component that demonstrates the use hook scenario
 * 
 * This component shows the pattern described in React docs:
 * - Post content is critical, so we await it on the server
 * - Comments are lower priority, so we start the promise on server
 * - Comments promise is passed to Client Component that uses `use` hook
 * - This allows post to render immediately while comments stream later
 */

// Types for our data
interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

interface Comment {
  id: number;
  text: string;
  author: string;
  createdAt: string;
}

// Server-side data fetching functions with artificial delays

async function fetchPost(id: number): Promise<Post> {
  // Simulate server-side delay for post content
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const post = await response.json();
  
  return {
    id: post.id,
    title: post.title,
    content: post.body,
    author: `User ${post.userId}`,
    createdAt: new Date().toISOString().split('T')[0]
  };
}

async function fetchComments(postId: number): Promise<Comment[]> {
  // Simulate longer delay for comments (lower priority)
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const comments = await response.json();
  
  return comments.map((comment: { id: number; body: string; name: string }) => ({
    id: comment.id,
    text: comment.body,
    author: comment.name,
    createdAt: new Date().toISOString().split('T')[0]
  }));
}

// Server Component that demonstrates the pattern
async function PostWithCommentsDemo({ postId: postId = 1 }: { postId?: number }) {
  // Critical content - awaited on server
  const post = await fetchPost(postId);
  
  // Lower priority content - start promise but don't await
  const commentsPromise = fetchComments(postId);
  
  return (
    <div className="space-y-4">
      {/* Post content renders immediately */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm">Post Content (Renders Immediately)</h3>
        <div className="p-3 bg-gray-800 rounded">
          <h4 className="font-medium text-sm mb-2">{post.title}</h4>
          <p className="text-xs text-gray-300 mb-2">{post.content}</p>
          <div className="text-xs text-gray-500">
            By {post.author} • {post.createdAt}
          </div>
        </div>
      </div>
      
      {/* Comments stream later via Client Component */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm">Comments (Streams After 2s)</h3>
        <Suspense fallback={<FallbackLoading />}>
          <CommentsDemo commentsPromise={commentsPromise} />
        </Suspense>
      </div>
      
      <div className="text-xs text-gray-400 space-y-1">
        <p>• Post content awaited on server → renders immediately</p>
        <p>• Comments promise started on server → passed to client</p>
        <p>• Client Component uses <Code>use</Code> hook → suspends until ready</p>
        <p>• This pattern enables streaming without blocking critical content</p>
      </div>
    </div>
  );
}

export default PostWithCommentsDemo;