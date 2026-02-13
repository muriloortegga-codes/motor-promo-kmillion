import Header from "@/components/kmillion/Header";
import HeroSection from "@/components/kmillion/HeroSection";
import MarketProblem from "@/components/kmillion/MarketProblem";
import WhatIsSection from "@/components/kmillion/WhatIsSection";
import HowItWorks from "@/components/kmillion/HowItWorks";
import TechnicalComparison from "@/components/kmillion/TechnicalComparison";
import PracticalCases from "@/components/kmillion/PracticalCases";
import EcosystemSection from "@/components/kmillion/EcosystemSection";
import ForWhoSection from "@/components/kmillion/ForWhoSection";
import ClosingSection from "@/components/kmillion/ClosingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <div id="problema">
          <MarketProblem />
        </div>
        <WhatIsSection />
        <div id="como-funciona">
          <HowItWorks />
        </div>
        <div id="diferencial">
          <TechnicalComparison />
        </div>
        <PracticalCases />
        <div id="ecossistema">
          <EcosystemSection />
        </div>
        <ForWhoSection />
        <ClosingSection />
      </main>
    </div>
  );
};

export default Index;
