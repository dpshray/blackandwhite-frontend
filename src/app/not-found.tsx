import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
    title: 'Page Not Found | Black-and-white',
    description: 'The page you are looking for does not exist in black-and-white. It might have been moved or deleted.'
};

export default async function NotFound() {
    // let categories: any[] = [];
    // try {
    //     const categoriesResponse = await getCategories();
    //     categories = categoriesResponse.data.data.slice(0, 5);
    // } catch {
    //     categories = [];
    // }

    return (
        <>
            {/* <Header categories={categories} /> */}
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50">
                <div className="mb-8">
                    {/* Uncomment and update src path if you have a logo */}
                    {/* <Image src="/logo.png" alt="Hitayau Clinic" width={150} height={50} /> */}
                </div>
                
                <h1 className="text-6xl font-bold text-red-600">404</h1>
                <h2 className="mt-4 text-2xl font-semibold text-gray-800">Page Not Found</h2>
                
                <p className="mt-4 text-gray-600 max-w-md">
                    We&apos;re sorry, the page you are looking for could not be found. 
                    It might have been moved, deleted, or never existed.
                </p>
                
                <Link href="/">
                    <Button className="text-white mt-4 rounded-md">Return to Homepage</Button>
                </Link>
            </div>
            {/* <Footer categories={categories}/> */}
        </>
    );
}