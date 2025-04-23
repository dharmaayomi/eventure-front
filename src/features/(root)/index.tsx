import React from "react";
import { CarouselSlider } from "../_components/CarouselSlider";
import EventCard from "../event/EventCard";
import CategoriesEvent from "../_components/EventCategory";
import LocationEvent from "../_components/LocationEvent";
import TopUpcomingEvent from "../_components/TopUpcomingEvent";
import RecommendedEvent from "../_components/RecommendedEvent";
import EventCategory from "../_components/EventCategory";
import BannerOrganizer from "../_components/BannerOrganizer";

const LandingPage = () => {
  return (
    <section className="space-y-7 p-4">
      <CarouselSlider />
      <TopUpcomingEvent />
      <BannerOrganizer />
      <RecommendedEvent />
      <EventCategory />
      <LocationEvent />
    </section>
  );
};

export default LandingPage;
