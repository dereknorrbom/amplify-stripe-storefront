// createCheckoutSession/index.ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const handler: APIGatewayProxyHandler = async (event) => {
  const { product, seller } = JSON.parse(event.body!);
  console.log('Product:', product);
  console.log('Seller:', seller);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: product.price * 100,
            product_data: {
              name: product.name,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/purchase/cancel`,
      payment_intent_data: {
        application_fee_amount: Math.round(product.price * 100 * 0.1),
        transfer_data: {
          destination: seller.stripeAccountId,
        },
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (error) {
    console.error('Error creating Stripe Checkout session:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create Stripe Checkout session' }),
    };
  }
};