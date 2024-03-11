// retrieveStripeAccountId/index.ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const handler: APIGatewayProxyHandler = async (event) => {
  const { code } = JSON.parse(event.body!);

  try {
    const response = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ stripeAccountId: response.stripe_user_id }),
    };
  } catch (error) {
    console.error('Error retrieving Stripe account ID:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve Stripe account ID' }),
    };
  }
};