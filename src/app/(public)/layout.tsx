import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import WhatsAppChatWidget from "@/components/layout/WhatsAppChatWidget";
import { getCategories } from "@/lib/server-api";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categoriesResponse = await getCategories()
  const categories = categoriesResponse.data.data.slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col">
        <Header categories={categories} />
        <main className="grow">{children}</main>
        <WhatsAppChatWidget />
        <Footer categories={categories} />
    </div>
  );
}