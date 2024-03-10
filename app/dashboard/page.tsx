"use client";
import { Amplify } from 'aws-amplify';
import { getCurrentUser } from 'aws-amplify/auth';
import { Authenticator } from '@aws-amplify/ui-react';
import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '@/amplify/data/resource';
import { useRouter } from 'next/navigation';
import { ProductCreateForm } from '@/ui-components';

import config from '@/amplifyconfiguration.json';
Amplify.configure(config);

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

  const updateStripeAccountId = async (stripeAccountId: string, user: any) => {
    try {
      const { data: seller } = await client.models.Seller.get({ id: user.username });

      if (seller) {
        const updatedSeller = {
          id: seller.id,
          name: seller.name,
          email: seller.email,
          stripeAccountId,
        };

        const { data: updatedData, errors } = await client.models.Seller.update(updatedSeller);

        if (errors) {
          console.error('Error updating Stripe Account ID:', errors);
        } else {
          console.log('Stripe Account ID updated successfully:', updatedData);
        }
      } else {
        console.error('Seller not found');
      }
    } catch (error) {
      console.error('Error updating Stripe Account ID:', error);
    }
  };

  const handleStripeIdSubmit = async (event: React.FormEvent<HTMLFormElement>, user: any) => {
    event.preventDefault();
    await updateStripeAccountId(stripeId, user);
  };

  const fetchProducts = async (user: any) => {
    try {
      const { data: products } = await client.models.Product.list({
        filter: { owner: { eq: user.username } },
        limit: 100,
      });
      setProducts(products.map((product: any) => ({
        ...product,
        name: product.name || '',
      })));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductCreated = async (fields: any) => {
    console.log('Product created:', fields);
    // Refresh the product list after successful creation
    const user = await getCurrentUser();
    await fetchProducts(user);
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

  useEffect(() => {
    const fetchUserDataAndProducts = async () => {
      const user = await getCurrentUser();
      if (user) {
        await fetchProducts(user);
      }
    };

    fetchUserDataAndProducts();
  }, []);

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
              <h2 className="text-xl font-bold mb-2">Update Stripe ID</h2>
              <form onSubmit={(event) => handleStripeIdSubmit(event, user)} className="flex items-center">
                <label htmlFor="stripeId" className="mr-2">Stripe ID:</label>
                <input
                  id="stripeId"
                  type="text"
                  value={stripeId}
                  onChange={(e) => setStripeId(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 mr-2"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                  Update
                </button>
              </form>
            </div>
            <div className="mb-8">
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
                        <span className="ml-4 mr-2 font-bold">Price:</span><span>${product.price}</span>
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