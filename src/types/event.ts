import { Category } from "./category";
import { Organizer } from "./organizer";
import { Ticket } from "./ticket";
import { Voucher } from "./voucher";

export interface Event {
  id: number;
  category: CategoryName;
  organizerId: number;
  organizer: Organizer;
  slug: string;
  name: string;
  desc: string;
  startDate: string;
  endDate: string;
  location: Location;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  vouchers: Voucher[];
  tickets: Ticket[];
  totalTransactions: number;
}

export enum CategoryName {
  MUSIC = "MUSIC",
  EDUCATION = "EDUCATION",
  CULTURE = "CULTURE",
  BUSINESS = "BUSINESS",
  FASHION = "FASHION",
  SPORT = "SPORT",
}

export enum Location {
  JAKARTA = "JAKARTA",
  BANDUNG = "BANDUNG",
  SURABAYA = "SURABAYA",
  YOGYAKARTA = "YOGYAKARTA",
  SEMARANG = "SEMARANG",
}
