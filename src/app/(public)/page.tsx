import ProductSection from "@/components/product/product-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import BannerSlider from "@/components/layout/BannerSlider";
import { getBanners, getProducts } from "@/lib/server-api";

interface ProductsPageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function Home({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const currentPage = Number.parseInt(params.page || "1", 9)

  const bannerResponse = await getBanners()
  const banners = bannerResponse.data.data || []

  // Fetch new arrivals
  const newArrivalsResponse = await getProducts(currentPage, 4, undefined, undefined, undefined, "new")
  const newArrivals = newArrivalsResponse.data.data

  // Fetch best sellers
  const bestSellersResponse = await getProducts(currentPage, 4, undefined, undefined, undefined, "best_seller")
  const bestSellers = bestSellersResponse.data.data

  // Fetch limited edition 
  const limitedEditionResponse = await getProducts(currentPage, 4, undefined, undefined, undefined, "limited")
  const limitedEdition = limitedEditionResponse.data.data

  return (
    <div className="min-h-screen">
      <BannerSlider banners={banners} />

      <div className="space-y-12 my-12">
        <ProductSection title="NEW ARRIVALS" products={newArrivals} link="/shop?sort=new"/>
        <ProductSection title="BEST SELLERS" products={bestSellers} link="/shop?sort=best_seller"/>
        <ProductSection title="LIMITED EDITION" products={limitedEdition} link="/shop?sort=limited"/>
      </div>

      {/* Newsletter Section */}
      <section className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-12">
          <h2 className="text-2xl font-medium">SIGN UP FOR UPDATES</h2>
          <div className="flex w-full md:w-auto bg-white text-black p-1">
            <Input
              placeholder="Your Email Address Here"
              className=" placeholder:text-gray-500 rounded-none border-0 min-w-[300px]"
            />
            <Button className="rounded-none px-4" aria-label="Subscribe">
              <ArrowRight />
            </Button>
          </div>
        </div>
      </section>

      {/* Everything You Need Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl md:text-6xl font-medium text-black mb-8 leading-tight">
                Everything You Need, All in One Place
              </h2>
              {/* Image Size: 600x600px, Aspect Ratio: 1:1 */}
              <div className="aspect-square relative rounded-sm overflow-hidden">
                <Image
                  src="/banner1.png"
                  alt="Man in black t-shirt using phone"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="flex flex-col justify-start space-y-6">
              {/* Image Size: 600x600px, Aspect Ratio: 1:1 */}
              <div className="aspect-square relative rounded-sm overflow-hidden">
                <Image
                  src="/banner1.png"
                  alt="Man in Broken Saints sweatshirt"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col space-y-6 items-center justify-center">
                <p className="text-lg leading-relaxed text-justify font-medium">
                  We&apos;re committed to making your shopping experience effortless and enjoyable. With fast delivery,
                  easy returns, secure payments, and friendly support, everything is designed to give you comfort,
                  confidence, and convenience from the moment you land on our site to the time your order arrives at your
                  door.
                </p>

                <Button className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-none flex items-center gap-2 w-fit">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
