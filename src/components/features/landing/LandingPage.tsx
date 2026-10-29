import { Be_Vietnam_Pro } from "next/font/google";
import { LandingCursor } from "@/components/features/landing/LandingCursor";
import { LandingMediaProvider } from "@/components/features/landing/LandingMediaProvider";
import { LandingNav } from "@/components/features/landing/LandingNav";
import { LandingScrollEnhance } from "@/components/features/landing/LandingScrollEnhance";
import { SosBand } from "@/components/features/landing/SosBand";
import { LandingClosing } from "@/components/features/landing/sections/LandingClosing";
import { LandingCompanion } from "@/components/features/landing/sections/LandingCompanion";
import { LandingFaq } from "@/components/features/landing/sections/LandingFaq";
import { LandingFooter } from "@/components/features/landing/sections/LandingFooter";
import { LandingHero } from "@/components/features/landing/sections/LandingHero";
import { LandingScreening } from "@/components/features/landing/sections/LandingScreening";
import { LandingStart } from "@/components/features/landing/sections/LandingStart";
import { LandingToday } from "@/components/features/landing/sections/LandingToday";

const bodyFont = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-landing-body",
});

export function LandingPage() {
  return (
    <LandingMediaProvider>
      <div className={`landing-root ${bodyFont.variable}`}>
        <a className="landing-skip-link" href="#noi-dung">
          Đi đến nội dung chính
        </a>
        <LandingScrollEnhance />
        <LandingCursor />
        <LandingNav />
        <main id="noi-dung" tabIndex={-1}>
          <LandingHero />
          <LandingToday />
          <LandingCompanion />
          <LandingScreening />
          <LandingStart />
          <LandingFaq />
          <SosBand />
          <LandingClosing />
        </main>
        <LandingFooter />
      </div>
    </LandingMediaProvider>
  );
}
