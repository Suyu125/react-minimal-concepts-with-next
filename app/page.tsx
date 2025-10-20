import StreamingSSRDemo from "./components/StreamingSSRDemo";
import PostWithCommentsDemo from "./components/PostWithCommentsDemo";
import UseIdDemo from "./components/UseIdDemo";
import Card from "./components/UI/Card";
import DemoTitle from "./components/UI/DemoTitle";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <main className="p-6 bg-[#0b0b0c] text-[#f5f7fb]">
        <h1 className="my-2">React Minimal</h1>
        <div className="space-y-4">
          <Card>
            <DemoTitle>Server Components + Streaming SSR (React 19)</DemoTitle>
            <StreamingSSRDemo />
          </Card>
          <Card>
            <DemoTitle>Server-Client Promise Streaming with use Hook (React 19)</DemoTitle>
            <PostWithCommentsDemo />
          </Card>
          <Card>
            <DemoTitle>useId Hook for Accessibility (React 18+)</DemoTitle>
            <UseIdDemo />
          </Card>
        </div>
      </main>
    </div>
  );
}