import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/server-api";
import ProductDetails from "@/components/product/ProductDetails";
import { Home } from "lucide-react";

export default async function ProductPage(props: { params: Promise<{ slug: string; category: string }> }) {
  const { slug } = await props.params;

  const productRes = await getProductBySlug(slug);

  if (!productRes?.data) return notFound();

  const product = productRes.data;

  const breadcrumbs = [
    { label: <Home />, href: "/" },
    { label: "Shop", href: "/shop" },
    {
      label: product.categories?.[0]?.categories_title || "Category",
      href: `/shop/${product.categories?.[0]?.categories_slug}`,
    },
    { label: product.title, href: `/shop/${product.categories?.[0]?.categories_slug}/${product.slug}` },
  ];

  return <ProductDetails product={product} breadcrumbs={breadcrumbs} />;
}
