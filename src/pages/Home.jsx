import HeroSection from "../components/home/HeroSection";
import TrustBar from "../components/home/TrustBar";
import FeaturesSection from "../components/home/FeaturesSection";
import HowItWorks from "../components/home/HowItWorks";
import FreeForever from "../components/home/FreeForever";

import SectionReveal from "../components/ui/SectionReveal";

function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />

      <SectionReveal>
        <TrustBar />
      </SectionReveal>

      <SectionReveal>
        <FeaturesSection />
      </SectionReveal>

      <SectionReveal>
        <HowItWorks />
      </SectionReveal>

      <SectionReveal>
        <FreeForever />
      </SectionReveal>
    </main>
  );
}

export default Home;