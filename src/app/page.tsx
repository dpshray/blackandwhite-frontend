import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ProductSection from "@/components/product/product-section";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const products = [
    {
      image: "/banner1.png",
      title: "Minimalistic Black Hoodie in Stock",
      originalPrice: 2800,
      salePrice: 2500,
      discount: 10,
    },
    {
      image: "/banner1.png",
      title: "Minimalistic Black Hoodie in Stock",
      originalPrice: 2800,
      salePrice: 2500,
      discount: 10,
    },
    {
      image: "/banner1.png",
      title: "Minimalistic Black Hoodie in Stock",
      originalPrice: 2800,
      salePrice: 2500,
      discount: 10,
    },
    {
      image: "/banner1.png",
      title: "Minimalistic Black Hoodie in Stock",
      originalPrice: 2800,
      salePrice: 2500,
      discount: 10,
    },
  ]
  return (
    <div className="min-h-screen">
      <Header />
      {/* Size: 1440x600px, Aspect Ratio: 2.4:1 */}
      <section className="relative w-full aspect-[2.4/1] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/banner.png"
            alt="Urban Warmth Banner - Models in black hoodies"
            fill
            className="object-cover"
            priority
          />  
        </div>

        {/* Center Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center space-y-4 md:space-y-6">
            <h1 className="text-black leading-none">
              <span className="font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl block">
                URBAN
              </span>
              <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-7xl">WARMTH</span>
            </h1>
            <Button className="bg-black text-white px-4 py-2 text-sm sm:px-6 sm:py-2 sm:text-base md:px-6 md:py-6 md:text-3xl font-medium hover:bg-gray-800 rounded-none">
              SHOP NOW
            </Button>
          </div>
        </div>
      </section>

      <div className="space-y-12 my-12">
        <ProductSection title="NEW ARRIVALS" products={products} />
        <ProductSection title="BEST SELLERS" products={products} />
        <ProductSection title="LIMITED EDITION" products={products} />
      </div>

      <Footer />
    </div>
  )
}
