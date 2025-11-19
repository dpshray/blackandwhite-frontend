import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Package, Tag, Palette } from "lucide-react";
import { getProductBySlug } from "@/lib/server-api";

export default async function ProductPage({ params }: any) {
  const products = await getProductBySlug(params.slug);
  const product = products.data;

  if (!product) return notFound();

  const p = product; // shorthand

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* IMAGE GALLERY */}
        <div className="space-y-4 sm:space-y-8">
            <div className="">
                <Image
                    src={p.image?.[0]}
                    alt={p.title}
                    width={400}
                    height={400}
                    className=" object-cover w-full border shadow"
                />
            </div>

          <div className="grid grid-cols-4 gap-3">
            {p.image?.map((img: any, idx: number) => (
              <Image
                key={idx}
                src={img}
                alt="thumbnail"
                width={120}
                height={120}
                className="rounded-lg object-cover border"
              />
            ))}
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="space-y-6">

          <h1 className="text-3xl font-bold tracking-tight">{p.title}</h1>

          <p className="text-gray-600">{p.description}</p>

          {/* PRICE SECTION */}
          <div className="space-y-2">
            <div className="text-3xl font-semibold">
              Rs. {p.discount_price ?? p.price}
            </div>

            {p.discount_price && (
              <div className="flex items-center gap-2 text-sm text-red-500">
                <span className="line-through text-gray-500">Rs. {p.price}</span>
                <Badge variant="destructive">
                  -{p.discount_percent}% OFF
                </Badge>
              </div>
            )}
          </div>

          <Separator />

          {/* CATEGORIES */}
          <div className="flex flex-wrap gap-2">
            {p.categories?.map((cat) => (
              <Badge key={cat.categories_id} className="text-sm">
                {cat.categories_title}
              </Badge>
            ))}
          </div>

          <Separator />

          {/* ADDITIONAL META */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Tag className="w-4 h-4" /> Pattern: {p.pattern}
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Package className="w-4 h-4" /> Fabric: {p.fabric}
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Palette className="w-4 h-4" /> Material: {p.material}
            </div>
          </div>

        </div>
      </div>

      {/* VARIANTS TABLE */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Variants</h2>

          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Size</th>
                  <th className="p-2 border">Color</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Discount Price</th>
                  <th className="p-2 border">Discount (%)</th>
                  <th className="p-2 border">Stock</th>
                  <th className="p-2 border">Images</th>
                </tr>
              </thead>

              <tbody>
                {p.variants?.map((v) => (
                  <tr key={v.id} className="text-center">
                    <td className="p-2 border">{v.size}</td>
                    <td className="p-2 border">{v.color}</td>
                    <td className="p-2 border">{v.price}</td>
                    <td className="p-2 border">{v.discount_price}</td>
                    <td className="p-2 border">{v.discount_percent}</td>
                    <td className="p-2 border">{v.stock}</td>
                    <td className="p-2 border">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {v.images?.map((img, idx) => (
                          <Image
                            key={idx}
                            src={img}
                            alt="variant"
                            width={40}
                            height={40}
                            className="rounded border object-cover"
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
