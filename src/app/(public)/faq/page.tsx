import { ShopBreadCrumb } from "@/components/ShopBreadCrumb"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Home } from "lucide-react"
import Image from "next/image"

export default function FAQPage() {
  const faqs = [
    {
      id: "1",
      question: "What makes Black & White Trend unique?",
      answer:
        "We specialize exclusively in black and white men's wear, offering premium monochrome styles that are modern, versatile, and timeless.",
    },
    {
      id: "2",
      question: "How long does delivery take?",
      answer:
        "Orders are typically delivered within 2-5 business days, depending on your location. A tracking link will be sent once your order is shipped.",
    },
    {
      id: "3",
      question: "What is your return and exchange policy?",
      answer:
        "We accept returns and exchanges within 7-14 days of delivery, as long as the item is unused, unwashed, and in its original condition.",
    },
    {
      id: "4",
      question: "What payment methods do you accept?",
      answer: "We offer secure payment options including debit/credit cards, digital wallets, and (if applicable) Cash on Delivery.",
    },
    {
      id: "5",
      question: "How can I contact customer support?",
      answer:
        `You can reach us anytime at ${process.env.NEXT_PUBLIC_MAIL}. Our team is always ready to help with orders, returns, sizing, and more.`,
    },
  ]

  const breadcrumbs = [
    { label: <Home />, href: "/" },
    { label: "FAQs", href: "/faq" },
  ]

  return (
    <div className="min-h-screen bg-background container max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <ShopBreadCrumb items={breadcrumbs} />

        <div className="grid lg:grid-cols-2 gap-12 py-8 items-start">
            {/* Left Side - FAQ Content */}
            <div>
                <h1 className="text-xl lg:text-2xl font-medium text-foreground mb-8">FAQs</h1>

                <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq) => (
                        <AccordionItem
                            key={faq.id}
                            value={faq.id}
                        >
                            <AccordionTrigger className="font-medium text-foreground hover:no-underline">
                                <span className="mr-2 text-muted-foreground">{faq.id}.</span>   
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground pt-2 pb-4 px-2">{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            {/* Right Side - Illustration */}
            <div className="hidden lg:flex items-center justify-center">
                <Image src="/faq.png" alt="FAQ Illustration" width={400} height={400} />
            </div>
        </div>
    </div>
  )
}
