import OrderTable from "@/components/admin/order/OrderTable";

export default function AdminOrder() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Order Page</h1>
            {/* <DashboardTotal /> */}
            <OrderTable />
        </div>
    );
}