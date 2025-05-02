"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Grid, List } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CardView from "./CardView";
import ListView from "./ListView";

export const EventsByOrganizer = () => {
  const router = useRouter();
  const session = useSession();
  const user = session.data?.user;

  const { isOpen, openModal, closeModal } = useModal();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  type Event = {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    status: string;
    attendees: number;
    image: string;
  };

  const events: Event[] = [
    {
      id: 1,
      name: "Annual Tech Conference 2024",
      startDate: new Date(2024, 5, 15),
      endDate: new Date(2024, 5, 17),
      status: "active",
      attendees: 156,
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3",
    },
    {
      id: 2,
      name: "Product Launch Webinar",
      startDate: new Date(2024, 6, 1),
      endDate: new Date(2024, 6, 1),
      status: "draft",
      attendees: 89,
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3",
    },
    {
      id: 3,
      name: "Leadership Summit",
      startDate: new Date(2024, 4, 20),
      endDate: new Date(2024, 4, 22),
      status: "completed",
      attendees: 234,
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3",
    },
    {
      id: 4,
      name: "Leadership Summit",
      startDate: new Date(2024, 4, 20),
      endDate: new Date(2024, 4, 22),
      status: "completed",
      attendees: 234,
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3",
    },
    {
      id: 5,
      name: "Leadership Summit",
      startDate: new Date(2024, 4, 20),
      endDate: new Date(2024, 4, 22),
      status: "completed",
      attendees: 234,
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-[#004DE8] border border-[#004DE8]";
      case "draft":
        return "text-[#FF7F00] border border-[#FF7F00]";
      case "completed":
      default:
        return "text-gray-500 border border-gray-300";
    }
  };

  const handleDelete = (id: number) => {
    setSelectedEventId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log(`Deleting event ${selectedEventId}`);
    setShowDeleteModal(false);
    setSelectedEventId(null);
  };

  // const ListView = () => (
  //   <div className="overflow-x-auto">
  //     <table className="min-w-full divide-y divide-gray-200">
  //       <thead className="bg-gray-50">
  //         <tr>
  //           {[
  //             "Event Name",
  //             "Start Date",
  //             "End Date",
  //             "Status",
  //             "attendees",
  //             "Actions",
  //           ].map((header) => (
  //             <th
  //               key={header}
  //               className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
  //             >
  //               {header}
  //             </th>
  //           ))}
  //         </tr>
  //       </thead>
  //       <tbody className="divide-y divide-gray-200 bg-white">
  //         {events.map((event) => (
  //           <tr key={event.id} className="hover:bg-gray-50">
  //             <td className="px-4 py-4 whitespace-normal">
  //               <div className="flex items-start gap-3">
  //                 <img
  //                   src={event.image}
  //                   alt={event.name}
  //                   className="h-10 w-10 rounded-full object-cover"
  //                   onError={(e) => {
  //                     (e.target as HTMLImageElement).src =
  //                       "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3";
  //                   }}
  //                 />
  //                 <span className="max-w-xs text-sm font-medium break-words text-gray-900">
  //                   {event.name}
  //                 </span>
  //               </div>
  //             </td>
  //             <td className="px-4 py-4 text-sm text-gray-700">
  //               {format(event.startDate, "dd/MM/yyyy")}
  //             </td>
  //             <td className="px-4 py-4 text-sm text-gray-700">
  //               {format(event.endDate, "dd/MM/yyyy")}
  //             </td>
  //             <td className="px-4 py-4">
  //               <span
  //                 className={cn(
  //                   "rounded-full px-3 py-1 text-xs font-medium",
  //                   getStatusColor(event.status),
  //                 )}
  //               >
  //                 {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
  //               </span>
  //             </td>
  //             <td className="px-4 py-4 text-sm text-gray-700">
  //               <div className="flex items-center gap-2">
  //                 <User className="h-4 w-4" />
  //                 {event.attendees}
  //               </div>
  //             </td>
  //             <td className="px-4 py-4">
  //               <div className="flex space-x-2">
  //                 <Button variant="outline" size="icon">
  //                   <Edit className="text-[#004DE8]" />
  //                 </Button>
  //                 <Button variant="outline" size="icon">
  //                   <Eye className="text-[#FF7F00]" />
  //                 </Button>
  //                 <Button
  //                   variant="outline"
  //                   size="icon"
  //                   onClick={() => handleDelete(event.id)}
  //                 >
  //                   <Trash className="text-red-600" />
  //                 </Button>
  //               </div>
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/dashboard/my-event/create">
            <Button>Create Event</Button>
          </Link>
          <div className="flex space-x-2 rounded-lg bg-gray-100 p-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={cn({ "bg-white shadow-sm": viewMode === "grid" })}
            >
              <Grid />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("list")}
              className={cn({ "bg-white shadow-sm": viewMode === "list" })}
            >
              <List />
            </Button>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">No events found</p>
          </div>
        ) : viewMode === "grid" ? (
          <CardView />
        ) : (
          <ListView />
        )}

        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent>
            <DialogTitle>Confirm Delete</DialogTitle>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this event? This action cannot be
              undone.
            </p>
            <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
