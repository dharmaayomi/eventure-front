// "use client";

// import { Button } from "@/components/ui/button";
// import useCreateReview from "@/hooks/api/transaction/useCreateReviewTransaction";
// import { Rating } from "@/types/rating";
// import * as Dialog from "@radix-ui/react-dialog";
// import { useFormik } from "formik";
// import { FC, useState } from "react";
// import { AddReviewSchema } from "../review/schema";
// import { Label } from "@/components/ui/label";

// interface AddReviewProps {
//   uuid: string;
// }

// const AddReview: FC<AddReviewProps> = ({ uuid }) => {
//   const { mutateAsync: createReview, isPending } = useCreateReview(uuid);
//   const [submitted, setSubmitted] = useState<boolean>(false);

//   const formik = useFormik({
//     initialValues: {
//       review: "",
//       rating: Rating.GOOD,
//     },
//     validationSchema: AddReviewSchema,
//     onSubmit: async (values) => {
//       console.log("ini value fe", values);
//       await createReview(values);
//       setSubmitted(true);
//     },
//   });

//   return (
//     <Dialog.Root>
//       <Dialog.Trigger className="rounded-lg bg-[#004DE8] px-4 py-2 text-white transition hover:bg-[#0042e8]">
//         Add Review
//       </Dialog.Trigger>

//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 z-[9999] bg-black opacity-50" />
//         <Dialog.Content className="fixed top-1/2 left-1/2 z-[9999] w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-lg">
//           <Dialog.Title className="mb-4 text-xl font-bold text-[#004DE8]">
//             Add Review
//           </Dialog.Title>

//           {submitted && (
//             <div className="mb-4 rounded bg-green-100 px-4 py-2 text-green-700">
//               Congratulation! You have sent a review for this event.
//             </div>
//           )}
//           <form className="mt-10 space-y-4" onSubmit={formik.handleSubmit}>
//             <div className="grid gap-2">
//               <Label htmlFor="rating">Rating</Label>
//               <select
//                 id="rating"
//                 name="rating"
//                 required
//                 value={formik.values.rating}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="rounded-md border border-gray-200 shadow-2xs"
//               >
//                 <option value="" disabled>
//                   Select Rating
//                 </option>

//                 {Object.entries(Rating).map(([key, value]) => (
//                   <option key={value} value={value}>
//                     {key}
//                   </option>
//                 ))}
//               </select>

//               {formik.touched.rating && !!formik.errors.rating && (
//                 <p className="text-xs text-red-500">{formik.errors.rating}</p>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="review"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Review
//               </label>
//               <div className="mt-1">
//                 <textarea
//                   id="review"
//                   name="review"
//                   rows={4}
//                   className={`block w-full rounded-md border ${
//                     formik.touched.review && formik.errors.review
//                       ? "border-red-500"
//                       : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
//                   } p-2 shadow-sm focus:outline-none sm:text-sm`}
//                   value={formik.values.review}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//               </div>
//               {formik.touched.review && formik.errors.review && (
//                 <p className="mt-2 text-xs text-red-500">
//                   {formik.errors.review}
//                 </p>
//               )}
//             </div>

//             <Button type="submit" disabled={isPending} className="mt-8">
//               {isPending ? "Loading..." : "Submit"}
//             </Button>
//           </form>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// };

// export default AddReview;
"use client";

import { Button } from "@/components/ui/button";
import useCreateReview from "@/hooks/api/transaction/useCreateReviewTransaction";
import { Rating } from "@/types/rating";
import * as Dialog from "@radix-ui/react-dialog";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { AddReviewSchema } from "../review/schema";
import { Label } from "@/components/ui/label";

interface AddReviewProps {
  uuid: string;
}

const AddReview: FC<AddReviewProps> = ({ uuid }) => {
  const { mutateAsync: createReview, isPending } = useCreateReview(uuid);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      review: "",
      rating: Rating.GOOD,
    },
    validationSchema: AddReviewSchema,
    onSubmit: async (values) => {
      console.log("ini value fe", values);
      await createReview(values);
      setSubmitted(true);
    },
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-lg bg-[#004DE8] px-4 py-2 text-white transition hover:bg-[#0038b8]">
        Add Review
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-[9999] w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-white p-8 shadow-2xl">
          <Dialog.Title className="mb-4 text-2xl font-bold text-[#004DE8]">
            Add Review
          </Dialog.Title>

          {submitted && (
            <div className="mb-4 rounded-lg bg-green-100 px-4 py-2 text-green-700">
              🎉 Congratulation! You have sent a review for this event.
            </div>
          )}
          <form className="mt-6 space-y-6" onSubmit={formik.handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="rating" className="font-semibold text-[#004DE8]">
                Rating
              </Label>
              <select
                id="rating"
                name="rating"
                required
                value={formik.values.rating}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-[#004DE8] focus:ring-[#004DE8]"
              >
                <option value="" disabled>
                  Select Rating
                </option>

                {Object.entries(Rating).map(([key, value]) => (
                  <option key={value} value={value}>
                    {key}
                  </option>
                ))}
              </select>

              {formik.touched.rating && !!formik.errors.rating && (
                <p className="text-xs text-red-500">{formik.errors.rating}</p>
              )}
            </div>

            <div>
              <Label
                htmlFor="review"
                className="block text-sm font-semibold text-[#004DE8]"
              >
                Review
              </Label>
              <div className="mt-1">
                <textarea
                  id="review"
                  name="review"
                  rows={4}
                  className={`block w-full rounded-lg border ${
                    formik.touched.review && formik.errors.review
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#004DE8] focus:ring-[#004DE8]"
                  } p-3 shadow-sm focus:outline-none sm:text-sm`}
                  value={formik.values.review}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.review && formik.errors.review && (
                <p className="mt-2 text-xs text-red-500">
                  {formik.errors.review}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="mt-4 w-full rounded-lg bg-[#004DE8] py-2 text-white transition hover:bg-[#0038b8]"
            >
              {isPending ? "Loading..." : "Submit"}
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddReview;
