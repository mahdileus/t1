import TechnologyPage from "@/app/components/technology/TechnologyPage";
import { nodeData } from "../../data/technologies/node";

export const metadata = {
  title: "طراحی و توسعه اپلیکیشن اندروید",
  description:
    "طراحی و توسعه اپلیکیشن Android با Kotlin، Jetpack Compose و معماری مدرن اندروید.",
};

export default function NodePage() {
  return <TechnologyPage technology={nodeData} />;
}