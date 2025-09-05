import ProductTable from "./ProductTable";


export default function AdminProduct() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Product Page</h1>
            {/* <DashboardTotal /> */}
            <ProductTable />
        </div>
    );
}