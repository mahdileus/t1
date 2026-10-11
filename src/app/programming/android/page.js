import TechnologyPage from "@/app/components/technology/TechnologyPage";
import { androidData } from "../../data/technologies/android";


export const metadata = {
  title: "طراحی و توسعه اپلیکیشن اندروید",
  description:
    "طراحی و توسعه اپلیکیشن Android با Kotlin، Jetpack Compose و معماری مدرن اندروید.",
};

export default function AndroidPage() {
  return <TechnologyPage technology={androidData} />

}