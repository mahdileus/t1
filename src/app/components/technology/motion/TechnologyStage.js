"use client";

import dynamic from "next/dynamic";

const TechnologyStage3D = dynamic(() => import("./TechnologyStage3D"), {
  ssr: false,
});

export default function TechnologyStage({ technology }) {
  if (!technology?.motion?.logo || !technology?.theme) return null;

  return <TechnologyStage3D key={technology.slug} technology={technology} />;
}
