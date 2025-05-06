import Image from "next/image";
import { FC } from "react";
import { Organizer } from "@/types/organizer";
import EventCard from "../../EventCard";
import Markdown from "@/components/Markdown";
import Link from "next/link";
import OrganizerReviewSection from "./OrganizerReview";

interface OrganizerDetailProps {
  organizer: Organizer;
}

const OrganizerDetailSection: FC<OrganizerDetailProps> = ({ organizer }) => {
  return (
    <section className="mx-auto mt-10 py-12">
      <section className="min-h-screen py-12">
        <div className="container mx-auto space-y-16 px-4">
          <div className="flex flex-col items-start gap-10 md:flex-row">
            <div className="flex justify-center md:w-1/3">
              <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-[#004DE8] bg-white shadow-xl">
                <Image
                  src={organizer.profilePic || ""}
                  alt={organizer.name}
                  fill
                  className="object-cover"
                  sizes="176px"
                />
              </div>
            </div>

            {/* Organizer Info */}
            <div className="space-y-4 md:w-2/3">
              <h1 className="flex items-center gap-2 text-4xl font-extrabold text-[#FF7F00]">
                {organizer.name.toUpperCase()}
                <span className="rounded-full bg-yellow-200 px-2 py-0.5 text-sm text-yellow-800">
                  Organizer
                </span>
              </h1>

              {organizer.aboutUs && (
                <p className="rounded-xl border border-gray-100 bg-white p-4 text-base leading-relaxed text-gray-700 shadow-sm">
                  {organizer.aboutUs}
                </p>
              )}

              <div className="text-md space-y-1 text-gray-500">
                <p>
                  📅 Created:{" "}
                  {new Date(organizer.createdAt).toLocaleDateString("id-ID")}
                </p>
                <p>
                  🔄 Last update:{" "}
                  {new Date(organizer.updatedAt).toLocaleDateString("id-ID")}
                </p>
              </div>
            </div>
          </div>

          {/* Event List */}
          <div>
            <h2 className="mb-6 text-3xl font-bold text-indigo-700">
              ✨ Events by {organizer.name}
            </h2>

            {organizer.events.length === 0 ? (
              <p className="text-sm text-gray-500 italic">
                Belum ada event~ 😢
              </p>
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {organizer.events.map((event) => (
                  <Link key={event.id} href={`/events/${event.slug}`}>
                    <li className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-lg transition duration-300 hover:shadow-xl">
                      {/* Thumbnail */}
                      <div className="relative h-40 w-full bg-gray-100">
                        <Image
                          src={event.thumbnail}
                          alt={event.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>

                      {/* Content */}
                      <div className="space-y-2 p-4">
                        <h3 className="truncate text-lg font-bold text-indigo-800">
                          {event.name.toUpperCase()}
                        </h3>

                        <Markdown content={event.desc} />

                        <div className="mt-3 space-y-1 text-xs text-gray-500">
                          <p>📍 {event.location}</p>
                          <p>
                            🗓️{" "}
                            {new Date(event.startDate).toLocaleDateString(
                              "id-ID",
                            )}{" "}
                            -{" "}
                            {new Date(event.endDate).toLocaleDateString(
                              "id-ID",
                            )}
                          </p>
                          <p>🎟️ {event.totalTransactions} transaksi</p>
                        </div>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>

          <OrganizerReviewSection slug={organizer.slug} />
        </div>
      </section>
    </section>
  );
};

export default OrganizerDetailSection;
