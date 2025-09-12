"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUsers } from "@/hooks/useUser";
import { useAddress } from "@/hooks/useAddress";
import AddressFormModal from "@/components/profile/AddressFormModal";
import { Skeleton } from "@/components/ui/skeleton";

interface Order {
  id: number;
  total_amount: number;
  status: string;
}

export default function ProfilePage() {
  const { useUserProfile } = useUsers();
  const { data: user, isLoading: userLoading } = useUserProfile();

  const { useAddressInfo } = useAddress();
  const { data: address, isLoading: addressLoading } = useAddressInfo();

  // Dummy order data
  const orders: Order[] = [
    { id: 30, total_amount: 170, status: "Pending" },
    { id: 29, total_amount: 170, status: "Pending" },
    { id: 28, total_amount: 200, status: "Pending" },
    { id: 26, total_amount: 250, status: "Pending" },
    { id: 25, total_amount: 237, status: "Pending" },
    { id: 24, total_amount: 418, status: "Pending" },
    { id: 23, total_amount: 1738, status: "Pending" },
    { id: 22, total_amount: 493, status: "Cancelled" },
    { id: 21, total_amount: 493, status: "Pending" },
    { id: 20, total_amount: 493, status: "Pending" },
  ];

  // Pagination
  const [page, setPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.ceil(orders.length / perPage);
  const paginatedOrders = orders.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Profile Section (Left) */}
      <div className="flex flex-col gap-6">
        {userLoading ? (
          <div>
            <Skeleton className="w-full h-56" />
          </div>
        ) : 
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center lg:items-start h-fit">
            <div className="w-full flex items-start justify-between gap-4 mb-6">
                <Avatar className="w-32 h-32 border-2 border-gray-200">
                    <AvatarImage src="/placeholder.png" alt="Profile" />
                    <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                    Update Profile
                </Button>
                </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">{user?.name}</h2>
              <p className="text-gray-600">📞 {user?.phone_number}</p>
              <p className="text-gray-600">👤 {user?.gender}</p>
              <p className="text-gray-600">🎂 {user?.date_of_birth}</p>
            </div>
          </div>
        }

        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center lg:items-start h-fit w-full">
          <h3 className="text-lg font-semibold mb-3">Billing Address</h3>
          {addressLoading ? (
            <Skeleton className="w-full h-56" />
          ) : address && address.length > 0 ? (
            address.map((item) => (
              <div
                key={item.id}
                className="p-4 mb-3 border rounded-lg bg-gray-50 text-sm w-full space-y-2"
              >
                <p className="font-medium">
                  {item.first_name} {item.last_name}
                </p>
                <p>{item.email}</p>
                <p>{item.contact_number}</p>
                <p>
                  {item.address}, {item.city}, {item.state}
                </p>
                <AddressFormModal
                  mode="update"
                  defaultValues={item}
                />
              </div>
            ))
          ) : (
            <AddressFormModal mode="add" />
          )}
        </div>
      </div>

      {/* Order History (Right, spans 2 columns) */}
      <div className="bg-white rounded-2xl shadow-md p-6 lg:col-span-2">
        <h3 className="text-xl font-semibold mb-4">Order History</h3>

        <div className="space-y-3">
          {paginatedOrders.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-gray-500">Status: {order.status}</p>
              </div>
              <p className="font-semibold">Rs. {order.total_amount}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 text-sm bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <p className="text-sm">
            Page {page} of {totalPages}
          </p>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 text-sm bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
