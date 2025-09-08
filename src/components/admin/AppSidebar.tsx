import { ChevronRight, Home, Package, Receipt, User2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { MdCategory } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PiFlagBanner } from "react-icons/pi";
import { useLogout } from "@/hooks/useAuth";
import { Button } from "../ui/button";

const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Products",
    url: "/admin/product",
    icon: Package,
  },
  {
    title: "Categories",
    url: "/admin/category",
    icon: MdCategory,
  },
  {
    title: "Users",
    url: "/admin/user",
    icon: User2,
  },
  {
    title: "Banners",
    url: "/admin/banner",
    icon: PiFlagBanner,
  },
  {
    title: "Orders",
    url: "/admin/order",
    icon: Receipt,
  },
  // {
  //   title: "Settings",
  //   url: "/admin/settings",
  //   icon: Settings,
  // },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row py-4">
        {/* <Image src="/images/logo.png" alt="Logo" width={40} height={40} /> */}
        <SidebarGroupLabel className="text-lg">Black and White</SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    onClick={() => setOpenMobile(false)}
                  >
                    <Link
                      href={item.url}
                      className={cn(
                        pathname === item.url
                          ? "bg-gradient-to-r from-black to-gray-400 text-gray-200 font-semibold shadow-sm hover:shadow-2xl hover:!text-gray-200"
                          : "",
                        "flex items-center gap-2 w-full px-3 py-2 rounded hover:!bg-black hover:!text-gray-200 transition-colors"
                      )}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="ghost" aria-busy={logout.isPending} onClick={handleLogout} className="w-full" disabled={logout.isPending}>
            {logout.isPending ? (
                <div className="w-full flex items-center justify-between text-red-500 hover:text-red-600">
                    <span className="opacity-60">Logging out</span>
                    <div>
                        <div className="h-4 w-4 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
                    </div>
                </div>
            ) : (
                <div className="w-full flex items-center justify-between text-red-500 hover:text-red-600">
                    <span>Logout</span>
                    <ChevronRight />             
                </div>
            )}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
