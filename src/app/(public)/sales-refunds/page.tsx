import PolicyPage from "@/components/layout/PolicyPage";
import { FileText, Truck, RefreshCcw, Ban, XCircle } from "lucide-react";

export default function SalesRefundsPolicy() {
    const sections = [
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Order Processing",
            description: "Orders are typically processed within 24–48 hours, excluding weekends and holidays.",
        },
        {
            icon: <Truck className="w-6 h-6" />,
            title: "Shipping",
            description: "We offer:",
            content: [
                "Fast domestic delivery",
                "International shipping (if applicable)",
            ],
            description2: "Shipping fees are shown at checkout.",
        },
        {
            icon: <RefreshCcw className="w-6 h-6" />,
            title: "Returns",
            description: "We accept returns under the following conditions:",
            content: [
                "Items must be returned within 7–14 days of delivery",
                "Items must be unused, unwashed, and with original tags",
                "Customers are responsible for return shipping unless the item was damaged or incorrect",
            ],
        },
        {
            icon: <RefreshCcw className="w-6 h-6" />,
            title: "Refunds",
            description: "Once we receive and inspect the returned item:",
            content: [
                "Approved refunds will be issued to the original payment method",
                "Refunds may take 5–7 business days to process",
            ],
        },
        {
            icon: <RefreshCcw className="w-6 h-6" />,
            title: "Exchanges",
            description:
                "We offer exchanges for size or product variations, depending on availability.",
        },
        {
            icon: <Ban className="w-6 h-6" />,
            title: "Non-Returnable Items",
            description: "The following items cannot be returned:",
            content: [
                "Items purchased on clearance",
                "Gift cards",
                "Underwear or intimate items",
            ],
        },
        {
            icon: <XCircle className="w-6 h-6" />,
            title: "Order Cancellation",
            description: "Orders can only be cancelled before they are shipped.",
        },
    ];

    return (
        <PolicyPage
            title="Sales & Refunds Policy"
            intro="At Black & White Trend, customer satisfaction is our priority. Please review our sales and refund policy below."
            lastUpdated="1st December 2025"
            sections={sections}
            contactEmail
        />
    );
}
