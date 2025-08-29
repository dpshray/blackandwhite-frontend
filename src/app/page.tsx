import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ProductSection from "@/components/product/product-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
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
      
      <Footer />
    </div>
  )
}
