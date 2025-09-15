"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUsers } from "@/hooks/useUser";
import AddressFormModal from "@/components/profile/AddressFormModal";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileFormModal from "@/components/profile/ProfileFormModal";
import { Badge } from "@/components/ui/badge";
import { useAddressInfo } from "@/hooks/useAddress";
import { useOrders } from "@/hooks/useOrder";
import Pagination from "@/components/Pagination";
import { FaBirthdayCake, FaPhoneAlt, FaRegFrown, FaUser } from "react-icons/fa";

export default function ProfilePage() {
  const [page, setPage] = useState(1);
  const { useUserProfile } = useUsers();
  const { data: user, isLoading: userLoading } = useUserProfile();
  const { data: address, isLoading: addressLoading } = useAddressInfo();
  const { data: orders, isLoading: ordersLoading } = useOrders(page, 9);
  const totalPages = Math.ceil(orders?.data.meta.total ?? 1);
  const paginatedOrders = orders?.data.orders || [];

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Profile Section (Left) */}
      <div className="flex flex-col gap-6">
        {userLoading ? (
          <div>
            <Skeleton className="w-full h-56" />
          </div>
        ) : (
          <div className="bg-white border rounded-2xl shadow-md p-6 flex flex-col items-start h-fit">
            <div className="w-full flex items-start justify-between gap-4 mb-6">
              <Avatar className="w-32 h-32 border-2 border-gray-200">
                <AvatarImage
                  src={user?.profile_image || "/placeholder.png"}
                  alt="Profile"
                />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>

              {/* Profile*/}
              <ProfileFormModal defaultValues={user} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">
                {user?.name || <Badge variant="secondary">Not Set</Badge>}
              </h2>
              <p className="text-gray-600 flex items-center gap-4">
                <FaPhoneAlt className="fill-red-500" />
                {user?.phone_number || (
                  <Badge variant="secondary">Not Set</Badge>
                )}
              </p>
              <p className="text-gray-600 flex items-center gap-4">
                <FaUser className="fill-blue-500" />{" "}
                {user?.gender || <Badge variant="secondary">Not Set</Badge>}
              </p>
              <p className="text-gray-600 flex items-center gap-4">
                <FaBirthdayCake className="fill-yellow-500" />{" "}
                {user?.date_of_birth || (
                  <Badge variant="secondary">Not Set</Badge>
                )}
              </p>
            </div>
          </div>
        )}

        <div className="bg-white border rounded-2xl shadow-md p-6 flex flex-col items-center lg:items-start h-fit w-full">
          <h3 className="text-lg font-semibold mb-3">Billing Address</h3>
          {addressLoading ? (
            <Skeleton className="w-full h-56" />
          ) : address && address.length > 0 ? (
            address.map((item) => (
              <div
                key={item.id}
                className="p-4 mb-3 border rounded-lg bg-gray-50 text-sm w-full"
              >
                <div className="space-y-1">
                  <p className="text-base font-semibold">
                    {item.first_name} {item.last_name}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Email:</span> {item.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Phone:</span>{" "}
                    {item.contact_number}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Address:</span>{" "}
                    {item.address}, {item.city}, {item.state}
                  </p>
                </div>

                <div className="mt-4">
                  <AddressFormModal mode="update" defaultValues={item} />
                </div>
              </div>
            ))
          ) : (
            <div className="mt-4">
              <AddressFormModal mode="add" />
            </div>
          )}
        </div>
      </div>

      {/* Order History */}
      <div className="h-fit bg-white border rounded-2xl shadow-md p-6 lg:col-span-2">
        <h3 className="text-xl font-semibold mb-4">Order History</h3>

        <div className="space-y-3 min-h-[200px] flex flex-col items-center justify-center">
          {ordersLoading ? (
            // Skeletons
            Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-4 border rounded-lg animate-pulse w-full"
              >
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))
          ) : paginatedOrders && paginatedOrders.length > 0 ? (
            // Actual order data
            paginatedOrders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition w-full"
              >
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    Status: {order.status}
                  </p>
                </div>
                <p className="font-semibold">Rs. {order.total_amount}</p>
              </div>
            ))
          ) : (
            // Empty state
            <div className="flex flex-col items-center gap-2 text-center text-gray-500">
              <FaRegFrown className="text-4xl" />
              <h4 className="text-lg font-semibold">No Orders Yet</h4>
              <p className="text-sm text-gray-400">
                You haven&apos;t placed any orders yet. Start shopping and your
                orders will appear here.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!ordersLoading && paginatedOrders && paginatedOrders.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            goToPage={setPage}
          />
        )}
      </div>
    </div>
  );
}
