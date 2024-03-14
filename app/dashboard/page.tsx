// /app/login/page.tsx
"use client";
import { Amplify } from 'aws-amplify';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { Authenticator } from '@aws-amplify/ui-react';
import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '@/amplify/data/resource';
import { useRouter } from 'next/navigation';
import { ProductCreateForm } from '@/ui-components';
import { generateStripeConnectUrl } from '../services/stripeConnect';
// get current session import

import config from '@/amplifyconfiguration.json';
Amplify.configure(config, { ssr: true });

const client = generateClient<Schema>();

const DashboardPage = () => {
  const [stripeId, setStripeId] = useState('');
  const [products, setProducts] = useState<Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    owner: string;
  }>>([]);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingPrice, setEditingPrice] = useState('');
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const { username } = await getCurrentUser();
        const { data: seller } = await client.models.Seller.get({ id: username });
        if (seller) {
          setStripeId(seller.stripeAccountId || '');
        }
      } catch (error) {
        console.error('Error fetching seller data:', error);
      }
    };

    fetchSellerData();
  }, []);

  const fetchProducts = async (user: any) => {
    try {
      const response = await client.models.Product.list({
        filter: { owner: { eq: user.username } },
        limit: 100,
      });
      const products = response.data ? response.data : []; // Ensure products is always an array
      // Proceed with setting the products state
      if (Array.isArray(products)) {
        setProducts(products.map((product: any) => ({
          ...product,
          name: product.name || '',
          price: product.price, // Keep price as is, no conversion here
        })));
      } else {
        console.error('Expected products to be an array, but got:', products);
        setProducts([]); // Fallback to an empty array
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductCreated = async (fields: any) => {
    console.log('Product created:', fields);
    // Refresh the product list after successful creation
    const user = await getCurrentUser();
    await fetchProducts(user);
    setRefreshKey(oldKey => oldKey + 1); // Increment refreshKey to force re-fetch
    //window.location.reload(); // Refresh the page after adding a product
  };

  const handleProductCreateError = async (fields: any, errorMessage: string) => {
    console.error('Error creating product:', errorMessage);
    // Display an error message to the user
    alert('Failed to create the product. Please try again.');
  };

  const deleteProduct = async (productId: string) => {
    try {
      await client.models.Product.delete({ id: productId });
      // Refresh the product list after successful deletion
      const user = await getCurrentUser();
      await fetchProducts(user);
    } catch (error) {
      console.error('Error deleting product:', error);
      // Display an error message to the user
      alert('Failed to delete the product. Please try again.');
    }
  };

  const updateProduct = async (productId: string, updatedFields: any) => {
    try {
      // Ensure the price is already an integer representing cents
      await client.models.Product.update({
        id: productId,
        ...updatedFields,
        price: Math.round(parseFloat(updatedFields.price)), // Convert the price from a string to an integer representing cents
      });
      // Refresh the product list after successful update
      const user = await getCurrentUser();
      await fetchProducts(user);
      setEditingProductId(null);
      setEditingPrice(''); // Reset editing price
    } catch (error) {
      console.error('Error updating product:', error);
      // Display an error message to the user
      alert('Failed to update the product. Please try again.');
    }
  };

  const handleStripeConnect = async () => {
    try {
      const user = await getCurrentUser();
      console.log('UserName:', user.username);
      const stripeConnectUrl = await generateStripeConnectUrl();
      window.location.href = `${stripeConnectUrl}&state=${user.username}`;
    } catch (error) {
      console.error('Error generating Stripe Connect URL:', error);
    }
  };

  useEffect(() => {
    const fetchUserDataAndProducts = async () => {
      const user = await getCurrentUser();
      if (user) {
        await fetchProducts(user);
      }
    };

    fetchUserDataAndProducts();
  }, [refreshKey]);

  return (
    <Authenticator>
      {({ signOut, user }) => {
        if (!user) {
          return <></>;
        }

        return (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-3">Stripe Connect</h2>
              <div className="bg-gray-100 p-4 border border-gray-300 rounded-lg mb-6">
                {stripeId ? (
                  <p className="text-lg">Stripe account connected: <span className="font-semibold">{stripeId}</span></p>
                ) : (
                  <button
                    onClick={handleStripeConnect}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Connect Stripe
                  </button>
                )}
              </div>
              <div className="mb-10">
                <h2 className="text-xl font-semibold mb-3">Add Product</h2>
                <div className="bg-gray-100 p-4 border border-gray-300 rounded-lg">
                  <ProductCreateForm
                    onSuccess={handleProductCreated}
                    onError={handleProductCreateError}
                  />
                </div>
              </div>
              <div className="mb-10">
                <h2 className="text-xl font-semibold mb-3">Products</h2>
                <ul className="space-y-4">
                  {products.map((product) => (
                    <li key={product.id} className="bg-gray-100 p-4 border border-gray-300 rounded-lg">
                      {editingProductId === product.id ? (
                        <div className="flex items-center space-x-3">
                          <input
                            type="text"
                            value={product.name}
                            onChange={(e) =>
                              setProducts((prevProducts) =>
                                prevProducts.map((p) =>
                                  p.id === product.id ? { ...p, name: e.target.value } : p
                                )
                              )
                            }
                            className="border border-gray-300 rounded px-2 py-1 flex-1"
                          />
                          <input
                            type="text"
                            value={product.description}
                            onChange={(e) =>
                              setProducts((prevProducts) =>
                                prevProducts.map((p) =>
                                  p.id === product.id ? { ...p, description: e.target.value } : p
                                )
                              )
                            }
                            className="border border-gray-300 rounded px-2 py-1 flex-1"
                          />
                          <input
                            type="text"
                            value={editingProductId === product.id ? editingPrice : ''}
                            onChange={(e) => setEditingPrice(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 w-24"
                          />
                          <button
                            onClick={() => {
                              updateProduct(product.id, {
                                name: product.name,
                                description: product.description,
                                price: parseFloat(editingPrice) * 100,
                              });
                              setEditingProductId(null);
                              setEditingPrice(''); // Reset editing price
                            }}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingProductId(null);
                              setEditingPrice(''); // Reset editing price
                            }}
                            className="bg-red-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row items-center">
                          <div className="w-full sm:w-auto sm:flex-1 px-2 mb-2 sm:mb-0">
                            <span className="font-semibold">Name:</span> {product.name}
                          </div>
                          <div className="w-full sm:w-auto sm:flex-1 px-2 mb-2 sm:mb-0 text-ellipsis overflow-hidden">
                            <span className="font-semibold">Description:</span>
                            <span className="truncate">{product.description}</span>
                          </div>
                          <div className="w-full sm:w-auto sm:flex-none px-2 mb-2 sm:mb-0">
                            <span className="font-semibold">Price:</span> ${(product.price / 100).toFixed(2)}
                          </div>
                          <div className="w-full sm:w-auto sm:flex-none px-2 flex justify-between sm:justify-end">
                            <button
                              onClick={() => {
                                setEditingProductId(product.id);
                                setEditingPrice((product.price / 100).toFixed(2));
                              }}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-2 sm:mb-0 sm:mr-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button onClick={signOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Sign out
            </button>
          </div>
        );
      }}
    </Authenticator>
  );
};

export default DashboardPage;
