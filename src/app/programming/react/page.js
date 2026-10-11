import TechnologyPage from "@/app/components/technology/TechnologyPage";
import { reactData } from "../../data/technologies/react";

export const metadata = {
  title: "طراحی و توسعه اپلیکیشن اندروید",
  description:
    "طراحی و توسعه اپلیکیشن Android با Kotlin، Jetpack Compose و معماری مدرن اندروید.",
};

export default function ReactPage() {
  return <TechnologyPage technology={reactData} />;
}