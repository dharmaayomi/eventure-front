import { Organizer } from "./organizer";
import { PointDetail } from "./pointDetail";
import { ReferralCoupon } from "./referralCoupon";
import { Role } from "./role";
import { Transaction } from "./transaction";

export interface User {
  id: number;
  referralNumber: string;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  role: Role;
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  organizer?: Organizer;
  organizerId?: string;
  organizerName?: string;
  organizerProfilePic?: string;
  organizerAboutUs?: string;
  organizerCreatedAt?: Date;
  referralCoupon: ReferralCoupon[];
  pointDetails: PointDetail[];
  transactions: Transaction[];
}
