import StreamingSSRDemo from "./components/StreamingSSRDemo";
import PostWithCommentsDemo from "./components/PostWithCommentsDemo";
import Card from "./components/UI/Card";
import Small from "./components/UI/Small";
import DemoTitle from "./components/UI/DemoTitle";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <main className="p-6 bg-[#0b0b0c] text-[#f5f7fb]">
        <h1 className="my-2">React 18/19 Minimal</h1>
        <Small>Features: Server Components, Streaming SSR, use hook, automatic batching, transitions, actions + optimistic UI</Small>
        <div className="space-y-4">
          <Card>
            <DemoTitle>Server Components + Streaming SSR (React 19)</DemoTitle>
            <StreamingSSRDemo />
          </Card>
          <Card>
            <DemoTitle>Server-Client Promise Streaming with use Hook (React 19)</DemoTitle>
            <PostWithCommentsDemo />
          </Card>
        </div>
      </main>
    </div>
  );
}