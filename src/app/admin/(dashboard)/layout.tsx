"use client";
import { AppSidebar } from "@/components/admin/AppSidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/context/authContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const breadcrumbMap: { [key: string]: string } = {
  "/admin": "",
  "/admin/dashboard": "Dashboard Overview",
  "/admin/product": "Products",
  "/admin/category": "Categories",
  "/admin/user": "Users",
  "/admin/banner": "Banners",
  "/admin/order": "Orders",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const currentLabel = breadcrumbMap[pathname] ?? "Admin";
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user || Number(user?.is_admin) !== 1) {
        router.replace("/admin/login"); 
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="animate-pulse text-lg font-bold tracking-widest">
          BLACK AND WHITE TREND...
        </span>
      </div>
    );
  }
 
  if (!user || Number(user?.is_admin) !== 1) {
    return null;
  }


  return (
    <div className="lg:flex min-h-screen overflow-x-hidden max-w-screen">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="bg-background z-50 sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                  <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                          <BreadcrumbPage>{currentLabel}</BreadcrumbPage>
                      </BreadcrumbItem>
                  </BreadcrumbList>
              </Breadcrumb>
          </header>
           <main className="flex-1 max-w-screen overflow-x-hidden">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
