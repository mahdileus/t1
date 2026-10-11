import TechnologyPage from "@/app/components/technology/TechnologyPage";
import { phpData } from "../../data/technologies/php";

export const metadata = {
  title: "طراحی و توسعه اپلیکیشن اندروید",
  description:
    "طراحی و توسعه اپلیکیشن Android با Kotlin، Jetpack Compose و معماری مدرن اندروید.",
};

export default function PhpPage() {
  return <TechnologyPage technology={phpData} />;
}