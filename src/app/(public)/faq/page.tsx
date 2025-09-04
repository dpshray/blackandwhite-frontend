import { ShopBreadCrumb } from "@/components/ShopBreadCrumb"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Home } from "lucide-react"
import Image from "next/image"

export default function FAQPage() {
  const faqs = [
    {
      id: "1",
      question: "When will my order be processed?",
      answer:
        "Orders are typically processed within 1-2 business days. You'll receive a confirmation email once your order has been processed and shipped.",
    },
    {
      id: "2",
      question: "How can I return a product?",
      answer:
        "You can return products within 30 days of purchase. Items must be in original condition with tags attached. Contact our customer service to initiate a return.",
    },
    {
      id: "3",
      question: "Do you provide international shipping?",
      answer:
        "Yes, we offer international shipping to most countries. Shipping costs and delivery times vary by location. Check our shipping policy for more details.",
    },
    {
      id: "4",
      question: "What should I do if my order arrives with missing or incorrect items?",
      answer:
        "If your order has missing or incorrect items, please contact our customer service within 48 hours of delivery. We'll resolve the issue promptly and ensure you receive the correct items.",
    },
    {
      id: "5",
      question: "Is it necessary to create an account to shop online?",
      answer:
        "While you can browse our products without an account, creating one allows you to track orders, save favorites, and enjoy a faster checkout experience.",
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
