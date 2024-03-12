// getPurchaseDetails/handler.ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import Stripe from 'stripe';
import { Lambda } from 'aws-sdk';

const lambda = new Lambda();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const handler: APIGatewayProxyHandler = async (event) => {
  const { sessionId } = event.queryStringParameters!;

  if (!sessionId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing session ID' }),
    };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent as string);

    const purchaseDetails = {
      paymentAmount: (paymentIntent.amount / 100).toFixed(2),
      transactionId: paymentIntent.id,
      productId: paymentIntent.metadata.productId,
      productName: paymentIntent.metadata.productName,
      productPrice: paymentIntent.metadata.productPrice,
    };

    // log customer email and purchase details
    console.log('Customer email:', session.customer_details?.email);
    console.log('Purchase details:', purchaseDetails);

    // Invoke the sendPurchaseEmail Lambda function
    await lambda
      .invoke({
        FunctionName: `${process.env.SEND_EMAIL_LAMBDA_NAME!}`,
        Payload: JSON.stringify({
          email: session.customer_details?.email,
          ...purchaseDetails,
        }),
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(purchaseDetails),
    };
  } catch (error) {
    console.error('Error retrieving purchase details:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve purchase details' }),
    };
  }
};