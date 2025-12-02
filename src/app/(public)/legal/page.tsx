import PolicyPage from "@/components/layout/PolicyPage";

export default function Legal() {
    const sections = [
        {
            title: "General Legal Notice",
            description:
                "Black & White Trend (“we”, “us”, “our”) operates this website and provides products solely for personal use under applicable laws.",
        },
        {
            title: "Limitations",
            description: "We are not responsible for:",
            content: [
                "Third-party service interruptions",
                "Technical issues beyond our control",
                "Typographical errors, system bugs, or inaccurate product information caused by technical failures",
            ],
        },
        {
            title: "Compliance",
            description: "Users agree to comply with all local laws when accessing or purchasing from this site.",
        },
        {
            title: "Intellectual Property Rights",
            description: "All site content, including:",
            content: [
                "Logos",
                "Product images",
                "Text",
                "Graphics",
                "Website layout and design",
            ],
            description2: "is protected under copyright and trademark laws."
        },
        {
            title: "Liability",
            description: "To the fullest extent permitted by law:",
            content: [
                "We disclaim warranties of any kind",
                "We are not liable for indirect, incidental, or consequential damages",
            ],
        },
        {
            title: "Governing Law",
            description: "These legal terms are governed by the laws of your jurisdiction (Nepal or whichever market you're targeting).",
        },
    ];

    return (
        <PolicyPage
            title="Legal Disclaimer / Legal Information"
            lastUpdated="1st December 2025"
            sections={sections}
            contactEmail={false}
        />
    );
}
