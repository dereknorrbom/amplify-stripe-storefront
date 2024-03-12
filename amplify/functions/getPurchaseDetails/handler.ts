// getPurchaseDetails/handler.ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import Stripe from 'stripe';

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

    return {
      statusCode: 200,
      body: JSON.stringify({
        paymentAmount: (paymentIntent.amount / 100).toFixed(2),
        transactionId: paymentIntent.id,
      }),
    };
  } catch (error) {
    console.error('Error retrieving purchase details:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve purchase details' }),
    };
  }
};