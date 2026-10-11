import TechnologyHero from "./TechnologyHero";
import TechnologyNavigation from "./TechnologyNavigation";
import TechnologyIntroduction from "./TechnologyIntroduction";
import TechnologyArchitecture from "./TechnologyArchitecture";
import TechnologyUseCases from "./TechnologyUseCases";
import TechnologyComparison from "./TechnologyComparison";
import TechnologyCost from "./TechnologyCost";
import TechnologyFAQ from "./TechnologyFAQ";

import TechnologyStage from "./motion/TechnologyStage";

export default function TechnologyPage({
  technology,
}) {
  if (!technology) return null;

  return (
    <main
      dir="rtl"
      data-technology={
        technology.slug
      }
      style={{
        "--tech-color":
          technology.theme?.rgb ||
          "61, 220, 132",

        "--tech-hex":
          technology.theme?.primary ||
          "#3DDC84",
      }}
      className="
        relative
        overflow-x-hidden
        font-yekan-bakh
        bg-[#0d101e]
      "
    >
      {/* =====================================
          3D Logo Stage
      ===================================== */}

      <TechnologyStage technology={technology} />

      {/* =====================================
          Background
      ===================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-0
          top-20
          size-[500px]
          rounded-full
          blur-3xl
        "
        style={{
          background:
            "rgba(var(--tech-color), .12)",
        }}
      />

      {/* =====================================
          Page
      ===================================== */}

      <div
        className="
          mx-auto
          mt-20
          w-11/12
          space-y-40
          p-3
          md:container
        "
      >
        <TechnologyHero
          technology={technology}
        />

        <TechnologyNavigation
          items={
            technology.navigation ||
            []
          }
        />

        <TechnologyIntroduction
          data={
            technology.introduction
          }
        />

        <TechnologyArchitecture
          data={
            technology.architecture
          }
        />

        <TechnologyUseCases
          data={
            technology.useCases
          }
        />

        <TechnologyComparison
          data={
            technology.comparison
          }
        />

        <TechnologyCost
          data={technology.cost}
        />

        <TechnologyFAQ
          data={technology.faq}
        />
      </div>
    </main>
  );
}