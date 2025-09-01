"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import type { Banner } from "@/types/bannerTypes"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface BannerSliderProps {
  banners: Banner[]
}

export default function BannerSlider({ banners }: BannerSliderProps) {
  return (
    <section className="relative w-full aspect-[2.4/1] overflow-hidden">
      {/* Banner Size: 1440x600px, Aspect Ratio: 2.4:1 */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id} className="h-full">
            <div className="relative w-full h-full">
              <Image
                src={banner.image || "/placeholder.svg"}
                alt={`${banner.title} ${banner.subtitle}`}
                fill
                className="object-cover"
                priority={index === 0}
              />

              {/* Center Content Overlay */}
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="text-center space-y-4 md:space-y-6">
                  <h1 className="text-black leading-none">
                    <span className="font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl block">
                      {banner.title}
                    </span>
                    <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-7xl">{banner.subtitle}</span>
                  </h1>
                  <Button
                    className="bg-black text-white px-4 py-2 text-sm sm:px-6 sm:py-2 sm:text-base md:px-8 md:py-3 md:text-lg font-medium hover:bg-gray-800 rounded-none"
                    onClick={() => (window.location.href = banner.url)}
                  >
                    SHOP NOW
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev !absolute !left-4 !top-1/2 !-translate-y-1/2 !z-20 !w-12 !h-12 !bg-white/20 hover:!bg-white/30 !border !border-white/30 !text-white !rounded-full !transition-colors after:!text-lg after:!font-bold after:!text-white"></div>
        <div className="swiper-button-next !absolute !right-4 !top-1/2 !-translate-y-1/2 !z-20 !w-12 !h-12 !bg-white/20 hover:!bg-white/30 !border !border-white/30 !text-white !rounded-full !transition-colors after:!text-lg after:!font-bold after:!text-white"></div>

        <div className="swiper-pagination !bottom-4 !z-20"></div>
      </Swiper>
    </section>
  )
}
