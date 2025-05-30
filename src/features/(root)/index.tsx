import React from "react";
import { CarouselSlider } from "./_components/CarouselSlider";
import TopUpcomingEvent from "./_components/TopUpcomingEvent";
import BannerOrganizer from "./_components/BannerOrganizer";
import EventCategory from "./_components/EventCategory";
import RecommendedEvent from "./_components/RecommendedEvent";
import LocationEvent from "./_components/LocationEvent";
import Categories from "./_components/Category";

const LandingPage = () => {
  return (
    <section className="space-y-7 p-4">
      <CarouselSlider />
      <TopUpcomingEvent />
      <BannerOrganizer />
      <RecommendedEvent />
      <Categories />
      <LocationEvent />
    </section>
  );
};

export default LandingPage;
