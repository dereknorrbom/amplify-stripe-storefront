"use client"
import { Amplify } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from "@/amplify/data/resource";
import Link from 'next/link';

import config from '@/amplifyconfiguration.json';
Amplify.configure(config, { ssr: true });

const client = generateClient<Schema>()

export default function Home() {
  const [products, setProducts] = useState<{ name: string; description: string; price: number; id: string; }[]>([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const { data: products } = await client.models.Product.list();
        setProducts(products.map((product: any) => ({
          ...product,
          name: product.name || '',
        })));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                {/* Replace with actual product image */}
                <img src="https://picsum.photos/seed/2/400/300" alt={product.name} className="w-full h-48 object-cover" />
                <div className="absolute top-0 right-0 bg-yellow-500 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold uppercase tracking-wide">
                  New
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-800">${(product.price / 100).toFixed(2)}</span>
                  <Link href={`/products/${product.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      Purchase
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}