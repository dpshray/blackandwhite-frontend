import { ChevronUp, Home, Package, Receipt, Settings, User2 } from "lucide-react";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { PiFlagBanner } from "react-icons/pi";
import { useLogout } from "@/hooks/useAuth";

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
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

const FooterItems = [
  {
    title: "Account",
    url: "#",
  },
  {
    title: "Sign out",
    action: "logout",
  },
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
                          ? "bg-gradient-to-r from-black to-white text-yellow-900 font-semibold shadow-sm hover:shadow-md hover:text-yellow-900"
                          : "",
                        "flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-yellow-50 transition-colors"
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
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="cursor-pointer">
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-full"
              >
                {FooterItems.map((item) => (
                  <DropdownMenuItem
                    key={item.title}
                    onClick={() => {
                      if (item.action === "logout") {
                        handleLogout();
                      }
                    }}
                  >
                    {item.url ? (
                      <Link href={item.url}>
                        <span>{item.title}</span>
                      </Link>
                    ) : (
                      <span>{item.title}</span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
