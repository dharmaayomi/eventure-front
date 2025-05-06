"use client";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import useGetOrganizerByUserId from "@/hooks/api/organizer/useGetOrganizerByUserId";
import useUploadOrganizerProfile from "@/hooks/api/organizer/useUploadOrganizerProfile";
import { useModal } from "@/hooks/useModal";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { UploadOrganizerPicSchema } from "../schema";

interface ButtonOrganizerUploaderProps {
  id: number;
}

export const ButtonOrganizerUploader: FC<ButtonOrganizerUploaderProps> = ({
  id,
}) => {
  // Get the event ID directly from the data
  const { data: organizer, isLoading: organizerLoading } =
    useGetOrganizerByUserId(id);
  const organizerId = organizer?.id;
  const router = useRouter();
  const session = useSession();
  const user = session.data?.user;

  // Make sure to pass the organizer ID as a parameter only when it's available
  const { mutateAsync: uploadOrganizerProfile, isPending } =
    useUploadOrganizerProfile();
  const { isOpen, openModal, closeModal } = useModal();

  const formik = useFormik({
    initialValues: {
      profilePic: null as File | null,
    },
    validationSchema: UploadOrganizerPicSchema,
    onSubmit: async (values) => {
      if (!organizerId) {
        toast.error("Event ID not available");
        return;
      }
      console.log("Formik onSubmit called", values);
      try {
        setUploading(true);
        if (!values.profilePic) {
          toast.error("Please select a file first!");
          return;
        }

        // Make sure eventId is available
        if (!organizerId) {
          console.error("Event ID is missing", event);
          toast.error("Event data is not available yet");
          return;
        }

        // Log before submission for debugging
        console.log("Using event ID:", organizerId);
        console.log("Submitting file:", values.profilePic);

        // Direct submission with just the profilePic file
        await uploadOrganizerProfile({
          profilePic: values.profilePic,
        });

        console.log("Upload completed successfully");

        router.refresh();
        closeModal();
      } catch (error) {
        console.error("Failed to upload profilePic:", error);
        toast.error("Failed to upload profilePic. Please try again.");
      } finally {
        setUploading(false);
      }
    },
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted manually");
    try {
      await formik.submitForm();
    } catch (err) {
      console.error("Error in manual submit:", err);
    }
  };

  const [isUploading, setUploading] = useState(false);

  const handleUploadChange = (files: File[]) => {
    const file = files?.[0] ?? null;
    if (file) {
      console.log("File selected:", file.name, file.size, "bytes");
      // Ensure the file is properly set in formik
      formik.setFieldValue("profilePic", file);
    } else {
      console.log("No file selected");
      formik.setFieldValue("profilePic", null);
    }
  };

  // Debug logs to check if event data is loaded
  useEffect(() => {
    if (organizer) {
      console.log("Event data loaded:", organizer.id);
    }
  }, [organizer]);

  // Ensure the hook gets recreated when eventId changes
  useEffect(() => {
    console.log("Event ID for upload hook:", organizerId);
  }, [organizerId]);

  return (
    <div>
      <div>
        <div className="max-w-md md:max-w-lg">
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            This is your public organizer photo shown to users and buyers. For
            best results, upload a <strong>square image (1:1 ratio)</strong>{" "}
            with a recommended size of <strong>600×600 px</strong>, max file
            size <strong>2MB</strong>. Supported formats:{" "}
            <strong>JPG, PNG</strong>.
          </p>
        </div>
        <Button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#004DE8] px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#003bb3] active:scale-[0.98] lg:w-auto dark:bg-[#004DE8]/90 dark:hover:bg-[#003bb3]"
        >
          <svg
            className="fill-white"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill="currentColor"
            />
          </svg>
          Edit Organizer Picture
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
        <div className="no-scrollbar relative h-[100vh] w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Update profilePic
            </h4>
            <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
              Upload a new image to update the event profilePic.
            </p>
          </div>

          {!!user && (
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="custom-scrollbar h-[400px] overflow-y-auto px-2 pb-3">
                <div className="mt-7">
                  <div className="mx-auto min-h-90 w-full max-w-4xl rounded-lg border border-dashed border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
                    <FileUpload onChange={handleUploadChange} />
                  </div>

                  {formik.values.profilePic && (
                    <p className="mt-2 text-sm text-green-600">
                      Selected file: {formik.values.profilePic.name} (
                      {Math.round(formik.values.profilePic.size / 1024)} KB)
                    </p>
                  )}
                  {formik.errors.profilePic && (
                    <p className="mt-2 text-sm text-red-600">
                      {formik.errors.profilePic as string}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3 px-2 lg:justify-end">
                <Button size="sm" variant="outline" onClick={closeModal}>
                  Close
                </Button>
                <Button
                  size="sm"
                  type="submit"
                  disabled={
                    isUploading || !formik.values.profilePic || !organizerId
                  }
                  onClick={() => {
                    console.log("Save button clicked");
                    console.log("Form values:", formik.values);
                    console.log("Form errors:", formik.errors);
                    console.log("Form touched:", formik.touched);
                  }}
                >
                  {isUploading ? "Uploading..." : "Save Changes"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
};
