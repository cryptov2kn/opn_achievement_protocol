import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0d] overflow-x-hidden">
      <Navbar />

      <Hero />

      <Stats />
    </main>
  );
}
