import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "../ui/separator"
import Link from "next/link"
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa"
import { ArrowRight } from "lucide-react"

const Product = [
  { title: "Hoodies", link: "#" },
  { title: "Pants", link: "#" },
  { title: "Half-pants", link: "#" },
  { title: "T-shirts", link: "#" },
  { title: "Shirts", link: "#" },
]

const company = [
  { title: "Home", link: "#" },
  { title: "FAQs", link: "#" },
  { title: "Contact Us", link: "#" },
]

const follow = [
  { title: "Facebook", link: "#", icon: <FaFacebook /> },
  { title: "Instagram", link: "#", icon: <FaInstagram /> },
  { title: "WhatsApp", link: "#", icon: <FaWhatsapp /> },
]

const bottom = [
  { title: "Privacy Policy", link: "#" },
  { title: "Terms of Service", link: "#" },
  { title: "Sales and Refunds", link: "#" },
  { title: "Legal", link: "#" },
]

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="border border-white text-center  px-1 sm:px-3 py-2">
              <span className="text-xs sm:text-sm font-medium">BLACK AND WHITE TREND</span>
            </div>
            <p className="text-sm text-gray-300 mb-2">
              Your destination for timeless black & white men&apos;s fashion.
            </p>
            <Separator className="my-4" />
            <p className="text-xs text-gray-300">@Dworklabs Reserved Right</p>
          </div>

          {/* Follow Us */}
          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4">Follow us</h3>
            <div className="flex space-x-3">
              {follow.map((item) => (
                <Link
                  href={item.link}
                  key={item.title}
                  className="w-8 h-8 flex items-center justify-center text-xl hover:text-gray-300 transition-colors"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Call Us */}
          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4">Call Us</h3>
            <p className="text-sm">{process.env.NEXT_PUBLIC_PHONE}</p>
          </div>

          {/* Product */}
          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="flex flex-col space-y-2 text-sm">
              {Product.map((item) => (
                <Link href={item.link} key={item.title}>
                  {item.title}
                </Link>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="flex flex-col space-y-2 text-sm">
              {company.map((item) => (
                <Link key={item.title} href={item.link}>
                  {item.title}
                </Link>
              ))}
            </ul>
          </div>

          {/* Any Query */}
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-4">Any Query</h3>
            <div className="flex">
              <Input
                placeholder="Your query here..."
                className="bg-transparent border-white text-white placeholder:text-gray-400 rounded-none flex-1"
              />
              <Button className="bg-white text-black hover:bg-gray-200 rounded-none px-3" aria-label="Submit Query">
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-gray-500" />

        <div className="flex gap-8">
          {bottom.map((item) => (
            <Link key={item.title} href={item.link} className="text-xs hover:text-gray-300">
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
