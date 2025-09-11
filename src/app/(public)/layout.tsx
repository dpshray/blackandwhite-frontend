import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { getCategories } from "@/lib/server-api";

export const dynamic = "force-dynamic";

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
        <main className="flex-grow">{children}</main>
        <Footer categories={categories} />
    </div>
  );
}