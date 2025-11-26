import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Package, Tag, Palette, Ruler } from "lucide-react";
import { getProductBySlug } from "@/lib/server-api";
import Link from "next/link";

export default async function ProductPage({ params }: { params: Promise<{slug: string}> }) {
  const { slug } = await params;
  const products = await getProductBySlug(slug);
  const product = products.data;

  if (!product) return notFound();

  const p = product;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* IMAGE GALLERY */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-xl overflow-hidden border shadow-lg bg-gray-50">
            <Image
              src={p.image?.[0]}
              alt={p.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {p.image?.map((img: any, idx: number) => (
              <div
                key={idx}
                className="relative aspect-square rounded-lg overflow-hidden border hover:border-gray-400 transition-colors cursor-pointer bg-gray-50"
              >
                <Image
                  src={img}
                  alt={`Product view ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              {p.title}
            </h1>

            <p className="text-gray-600 leading-relaxed">{p.description}</p>
          </div>

          {/* PRICE SECTION */}
          <div className="space-y-2 py-4">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">
                Rs. {p.discount_price ?? p.price}
              </span>
              {p.discount_price && (
                <span className="text-xl text-gray-400 line-through">
                  Rs. {p.price}
                </span>
              )}
            </div>

            {p.discount_price && (
              <Badge variant="destructive" className="text-sm px-3 py-1">
                Save {p.discount_percent}% OFF
              </Badge>
            )}
          </div>

          <Separator />

          {/* CATEGORIES */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {p.categories?.map((cat) => (
                <Badge
                  key={cat.categories_id}
                  variant="secondary"
                  className="text-sm px-3 py-1"
                >
                  {cat.categories_title}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* PRODUCT SPECIFICATIONS */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Tag className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="text-xs text-gray-500">Pattern</div>
                  <div className="font-medium text-gray-900">{p.pattern}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Package className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="text-xs text-gray-500">Fabric</div>
                  <div className="font-medium text-gray-900">{p.fabric}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Palette className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="text-xs text-gray-500">Material</div>
                  <div className="font-medium text-gray-900">{p.material}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SIZE GUIDE */}
      {p.size_detail && (
        <Card className="mt-10 w-fit">
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <Ruler className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Size Guide Image</h2>
            </div>
            <Link href={p.size_detail} target="_blank">
              <div className="relative aspect-4/5 max-w-sm rounded-lg overflow-hidden border shadow-sm bg-gray-50">
                <Image
                  src={p.size_detail}
                  alt="Size guide"
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* VARIANTS TABLE */}
      <Card className="mt-10">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-6">Available Variants</h2>

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-3 text-left font-semibold text-gray-700">
                    Size
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-700">
                    Color
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-700">
                    Discount Price
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-700">
                    Discount
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-700">
                    Stock
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-700">
                    Images
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {p.variants?.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-medium">{v.size}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-2">
                        {v.color}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600">Rs. {v.price}</td>
                    <td className="p-3 font-semibold">
                      {v.discount_price ? `Rs. ${v.discount_price}` : "—"}
                    </td>
                    <td className="p-3">
                      {v.discount_percent ? (
                        <Badge variant="outline" className="text-xs">
                          -{v.discount_percent}%
                        </Badge>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          v.stock.toString().length > 10
                            ? "bg-green-100 text-green-700"
                            : v.stock.toString().length > 0
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {v.stock.toString().length > 0
                          ? `${v.stock} in stock`
                          : "Out of stock"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        {v.images?.map((img, idx) => (
                          <div
                            key={idx}
                            className="relative w-12 h-12 rounded border overflow-hidden bg-gray-50"
                          >
                            <Image
                              src={img}
                              alt={`Variant ${idx + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
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
