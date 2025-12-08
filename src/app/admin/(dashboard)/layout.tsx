"use client";
import { AppSidebar } from "@/components/admin/sidebar/AppSidebar";
import NotificationComponent from "@/components/admin/sidebar/notification";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/context/authContext";
import { useNotifications } from "@/hooks/useDashboard";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useMemo } from "react";

const breadcrumbMap: { [key: string]: string } = {
  "/admin": "",
  "/admin/dashboard": "Dashboard Overview",
  "/admin/product": "Products",
  "/admin/category": "Categories",
  "/admin/user": "Users",
  "/admin/banner": "Banners",
  "/admin/order": "Orders",
  "/admin/contact": "Contacts",
  "/admin/settings": "Settings",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  // const currentLabel = breadcrumbMap[pathname] ?? "Admin";
  const router = useRouter();
  const {
    data: notificationData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useNotifications()

  const notifications = useMemo(() => {
    return (
      notificationData?.pages.flatMap((page: any) =>
        page.data?.map((item: any) => ({
          id: item.id,
          user: item.title,
          action: item.message,
          target: "",
          timestamp: item.created_at,
          unread: !item.is_read,
        })),
      ) ?? []
    )
  }, [notificationData])
  // console.log("nnn", notifications)

  const generateBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean); 

    const paths = segments.map((_, i) => "/" + segments.slice(0, i + 1).join("/"));

    return paths.map((p, i) => {
      const label = breadcrumbMap[p] || segments[i]; 
      return { href: p, label };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

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
          <Image
            src="/logo.png"
            alt="logo"
            width={150}
            height={50}
          />
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
          <header className="flex bg-background z-50 sticky top-0 h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="w-full flex items-center justify-between">
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((bc, i) => (
                    <Fragment key={bc.href}>
                      <BreadcrumbItem>
                        {i < breadcrumbs.length - 1 ? (
                          <BreadcrumbLink href={bc.href}>
                            {bc.label.charAt(0).toUpperCase() + bc.label.slice(1)}
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>
                            {bc.label.charAt(0).toUpperCase() + bc.label.slice(1)}
                          </BreadcrumbPage>
                        )}
                      </BreadcrumbItem>

                      {i < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                    </Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>

              <NotificationComponent
                notifications={notifications}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />

            </div>
          </header>
           <main className="flex-1 max-w-screen overflow-x-hidden">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
