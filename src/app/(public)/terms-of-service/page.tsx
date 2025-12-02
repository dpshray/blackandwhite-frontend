import PolicyPage from "@/components/layout/PolicyPage";

export default function TermsOfService() {
    const sections = [
        {
            title: "Use of Website",
            description: "You agree:",
            content: [
                "Not to misuse the website",
                "Not to engage in fraudulent activities",
                "Not to copy, resell, or exploit any part of the site without permission",
            ],
        },
        {
            title: "Products & Pricing",
            content: [
                "All product images, descriptions, and prices are displayed as accurately as possible.", 
                "Prices may change without notice.",
                "Availability may vary depending on stock."
            ],
        },
        {
            title: "Orders",
            description: "By placing an order, you confirm:",
            content: ["Your information is accurate", "You are authorized to use the chosen payment method"],
            description2: "We reserve the right to cancel or refuse any order."
        },
        { title: "Shipping & Delivery", content: ["Delivery timelines are estimates. Delays may occur due to logistics or external factors."] },
        { title: "Returns & Refunds", content: ["Our return policy is outlined on our Sales & Refunds page."] },
        {
            title: "Intellectual Property",
            content: ["All content, logos, images, and designs belong to Black & White Trend and cannot be used without written permission."],
        },
        {
            title: "Limitation of Liability",
            description: "We are not responsible for:",
            content: ["Delays, losses, or damages caused by third-party carriers", "Misuse or unauthorised access of your account"],
        },
        { title: "Changes to Terms", content: ["We may update these Terms at any time."] },
    ];

    return (
        <PolicyPage
            title="Terms of Service"
            intro="By accessing or using Black & White Trend, you agree to the following Terms of Service. Please read them carefully."
            lastUpdated="1st December 2025"
            sections={sections}
        />
    );
}
