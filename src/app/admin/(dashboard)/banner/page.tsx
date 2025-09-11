import BannerTable from "@/components/admin/banner/BannerTable";

export default function AdminBanner() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Banner Page</h1>
            {/* <DashboardTotal /> */}
            <BannerTable />
        </div>
    );
}