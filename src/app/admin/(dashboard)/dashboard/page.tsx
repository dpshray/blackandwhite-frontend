import { SalesLineChart } from "@/components/admin/dashboard/SalesLineChart";
import Stats from "@/components/admin/dashboard/stats";

export default function Dashboard() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <Stats />
            <div className="mt-4">
                <SalesLineChart />
            </div>
        </div>
    );
}