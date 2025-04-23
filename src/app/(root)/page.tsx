"use client";
import EventCard from "@/features/event/EventCard";
import CategoriesEvent from "../../features/_components/EventCategory";
import { CarouselSlider } from "@/features/_components/CarouselSlider";
import LandingPage from "@/features/(root)";

export default function Page() {
  return (
    <main className="container mx-auto">
      <div className="mt-30">
        <LandingPage />
      </div>
    </main>
  );
}
