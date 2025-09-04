"use client";

import { ShopBreadCrumb } from "@/components/ShopBreadCrumb";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Home } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import TextInput from "@/components/fields/TextInput";

// ✅ Zod Validation Schema
const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number too long"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const breadcrumbs = [
    { label: <Home />, href: "/" },
    { label: "Contact", href: "/contact" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    toast.success("Your message has been sent!");
    reset();
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 min-h-screen bg-background py-10">
      {/* Breadcrumb */}
      <ShopBreadCrumb items={breadcrumbs} />

      <div className="py-10">
        <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Left Side - Contact Form */}
          <div className="bg-gray-900 text-white p-8 lg:p-12 overflow-hidden">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 z-10"
            >
              <TextInput<ContactFormValues>
                label="First Name"
                name="firstName"
                placeholder="Enter your First Name"
                register={register}
                error={errors.firstName}
              />

              <TextInput<ContactFormValues>
                label="Last Name"
                name="lastName"
                placeholder="Enter your Last Name"
                register={register}
                error={errors.lastName}
              />

              <TextInput<ContactFormValues>
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your Email"
                register={register}
                error={errors.email}
              />

              <TextInput<ContactFormValues>
                label="Phone"
                name="phone"
                placeholder="Enter your Phone Number"
                register={register}
                error={errors.phone}
              />

              <TextInput<ContactFormValues>
                label="Message"
                name="message"
                type="textArea"
                placeholder="Write your message"
                register={register}
                error={errors.message}
              />

              <Button
                type="submit"
                className="w-full bg-white text-gray-900 hover:bg-gray-100 font-medium py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>

          {/* Right Side - Contact Information */}
          <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
              Get in Touch with us
            </h1>

            <div className="space-y-8">
              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">
                    {process.env.NEXT_PUBLIC_PHONE}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">
                    {process.env.NEXT_PUBLIC_MAIL}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">
                    {process.env.NEXT_PUBLIC_ADDRESS}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
