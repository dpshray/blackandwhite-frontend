import axiosInstance from "@/lib/axios";

export const getDailySales = async () => {
  const res = await axiosInstance.get("/admin/line-chart");
  return res.data.data 
}
