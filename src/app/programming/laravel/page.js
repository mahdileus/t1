import TechnologyPage from "@/app/components/technology/TechnologyPage";
import { laravelData } from "../../data/technologies/laravel";

export const metadata = {
  title: "طراحی و توسعه اپلیکیشن اندروید",
  description:
    "طراحی و توسعه اپلیکیشن Android با Kotlin، Jetpack Compose و معماری مدرن اندروید.",
};

export default function LaravelPage() {
  return <TechnologyPage technology={laravelData} />;
}