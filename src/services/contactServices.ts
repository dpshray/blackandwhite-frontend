import axiosInstance from "@/lib/axios";
import { ContactInfo, ContactResponse } from "@/types/contactTypes";

export type CreateContactInfo = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
};

export const contactService = {
  // Get all contacts
  getContactInfo: async (page: number = 1, limit: number = 10): Promise<ContactResponse> => {
    const { data } = await axiosInstance.get("/view-contact", {
      params: {
        page,
        limit,
      },
    });
    return data;
  },

  // Add a contact
  addContactInfo: async (payload: CreateContactInfo): Promise<ContactInfo> => {
    const { data } = await axiosInstance.post("/store-contact", payload);
    return data.data;
  },

  // Delete a contact
  deleteContactInfo: async (id: number): Promise<{ message: string }> => {
    const { data } = await axiosInstance.delete(`/delete-contact/${id}`);
    return data;
  },
};
