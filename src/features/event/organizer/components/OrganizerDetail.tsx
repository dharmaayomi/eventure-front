// import Image from "next/image";
// import { FC } from "react";
// import { Organizer } from "@/types/organizer";
// import EventCard from "../../EventCard";
// import Markdown from "@/components/Markdown";
// import Link from "next/link";
// import OrganizerReviewSection from "./OrganizerReview";

// interface OrganizerDetailProps {
//   organizer: Organizer;
// }

// const OrganizerDetailSection: FC<OrganizerDetailProps> = ({ organizer }) => {
//   return (
//     <section className="mx-auto mt-10 py-12">
//       <section className="min-h-screen py-12">
//         <div className="container mx-auto space-y-16 px-4">
//           <div className="flex flex-col items-start gap-10 md:flex-row">
//             <div className="flex justify-center md:w-1/3">
//               <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-[#004DE8] bg-white shadow-xl">
//                 <Image
//                   src={organizer.profilePic || ""}
//                   alt={organizer.name}
//                   fill
//                   className="object-cover"
//                   sizes="176px"
//                 />
//               </div>
//             </div>

//             {/* Organizer Info */}
//             <div className="space-y-4 md:w-2/3">
//               <h1 className="flex items-center gap-2 text-4xl font-extrabold text-[#FF7F00]">
//                 {organizer.name.toUpperCase()}
//                 <span className="rounded-full bg-yellow-200 px-2 py-0.5 text-sm text-yellow-800">
//                   Organizer
//                 </span>
//               </h1>

//               {organizer.aboutUs && (
//                 <p className="rounded-xl border border-gray-100 bg-white p-4 text-base leading-relaxed text-gray-700 shadow-sm">
//                   {organizer.aboutUs}
//                 </p>
//               )}

//               <div className="text-md space-y-1 text-gray-500">
//                 <p>
//                   📅 Created:{" "}
//                   {new Date(organizer.createdAt).toLocaleDateString("id-ID")}
//                 </p>
//                 <p>
//                   🔄 Last update:{" "}
//                   {new Date(organizer.updatedAt).toLocaleDateString("id-ID")}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Event List */}
//           <div>
//             <h2 className="mb-6 text-3xl font-bold text-indigo-700">
//               ✨ Events by {organizer.name}
//             </h2>

//             {organizer.events.length === 0 ? (
//               <p className="text-sm text-gray-500 italic">
//                 Belum ada event~ 😢
//               </p>
//             ) : (
//               <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                 {organizer.events.map((event) => (
//                   <Link key={event.id} href={`/events/${event.slug}`}>
//                     <li className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-lg transition duration-300 hover:shadow-xl">
//                       {/* Thumbnail */}
//                       <div className="relative h-40 w-full bg-gray-100">
//                         <Image
//                           src={event.thumbnail}
//                           alt={event.name}
//                           fill
//                           className="object-cover"
//                           sizes="(max-width: 768px) 100vw, 33vw"
//                         />
//                       </div>

//                       {/* Content */}
//                       <div className="space-y-2 p-4">
//                         <h3 className="truncate text-lg font-bold text-indigo-800">
//                           {event.name.toUpperCase()}
//                         </h3>

//                         <div className="line-clamp-3">
//                           <Markdown content={event.desc} />
//                         </div>
//                         <div className="mt-3 space-y-1 text-xs text-gray-500">
//                           <p>📍 {event.location}</p>
//                           <p>
//                             🗓️{" "}
//                             {new Date(event.startDate).toLocaleDateString(
//                               "id-ID",
//                             )}{" "}
//                             -{" "}
//                             {new Date(event.endDate).toLocaleDateString(
//                               "id-ID",
//                             )}
//                           </p>
//                           <p>🎟️ {event.totalTransactions} transaksi</p>
//                         </div>
//                       </div>
//                     </li>
//                   </Link>
//                 ))}
//               </ul>
//             )}
//           </div>

//           <OrganizerReviewSection slug={organizer.slug} />
//         </div>
//       </section>
//     </section>
//   );
// };

// export default OrganizerDetailSection;
import Image from "next/image";
import { FC } from "react";
import { Organizer } from "@/types/organizer";
import Markdown from "@/components/Markdown";
import Link from "next/link";
import OrganizerReviewSection from "./OrganizerReview";

interface OrganizerDetailProps {
  organizer: Organizer;
}

