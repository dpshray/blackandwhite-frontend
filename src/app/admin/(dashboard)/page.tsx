import Link from "next/link";

export default function AdminPage() {
    const sections = [
        {
            href: "/admin/dashboard",
            title: "Dashboard",
            description: "View key stats and reports",
        },
        {
            href: "/admin/product",
            title: "Products",
            description: "Manage products and inventory",
        },
        {
            href: "/admin/category",
            title: "Categories",
            description: "Organize products into categories",
        },
        {
            href: "/admin/user",
            title: "Users",
            description: "Manage user accounts",
        },
        {
            href: "/admin/banner",
            title: "Banners",
            description: "Create and manage promotional banners",
        },
        {
            href: "/admin/order",
            title: "Orders",
            description: "View and manage orders",
        },
        {
            href: "/admin/contact",
            title: "Contacts",
            description: "View and manage contacts",
        },
    ];


  return (
    <div className="flex flex-col items-center justify-center h-full bg-white p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome, Admin!</h1>
      <p className="mb-8 text-lg text-gray-700">Choose a section to manage:</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        {sections.map(({ href, title, description }) => (
          <Link
            key={href}
            href={href}
            className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition text-center"
          >
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
