"use client"

import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface Crumb {
  label: string | React.ReactNode
  href?: string
}

interface ShopBreadCrumbProps {
  items: Crumb[]
}

export function ShopBreadCrumb({ items }: ShopBreadCrumbProps) {
  if (!items || items.length === 0) return null

  return (
    <div className="flex items-center">
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <div className="flex items-center gap-2" key={index}>
                <BreadcrumbItem>
                  {!isLast ? (
                    <BreadcrumbLink
                      asChild
                      className="font-bold text-sm"
                    >
                      <Link href={item.href || "#"}>{item.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-muted-foreground text-sm">{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>

                {!isLast && <BreadcrumbSeparator />}
              </div>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
