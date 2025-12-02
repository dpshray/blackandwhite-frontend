import { Mail } from 'lucide-react';
import Link from 'next/link';

interface PolicySection {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    description2?: string;
    content?: string[];
}

interface PolicyPageProps {
    title: string;
    lastUpdated: string;
    intro?: string;
    sections: PolicySection[];
    contactEmail?: boolean;
}

export default function PolicyPage({
    title,
    lastUpdated,
    intro,
    sections,
    contactEmail = false,
}: PolicyPageProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-lg text-gray-600">Last Updated: {lastUpdated}</p>
                    {intro && <p className="mt-4 text-gray-700 leading-relaxed">{intro}</p>}
                </div>

                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                {section.icon && (
                                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900">
                                        {section.icon}
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{section.title}</h3>
                                    {section.description && <p className="text-gray-700 mb-3 leading-relaxed">{section.description}</p>}
                                    {section.content && (
                                        <ul className="space-y-2">
                                            {section.content.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-gray-700">
                                                    <span className="text-gray-400 mt-1">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {section.description2 && <p className="text-gray-700 mt-3 leading-relaxed">{section.description2}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {contactEmail && (
                    <div className="mt-12 bg-gray-900 rounded-lg p-8 text-white">
                        <div className="flex items-start gap-4">
                            <Mail className="w-6 h-6 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
                                <p className="text-gray-300 mb-3">For questions, please reach out:</p>
                                <Link href={`mailto:${process.env.NEXT_PUBLIC_MAIL}`} className="text-white font-medium hover:underline">
                                    {process.env.NEXT_PUBLIC_MAIL}
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>By using our website, you agree to the terms outlined in this policy.</p>
                </div>
            </main>

            <footer className="bg-white border-t border-gray-200 mt-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-center text-gray-600 text-sm">© 2025 Black & White Trend. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
