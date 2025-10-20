import { Suspense } from "react";
import Code from "./UI/Code";
import FallbackLoading from "./UI/FallbackLoading";

/**
 * StreamingSSRDemo - Demonstrates React 19 Server Components with Streaming SSR
 * 
 * KEY CONCEPTS:
 * 1. Server Components: Run on the server, not sent to client
 *    - Can use async/await directly in components
 *    - Access server-side data sources (databases, APIs, files)
 *    - Reduce client bundle size
 * 
 * 2. Streaming SSR: Progressive content loading
 *    - Shell renders immediately
 *    - Suspense boundaries stream content as it becomes available
 *    - Better perceived performance and user experience
 * 
 * 3. Async Components: New Server Component feature
 *    - Components can be async functions
 *    - Automatically handle promise resolution
 *    - Work seamlessly with Suspense boundaries
 */

// Types for our API responses
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Server-side data fetching functions with artificial delays to demonstrate streaming

async function fetchUsers(): Promise<User[]> {
  // Simulate different loading times for streaming demonstration
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

async function fetchPosts(): Promise<Post[]> {
  // Simulate longer loading time to show streaming
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Server Component that fetches users data
async function UsersList() {
  const users = await fetchUsers();

  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-sm">Users ({users.length})</h4>
      <div className="max-h-32 overflow-y-auto space-y-1">
        {users.slice(0, 5).map(user => (
          <div key={user.id} className="text-xs p-2 bg-gray-800 rounded">
            <div className="font-medium">{user.name}</div>
            <div className="text-gray-400">{user.email}</div>
          </div>
        ))}
        {users.length > 5 && (
          <div className="text-xs text-gray-500 text-center">
            ... and {users.length - 5} more
          </div>
        )}
      </div>
    </div>
  );
}

// Server Component that fetches posts data
async function PostsList() {
  const posts = await fetchPosts();
  
  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-sm">Recent Posts ({posts.length})</h4>
      <div className="max-h-32 overflow-y-auto space-y-1">
        {posts.slice(0, 3).map(post => (
          <div key={post.id} className="text-xs p-2 bg-gray-800 rounded">
            <div className="font-medium line-clamp-1">{post.title}</div>
            <div className="text-gray-400 line-clamp-2">{post.body}</div>
          </div>
        ))}
        {posts.length > 3 && (
          <div className="text-xs text-gray-500 text-center">
            ... and {posts.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
}

// Main Server Component that demonstrates streaming SSR
export default function StreamingSSRDemo() {
  return (
    <section className="space-y-4">
      <p>
        React 19 Server Components with <Code>Streaming SSR</Code>.
        Watch how content streams progressively as data becomes available.
      </p>
      
      {/* First stream - Users (1s delay) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Suspense fallback={<FallbackLoading />}>
          <UsersList />
        </Suspense>
        
        {/* Second stream - Posts (2s delay) */}
        <Suspense fallback={<FallbackLoading />}>
          <PostsList />
        </Suspense>
      </div>
      
      <div className="text-xs text-gray-400 space-y-1">
        <p>• <Code>Server Components</Code> run on the server, not sent to client</p>
        <p>• <Code>async</Code> components with <Code>await</Code> for data fetching</p>
        <p>• <Code>Streaming SSR</Code> shows content as it becomes available</p>
        <p>• Different <Code>Suspense</Code> boundaries stream independently</p>
        <p>• Notice how Users load first (1s), then User Posts (1.5s)</p>
      </div>
    </section>
  );
}

