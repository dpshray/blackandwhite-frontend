import Link from "next/link";
import { Button } from "../ui/button";
import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

const navItems = [
    {name: "HOODIES", href: "#"},
    {name: "PANTS", href: "#"},
    {name: "SHIRTS", href: "#"},
    {name: "T-SHIRTS", href: "#"},
    {name: "HALF-PANTS", href: "#"},
]

export default function Header() {
    return (
        <header className="w-full bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                {/* Mobile menu button */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                            <SheetHeader>
                                <SheetTitle className="text-lg font-semibold">
                                Menu
                                </SheetTitle>
                                <SheetDescription>
                                Browse all available categories.
                                </SheetDescription>
                            </SheetHeader>
                            <nav className="flex flex-col space-y-6 px-6">
                                {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-lg font-medium hover:text-gray-600 transition-colors"
                                >
                                    {item.name}
                                </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                
                    <div className="border border-black text-center  px-1 sm:px-3 py-1">
                        <span className="text-xs sm:text-sm font-medium">
                            BLACK AND WHITE TREND
                        </span>
                    </div>
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.href} className="text-sm font-medium hover:text-gray-600">
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center space-x-2 sm:space-x-4">
                    <Button variant={"ghost"} size="icon" aria-label="Search">
                        <Search className="h-5 w-5" />
                    </Button>
                    <Button variant={"ghost"} size="icon" aria-label="User">
                        <User className="h-5 w-5" />
                    </Button>
                    <Button variant={"ghost"} size="icon" aria-label="Wishlist">
                        <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="relative" aria-label="Shopping Cart">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            0
                        </span>
                    </Button>
                </div>
            </div>
        </header>
    )
}