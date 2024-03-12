// app/purchase/success/page.tsx
"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PurchaseSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [purchaseDetails, setPurchaseDetails] = useState<{
    paymentAmount: string;
    transactionId: string;
    productPrice: string;
    productName: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchaseDetails = async () => {
      if (!sessionId) {
        setError('Invalid session ID');
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_GET_PURCHASE_DETAILS_URL}?sessionId=${sessionId}`);
        const data = await response.json();

        if (response.ok) {
          setPurchaseDetails(data);
        } else {
          setError(data.error || 'Failed to retrieve purchase details');
        }
      } catch (error) {
        console.error('Error retrieving purchase details:', error);
        setError('Error retrieving purchase details');
      }
    };

    fetchPurchaseDetails();
  }, [sessionId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!purchaseDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-grow items-center justify-center">
      <div className="mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Thank you for your purchase!</h1>
        <div className="mb-4">
          <p className="text-lg font-semibold">Product Details:</p>
          <p>Name: {purchaseDetails.productName}</p>
          <p>Price: ${purchaseDetails.productPrice}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Payment Details:</p>
          <p>Payment Amount: ${purchaseDetails.paymentAmount}</p>
          <p>Transaction ID: {purchaseDetails.transactionId}</p>
        </div>
        <a
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}