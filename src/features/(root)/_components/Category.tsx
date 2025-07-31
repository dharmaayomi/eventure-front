"use client";

import {
  Laptop,
  Music2,
  PaintBucket,
  Sprout,
  VenetianMask,
  WineIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Categories = () => {
  const router = useRouter();
  const categories = [
    {
      id: 1,
      title: "Music",
      slug: "music",
      icon: <Music2 className="mb-4 text-4xl text-blue-600" />,
      image: "/category/music.webp",
      description: "Experience live music performances and vibrant festivals",
    },
    {
      id: 2,
      title: "Education",
      slug: "education",
      icon: <Sprout className="mb-4 text-4xl text-orange-500" />,
      image: "/category/education.webp",
      description:
        "Learn from experts in various fields through engaging workshops and seminars",
    },
    {
      id: 3,
      title: "Culture",
      slug: "culture",
      icon: <Laptop className="mb-4 text-4xl text-blue-600" />,
      image: "/category/culture.webp",
      description: "Explore creative artworks and exhibitions",
    },
    {
      id: 4,
      title: "Business",
      slug: "business",
      icon: <PaintBucket className="mb-4 text-4xl text-orange-500" />,
      image: "/category/business.webp",
      description:
        "Engage with inspiring business events and networking opportunities",
    },
    {
      id: 5,
      title: "Fashion",
      slug: "fashion",
      icon: <WineIcon className="mb-4 text-4xl text-blue-600" />,
      image: "/category/fashion.webp",
      description: "Discover the latest fashion trends and styles",
    },
    {
      id: 6,
      title: "Sport",
      slug: "sport",
      icon: <VenetianMask className="mb-4 text-4xl text-orange-500" />,
      image: "/category/sport.webp",
      description: "Join exciting sports events and competitions",
    },
  ];

  return (
    <div className="container mx-auto p-4 py-5">
      <h2 className="mb-12 text-center text-4xl font-bold text-gray-800">
        Explore Event Categories
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
            tabIndex={0}
            role="button"
            onClick={() =>
              router.push(
                `/events/category?category=${category.title.toUpperCase()}`,
              )
            }
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={category.image}
                alt={category.title}
                height={200}
                width={200}
                className="h-full w-full transform object-cover transition-transform duration-300 hover:scale-110"
                loading="lazy"
              />
              <div className="bg-opacity-40 hover:bg-opacity-30 absolute inset-0 bg-black/60 transition-opacity duration-300" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
              {category.icon}
              <h3 className="mb-2 text-center text-xl font-semibold md:text-2xl">
                {category.title}
              </h3>
              <p className="text-center text-sm opacity-90">
                {category.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
