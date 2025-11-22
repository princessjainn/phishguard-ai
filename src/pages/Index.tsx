import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Architecture } from "@/components/Architecture";
import { Extension } from "@/components/Extension";
import { Documentation } from "@/components/Documentation";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Architecture />
      <Extension />
      <Documentation />
      <Footer />
    </div>
  );
};

export default Index;
