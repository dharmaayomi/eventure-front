// "use client";

// import useGetReviews from "@/hooks/api/transaction/useGetReviews";
// import { FC } from "react";

// interface OrganizerReviewProps {
//   slug: string;
// }

// const OrganizerReviewSection: FC<OrganizerReviewProps> = ({ slug }) => {
//   const { data: reviews, isPending, error } = useGetReviews(slug);
//   console.log("review data", reviews);

//   if (isPending) return <div>Loading...</div>;
//   if (error) return <div>Something went wrong!</div>;
//   if (!reviews) return <div>No data available.</div>;

//   return (
//     <section className="space-y-6">
//       <h1 className="text-2xl font-bold text-indigo-700">
//         Reviews for the organizer{" "}
//       </h1>
//       <ul className="space-y-4">
//         {reviews.map((review) => (
//           <li key={review.id} className="rounded border p-4 shadow-sm">
//             <p className="font-semibold text-indigo-600">
//               Rating: {review.rating}
//             </p>
//             <p className="font-semibold text-indigo-600">
//               Review: {review.review}
//             </p>
//             <p className="mt-1 text-sm text-gray-400">
//               By: {review.transaction.user.fullName ?? "Anonymous"}
//             </p>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// };

// export default OrganizerReviewSection;
"use client";

import useGetReviews from "@/hooks/api/transaction/useGetReviews";
import { FC } from "react";

interface OrganizerReviewProps {
  slug: string;
}

const OrganizerReviewSection: FC<OrganizerReviewProps> = ({ slug }) => {
  const { data: reviews, isPending, error } = useGetReviews(slug);
  console.log("review data", reviews);

  if (isPending)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Something went wrong!</div>
    );
  if (!reviews)
    return <div className="text-center text-gray-500">No data available.</div>;

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold" style={{ color: "#004DE8" }}>
        Organizer Reviews
      </h1>
      <ul className="space-y-5">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold" style={{ color: "#004DE8" }}>
                ⭐ Rating: {review.rating}
              </p>
              <p className="text-sm text-gray-500">
                {review.transaction.user.fullName ?? "Anonymous"}
              </p>
            </div>
            <p className="mt-3 text-gray-700">{review.review}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OrganizerReviewSection;
