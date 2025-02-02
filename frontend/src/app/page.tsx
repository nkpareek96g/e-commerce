import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover our products with real-time inventory updates
        </p>
        
        <Link
          href="/products"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
