import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { CustomCursor } from "@/components/CustomCursor";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ScrollVideo } from "@/components/ScrollVideo";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Process } from "@/components/Process";
import { Quote } from "@/components/Quote";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Paper & Pencil — Interior Architecture Studio, London" },
      { name: "description", content: "Paper & Pencil is a London interior architecture studio designing considered spaces for hospitality, residence and retail." },
      { property: "og:title", content: "Paper & Pencil — Interior Architecture Studio" },
      { property: "og:description", content: "Considered interiors for hospitality, residence and retail. Drawn by hand from a quiet room in London." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Jost:wght@300;400;500&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <main className="relative">
      <CustomCursor />
      <Nav />
      <Hero />
      <ScrollVideo />
      <Marquee />
      <About />
      <Services />
      <Projects />
      <Process />
      <Quote />
      <Contact />
      <Footer />
    </main>
  );
}
