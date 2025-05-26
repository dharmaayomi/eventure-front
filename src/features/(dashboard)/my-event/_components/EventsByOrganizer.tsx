// "use client";
// import { Button } from "@/components/ui/button";
// import { useModal } from "@/hooks/useModal";
// import { cn } from "@/lib/utils";
// import { Event } from "@/types/event";
// import { Grid, List } from "lucide-react";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { FC, useState } from "react";
// import CardView from "./CardView";
// import ListView from "./ListView";

// export const EventsByOrganizer: FC = () => {
//   const router = useRouter();
//   const session = useSession();
//   const user = session.data?.user;

//   const { isOpen, openModal, closeModal } = useModal();
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   return (
//     <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
//       <div className="container mx-auto px-4 py-8">
//         <div className="mb-6 flex items-center justify-between">
//           <Link href="/dashboard/my-event/create">
//             <Button>Create Event</Button>
//           </Link>

//           <Link href="/dashboard/create-ticket">
//             <Button>Create Ticket</Button>
//           </Link>

//           <Link href="/dashboard/create-voucher">
//             <Button>Create Voucher</Button>
//           </Link>

//           <div className="flex space-x-2 rounded-lg bg-gray-100 p-1">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setViewMode("grid")}
//               className={cn({ "bg-white shadow-sm": viewMode === "grid" })}
//             >
//               <Grid />
//             </Button>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setViewMode("list")}
//               className={cn({ "bg-white shadow-sm": viewMode === "list" })}
//             >
//               <List />
//             </Button>
//           </div>
//         </div>

//         {viewMode === "grid" ? <CardView /> : <ListView />}
//       </div>
//     </div>
//   );
// };
"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { cn } from "@/lib/utils";
import { Event } from "@/types/event";
import { Grid, List, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import CardView from "./CardView";
import ListView from "./ListView";

export const EventsByOrganizer: FC = () => {
  const router = useRouter();
  const session = useSession();
  const user = session.data?.user;

  const { isOpen, openModal, closeModal } = useModal();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/my-event/create">
              <Button className="flex items-center gap-1">
                <Plus size={16} />
                Create Event
              </Button>
            </Link>

            <Link href="/dashboard/create-ticket">
              <Button variant="outline">Create Ticket</Button>
            </Link>

            <Link href="/dashboard/create-voucher">
              <Button variant="outline">Create Voucher</Button>
            </Link>
          </div>

          <div className="flex rounded-lg bg-gray-100 p-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={cn({ "bg-white shadow-sm": viewMode === "grid" })}
            >
              <Grid size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("list")}
              className={cn({ "bg-white shadow-sm": viewMode === "list" })}
            >
              <List size={18} />
            </Button>
          </div>
        </div>

        {viewMode === "grid" ? <CardView /> : <ListView />}
      </div>
    </div>
  );
};
