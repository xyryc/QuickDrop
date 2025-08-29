import { ComponentType } from "react";

export type { ISendOtp, IVerifyOtp, ILogin } from "./auth.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export type TRole = "Admin" | "Sender" | "Receiver";

export type Parcel = {
  _id: string;
  id: string;
  trackingId: string;
  currentStatus: string;
  isBlocked: boolean;
  parcelType: string;
  weight: number;
  deliveryAddress: string;
  receiver: {
    name: string;
    email: string;
    phone: string;
    address: string;
    userId: string;
  };
  sender: {
    name: string;
    email: string;
  };
};

export type UpdateStatusPayload = {
  parcelId: string;
  status: string; // Use the correct enum type if possible
  location: string;
  note?: string;
};
export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}