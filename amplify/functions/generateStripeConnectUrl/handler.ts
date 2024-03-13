// generateStripeConnectUrl/handler.ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY);

export const handler: APIGatewayProxyHandler = async () => {
  try {
    console.log('Generating Stripe Connect URL...');
    const stripeConnectUrl = await stripe.oauth.authorizeUrl({
      client_id: process.env.STRIPE_CLIENT_ID!,
      response_type: 'code',
      scope: 'read_write',
      redirect_uri: process.env.STRIPE_CONNECT_CALLBACK_URL!,
    });
    console.log('Stripe Connect URL generated:', stripeConnectUrl);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ stripeConnectUrl }),
    };
  } catch (error) {
    console.error('Error generating Stripe Connect URL:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate Stripe Connect URL' }),
    };
  }
};