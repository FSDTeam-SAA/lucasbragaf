import Header from "@/components/header";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import ContactForm from "@/components/contact-form";
import Services from "@/components/services";
import WhoWeAre from "@/components/who-we-are";
import Footer from "@/components/footer";
import Companies from "@/components/companies";
import { MultiStepForm } from "@/components/multi-step-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <Header />
      <MultiStepForm />
      <Hero />
      <Projects />
      <Companies />
      <Services />
      <WhoWeAre />
      <ContactForm />
      <Footer />
    </main>
  );
}
