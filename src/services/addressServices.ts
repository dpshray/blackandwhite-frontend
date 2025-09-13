import axiosInstance from "@/lib/axios";

export interface AddressInfo {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  state: string;
  city: string;
  address: string;
  contact_number: string;
}

export const addressService = {
  getAddressInfo: async (): Promise<AddressInfo[]> => {
    const { data } = await axiosInstance.get("/view-address");
    return data.data;
  },

  addAddressInfo: async (payload: Omit<AddressInfo, "id">): Promise<AddressInfo> => {
    const { data } = await axiosInstance.post("/add-address", payload);
    return data.data;
  },

  updateAddressInfo: async (
    id: number,
    payload: Omit<AddressInfo, "id">
  ): Promise<AddressInfo> => {
    const { data } = await axiosInstance.post(`/edit-address/${id}`, payload);
    return data.data;
  },
};
