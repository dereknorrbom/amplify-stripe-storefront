// app/products/[id]/page.tsx
"use client";
import { Amplify } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from "@/amplify/data/resource";
import { useParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

import config from '@/amplifyconfiguration.json';
Amplify.configure(config);

const client = generateClient<Schema>();
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function ProductDetail() {
  const [product, setProduct] = useState<{ name: string; description: string; price: number; id: string; owner: string; } | null>(null);
  const [seller, setSeller] = useState<{ stripeAccountId: string } | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (typeof id === "string") {
          const productResponse = await client.models.Product.get({ id });
          const product = productResponse.data;
          setProduct({
            name: product?.name || '',
            description: product?.description || '',
            price: product?.price || 0,
            id: product?.id || '',
            owner: product?.owner || '',
          });
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        if (product?.owner) {
          const sellerResponse = await client.models.Seller.get({ id: product.owner });
          const seller = sellerResponse.data;
          setSeller({ stripeAccountId: seller?.stripeAccountId || '' });
        }
      } catch (error) {
        console.error('Error fetching seller:', error);
      }
    };

    fetchSeller();
  }, [product]);

  const handlePurchase = async () => {
    if (!product || !seller) return;

    try {
      const stripe = await stripePromise;
      const response = await fetch(process.env.NEXT_PUBLIC_CREATE_CHECKOUT_SESSION_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product, seller }),
      });

      if (response.ok) {
        const { sessionId } = await response.json();
        const result = await stripe!.redirectToCheckout({ sessionId });

        if (result.error) {
          console.error('Error redirecting to Stripe Checkout:', result.error);
        }
      } else {
        console.error('Error creating Stripe Checkout session');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-gray-100 min-h-screen">
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