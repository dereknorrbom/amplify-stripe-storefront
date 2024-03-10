"use client"
import { Amplify } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from "@/amplify/data/resource";
import { useParams } from 'next/navigation';

import config from '@/amplifyconfiguration.json';
Amplify.configure(config);

const client = generateClient<Schema>()

export default function ProductDetail() {
  const [product, setProduct] = useState<{ name: string; description: string; price: number; id: string; } | null>(null);  

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (typeof id === "string") {
          const productResponse = await client.models.Product.get({ id });
          const product = productResponse.data; // Add this line to assign the product data
          setProduct({
            name: product?.name || '', // Ensure name is of type string
            description: product?.description || '', // Provide default value for description
            price: product?.price || 0, // Provide default value for price
            id: product?.id || '' // Ensure id is of type string
          });
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handlePurchase = async () => {
    // TODO: Implement Stripe checkout logic here
    console.log('Purchasing product:', product);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (    <main className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {/* Replace with actual product image */}
            <img src="https://picsum.photos/seed/picsum/600/400" alt={product.name} className="w-full h-auto rounded-lg shadow-md" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
            <p className="text-gray-600 mb-8">{product.description}</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
            </div>
            <button
              onClick={handlePurchase}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Purchase with Stripe
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
