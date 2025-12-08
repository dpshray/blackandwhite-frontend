import axiosInstance from "@/lib/axios";

export const getDailySales = async () => {
  const res = await axiosInstance.get("/admin/line-chart");
  return res.data.data 
}

export const getNotifications = async (page: number, per_page: number) => {
  const res = await axiosInstance.get(`/admin/notifications?page=${page}&per_page=${per_page}`);
  // console.log("rr",res.data.data)
  return res.data.data 
}

export const notificatonStatus = async (notification_id: number) => {
  const res = await axiosInstance.patch(`/admin/notifications/${notification_id}`);
  return res.data.data 
}

export const setDeliveryCharge = async (value: string) => {
  const res = await axiosInstance.post(`/admin/delivery-charge`, value);
  return res.data.data 
}

export const getDeliveryCharge = async () => {
  const res = await axiosInstance.get(`/admin/get-delivery-charge`);
  return res.data.data 
}