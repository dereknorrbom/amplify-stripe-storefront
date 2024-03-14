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
      await client.models.Product.update({
        id: productId,
        ...updatedFields,
      });
      // Refresh the product list after successful update
      const user = await getCurrentUser();
      await fetchProducts(user);
      setEditingProductId(null);
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
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-2">Stripe Connect</h2>
              {stripeId ? (
                <p>Stripe account connected: {stripeId}</p>
              ) : (
                <button
                  onClick={handleStripeConnect}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Connect Stripe
                </button>
              )}
            </div>            <div className="mb-8">
              <h2 className="text-xl font-bold mb-2">Add Product</h2>
              <ProductCreateForm
                onSuccess={handleProductCreated}
                onError={handleProductCreateError}
              />
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-2">Products</h2>
              <ul>
                {products.map((product) => (
                  <li key={product.id} className="mb-4">
                    {editingProductId === product.id ? (
                      <div>
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
                          className="border border-gray-300 rounded px-2 py-1 mr-2"
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
                          className="border border-gray-300 rounded px-2 py-1 mr-2"
                        />
                        <input
                          type="number"
                          value={product.price}
                          onChange={(e) =>
                            setProducts((prevProducts) =>
                              prevProducts.map((p) =>
                                p.id === product.id ? { ...p, price: Number(e.target.value) } : p
                              )
                            )
                          }
                          className="border border-gray-300 rounded px-2 py-1 mr-2"
                        />
                        <button
                          onClick={() => updateProduct(product.id, product)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingProductId(null)}
                          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <span className="mr-2 font-bold">Name:</span><span>{product.name}</span>
                        <span className="ml-4 mr-2 font-bold">Description:</span><span>{product.description}</span>
                        <span className="ml-4 mr-2 font-bold">Price:</span><span>${(product.price / 100).toFixed(2)}</span>
                        <button
                          onClick={() => setEditingProductId(product.id)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
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
                    )}
                  </li>
                ))}
              </ul>
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