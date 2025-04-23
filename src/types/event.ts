import { Category } from "./category";
import { Organizer } from "./organizer";
import { Ticket } from "./ticket";
import { Voucher } from "./voucher";

export interface Event {
  id: number;
  categoryId: number;
  category: Category;
  organizerId: number;
  organizer: Organizer;
  slug: string;
  name: string;
  desc: string;
  startDate: Date;
  endDate: Date;
  location: Location;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  vouchers: Voucher[];
  tickets: Ticket[];
}
