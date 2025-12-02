import PolicyPage from "@/components/layout/PolicyPage";
import { FileText, Eye, Globe, Users, Lock, Check } from "lucide-react";

export default function PrivacyPolicy() {
    const sections = [
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Information We Collect",
            content: [
                "Personal details (name, email, phone number, shipping address)",
                "Payment information (processed securely through trusted gateways; we do not store card details)",
                "Browsing behavior (pages visited, time spent, device type, IP address)",
            ],
        },
        {
            icon: <Eye className="w-6 h-6" />,
            title: "How We Use Your Information",
            content: [
                "Process and deliver orders",
                "Provide customer support",
                "Improve our website and services",
                "Send order updates, promotions, and offers (only with your consent)",
            ],
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Cookies",
            description: "Our website uses cookies to enhance your shopping experience, analyze traffic, and personalize content.",
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Sharing Your Information",
            description: "We do not sell or trade your personal data. We may share limited information with:",
            content: ["Delivery partners", "Payment processors", "Analytics providers (e.g., Google Analytics)"],
        },
        {
            icon: <Lock className="w-6 h-6" />,
            title: "Data Protection",
            description: "We use encryption, secure servers, and third-party protections to keep your information safe.",
        },
        {
            icon: <Check className="w-6 h-6" />,
            title: "Your Rights",
            content: ["Request access to your data", "Update or delete your information", "Unsubscribe from marketing at any time"],
        },
    ];

    return (
        <PolicyPage
            title="Privacy Policy"
            lastUpdated="1st December 2025"
            intro="At Black & White Trend, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit or make a purchase from our website."
            sections={sections}
            contactEmail
        />
    );
}
