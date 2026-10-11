import TechnologyPage from "@/app/components/technology/TechnologyPage";
import { nextData } from "../../data/technologies/next";

export const metadata = {
  title: "طراحی و توسعه اپلیکیشن اندروید",
  description:
    "طراحی و توسعه اپلیکیشن Android با Kotlin، Jetpack Compose و معماری مدرن اندروید.",
};

export default function NextPage() {
  return <TechnologyPage technology={nextData} />;
}