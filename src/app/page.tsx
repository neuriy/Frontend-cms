import Hero from "@/components/Hero";
import WorkspaceHero from "@/components/WorkspaceHero";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <WorkspaceHero />
      
      {/* Rest of the content can go here if needed */}
      <div className="max-w-[1200px] mx-auto py-16 px-6 hidden">
        <div className="w-full flex flex-col md:flex-row gap-8">
          {/* Generator Area Placeholder */}
          <div className="flex-1 bg-white border border-gray-200 rounded-xl p-8 shadow-sm border-dashed">
            <div className="h-[400px] flex flex-col items-center justify-center text-gray-400">
              <p>App Icon Generator Workspace</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
