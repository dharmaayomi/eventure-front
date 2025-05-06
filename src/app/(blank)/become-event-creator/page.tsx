// app/components/EventCreatorInvitation.tsx

"use client";

import React, { JSX } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarCheck2, Users } from "lucide-react";
import { IconMicrophone } from "@tabler/icons-react";

type Feature = {
  icon: JSX.Element;
  title: string;
  description: string;
};

const EventCreatorInvitation: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/register");
  };

  const features: Feature[] = [
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: "Build Communities",
      description:
        "Connect people and create lasting relationships through memorable events.",
    },
    {
      icon: <CalendarCheck2 className="h-12 w-12 text-blue-600" />,
      title: "Create Experiences",
      description:
        "Design and host events that leave a lasting impact on your attendees.",
    },
    {
      icon: <IconMicrophone className="h-12 w-12 text-blue-600" />,
      title: "Share Knowledge",
      description:
        "Platform for speakers and experts to share their insights and expertise.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
            Shock Everyone —{" "}
            <span className="text-blue-600">Become an Event Creator</span> with{" "}
            <span className="text-blue-600">Eventure!</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 md:text-2xl">
            Transform your ideas into unforgettable experiences. Join{" "}
            <strong className="text-blue-600">Eventure</strong> and start
            creating events that truly matter.
          </p>
        </motion.div>

        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="rounded-2xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <button
            onClick={handleClick}
            className="focus:ring-opacity-50 w-full transform rounded-full bg-blue-600 px-8 py-4 text-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none md:w-auto"
            aria-label="Become an Event Creator"
          >
            Become an Event Creator
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default EventCreatorInvitation;
