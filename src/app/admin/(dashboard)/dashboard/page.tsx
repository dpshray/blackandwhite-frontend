import Stats from "@/components/admin/stats";

export default function Dashboard() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <Stats />
        </div>
    );
}