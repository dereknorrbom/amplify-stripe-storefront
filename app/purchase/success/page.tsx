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
    <div>
      <h1>Thank you for your purchase!</h1>
      <p>Payment Amount: ${purchaseDetails.paymentAmount}</p>
      <p>Transaction ID: {purchaseDetails.transactionId}</p>
    </div>
  );
}