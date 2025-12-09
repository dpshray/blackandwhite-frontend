import OrderTable from "@/components/admin/order/OrderTable";
import WhatsAppOrderTable from "@/components/admin/order/WhatsAppOrderTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminOrder() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Order Page</h1>
            <Tabs defaultValue="all">
                <TabsList className="w-full">
                    <TabsTrigger value="all">All Orders</TabsTrigger>
                    <TabsTrigger value="whatsapp">WhatsApp Orders</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    <OrderTable />
                </TabsContent>

                <TabsContent value="whatsapp">
                    <WhatsAppOrderTable />
                </TabsContent>
            </Tabs>
        </div>
    );
}