import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import Stats from "@/components/landing/Stats";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0b0b0d]">
      <Navbar />

      <Hero />

      <Stats />
    </main>
  );
}
