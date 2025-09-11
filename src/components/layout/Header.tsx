"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Category } from "@/types/categoryTypes";
import { useCart } from "@/hooks/useCart";
import { useFavourites } from "@/hooks/useFavourite";
import { useAuth } from "@/context/auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useLogout } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import Image from "next/image";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const totalCartItems = useCart().data?.total_cart;
  const totalWishlistItems = useFavourites().data?.total_favourites;
  const { user } = useAuth();
  const { mutate: handleLogout, isPending } = useLogout();

  // Search state + debounce
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim().length > 0) {
        setDebouncedQuery(query.trim());
      } else {
        setDebouncedQuery("");
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [query]);

  const { getProducts } = useProducts(1, 30, debouncedQuery || undefined);
  const searchResults = useMemo(() => {
    return getProducts.data?.data?.data || [];
  }, [getProducts.data]);
  const isSearching = getProducts.isFetching;
  const isError = getProducts.isError;
  const errorStatus = (getProducts.error as any)?.response?.status

  return (
    <header className="w-full bg-white border-b top-0 sticky z-50">
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
                <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
                <SheetDescription>
                  Browse all available categories.
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col space-y-6 px-6">
                <Link
                  href="/shop"
                  className={`uppercase text-lg font-medium transition-colors ${
                    pathname === "/shop"
                      ? "text-black font-semibold"
                      : "hover:text-gray-600"
                  }`}
                >
                  Shop
                </Link>
                {categories.map((item) => (
                  <Link
                    key={item.id}
                    href={`/shop/${item.slug}`}
                    className={`uppercase text-lg font-medium transition-colors ${
                      pathname === `/shop/${item.slug}`
                        ? "text-black font-semibold"
                        : "hover:text-gray-600"
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href={"/"}>
            <div className="border border-black text-center px-1 sm:px-3 py-2">
              <span className="text-xs sm:text-sm font-medium">
                BLACK AND WHITE TREND
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 px-4">
          <Link
            href="/shop"
            className={`uppercase text-sm lg:text-base font-medium transition-colors ${
              pathname === "/shop"
                ? "bg-black text-white font-semibold px-2 py-1 rounded"
                : "hover:text-gray-600"
            }`}
          >
            Shop
          </Link>
          {categories.map((item) => (
            <Link
              key={item.id}
              href={`/shop/${item.slug}`}
              className={`uppercase text-sm lg:text-base font-medium transition-colors ${
                pathname === `/shop/${item.slug}`
                  ? "bg-black text-white font-semibold px-2 py-1 rounded"
                  : "hover:text-gray-600"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search */}
          <div className="relative">
            {/* Search Icon */}
            <Search className="h-5 w-5 sm:h-6 sm:w-6 hover:text-gray-600 cursor-pointer" onClick={() => setOpen((prev) => !prev)}/>

            {/* Search Bar & Dropdown */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-64 sm:w-80 bg-white border rounded-lg shadow-lg z-50 translate-x-1/3 sm:translate-x-0"
                >
                  <div className="flex items-center border-b px-3 py-2">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="flex-1 border-none outline-none focus:ring-0 text-sm bg-transparent"
                    />
                    <Button
                    variant={"ghost"}
                      onClick={() => setOpen(false)}
                      className="ml-2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </Button>
                  </div>

                  <div className="max-h-64 overflow-y-auto">
                    {isSearching ? (
                      <div className="flex items-center justify-center space-x-2 p-4">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <span className="ml-2">Searching...</span>
                      </div>
                    ) : debouncedQuery.length === 0 ? (
                      <div className="p-3 text-sm text-gray-400">
                        Type to search products...
                      </div>
                    ) : isError && errorStatus === 404 ? (
                      <div className="p-3 text-sm text-gray-500">
                        No products found
                      </div>
                    ) : searchResults.length > 0 ? (
                      searchResults.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer transition"
                          onClick={() => {
                            setQuery("");
                            setOpen(false);
                            router.push(`/shop/${product.categories?.[0]?.categories_slug}/${product.slug}`);
                          }}
                        >
                          <Image
                            src={product.image || "/placeholder.png"}
                            width={40}
                            height={40}
                            alt={product.title}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">
                              {product.title}
                            </span>
                            <span className="text-xs text-gray-600">
                              Rs. {product.discount_price || product.price}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-sm text-gray-500">
                        No products found
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative hover:text-gray-600"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalWishlistItems ?? 0}
            </span>
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative hover:text-gray-600"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalCartItems ?? 0}
            </span>
          </Link>

          {/* User Dropdown */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              {user ? (
                <Avatar className="cursor-pointer border border-gray-300">
                  <AvatarFallback>
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <User className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer hover:text-gray-600" />
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-44 rounded-lg shadow-md"
            >
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleLogout()}
                    className="text-red-500 hover:!text-red-600"
                    disabled={isPending}
                  >
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">Signup</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