const OrganizerDetailSection: FC<OrganizerDetailProps> = ({ organizer }) => {
  return (
    <section className="mt-20">
      <div className="container mx-auto px-4">
        {/* Header Section with Profile */}
        <div className="relative mb-16 rounded-3xl bg-white p-8 shadow-xl">
          {/* Decorative elements */}
          <div className="absolute -top-3 left-0 h-3 w-1/3 rounded-t-lg bg-[#004DE8]"></div>
          <div className="absolute -top-3 right-0 h-3 w-1/3 rounded-t-lg bg-[#FF7F00]"></div>

          <div className="flex flex-col items-center gap-10 md:flex-row">
            {/* Profile Image */}
            <div className="md:w-1/3">
              <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-full border-4 border-[#004DE8] bg-white shadow-xl">
                <Image
                  src={organizer.profilePic || ""}
                  alt={organizer.name}
                  fill
                  className="object-cover"
                  sizes="224px"
                />
                <div className="absolute inset-0 rounded-full ring-4 ring-[#FF7F00] ring-offset-2"></div>
              </div>
            </div>

            {/* Organizer Info */}
            <div className="space-y-5 md:w-2/3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-4xl font-extrabold text-[#004DE8]">
                  {organizer.name.toUpperCase()}
                </h1>
                <span className="rounded-full bg-[#FF7F00] px-3 py-1 text-sm font-bold text-white shadow-md">
                  Organizer
                </span>
              </div>

              {organizer.aboutUs && (
                <div className="rounded-xl border-l-4 border-[#004DE8] bg-blue-50 p-5 text-lg leading-relaxed text-gray-700 shadow-sm">
                  <Markdown content={organizer.aboutUs} />
                </div>
              )}

              <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-500">
                <div className="flex items-center gap-1">
                  <span className="rounded-full bg-blue-100 p-2 text-[#004DE8]">
                    📅
                  </span>
                  <span>
                    Created:{" "}
                    <span className="font-bold">
                      {new Date(organizer.createdAt).toLocaleDateString(
                        "id-ID",
                      )}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="rounded-full bg-orange-100 p-2 text-[#FF7F00]">
                    🔄
                  </span>
                  <span>
                    Last update:{" "}
                    <span className="font-bold">
                      {new Date(organizer.updatedAt).toLocaleDateString(
                        "id-ID",
                      )}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event List */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-[#004DE8]">
              Events by {organizer.name}
            </h2>
            <div className="h-1 flex-grow rounded-full bg-[#004DE8]"></div>
            <span className="rounded-full bg-[#004DE8] p-2 text-lg text-white">
              ✨
            </span>
          </div>

          {organizer.events.length === 0 ? (
            <div className="flex items-center justify-center rounded-xl bg-blue-50 p-10 text-center">
              <p className="text-xl font-medium text-gray-500 italic">
                Belum ada event~ 😢
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {organizer.events.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`}>
                  <div className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                    {/* Event Image with Overlay */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={event.thumbnail}
                        alt={event.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 p-5">
                      <h3 className="truncate text-xl font-bold text-[#FF7F00] group-hover:text-[#004DE8]">
                        {event.name.toUpperCase()}
                      </h3>

                      <div className="line-clamp-3 text-gray-700">
                        <Markdown content={event.desc} />
                      </div>

                      <div className="mt-4 space-y-2 rounded-lg bg-blue-50 p-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-[#FF7F00]">📍</span>
                          <span className="font-medium text-gray-700">
                            {event.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FF7F00]">🗓️</span>
                          <span className="font-medium text-gray-700">
                            {new Date(event.startDate).toLocaleDateString(
                              "id-ID",
                            )}{" "}
                            -
                            {new Date(event.endDate).toLocaleDateString(
                              "id-ID",
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#FF7F00]">🎟️</span>
                          <span className="font-medium text-gray-700">
                            {event.totalTransactions} transaksi
                          </span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <span className="inline-block rounded-full bg-[#004DE8] px-4 py-1 text-sm font-bold text-white transition-transform group-hover:scale-105 group-hover:bg-[#FF7F00]">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Review Section */}
        <div className="mt-20 rounded-3xl bg-white p-8 shadow-xl">
          <OrganizerReviewSection slug={organizer.slug} />
        </div>
      </div>
    </section>
  );
};

export default OrganizerDetailSection;
