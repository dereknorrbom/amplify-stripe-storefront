import { DynamoDB } from 'aws-sdk';
import Stripe from 'stripe';

const dynamoDb = new DynamoDB.DocumentClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const handler = async (event: any) => {
  const { code, state: username } = event.queryStringParameters;

  if (!code || !username) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid authorization code or username' }),
    };
  }

  try {
    const response = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code,
    });

    const stripeAccountId = response.stripe_user_id;
    console.log('Stripe Account ID:', stripeAccountId);

    const params = {
      TableName: 'Seller-jbyxwxjsfnbvxjag2mgx27cuii-NONE', // Sandbox table name: Seller-7v5may5tl5bulonzl23ui4akcy-NONE
      Key: { id: username },
      UpdateExpression: 'set stripeAccountId = :stripeAccountId',
      ExpressionAttributeValues: {
        ':stripeAccountId': stripeAccountId,
      },
    };

    await dynamoDb.update(params).promise();
    console.log('Updated seller:', username);
    console.log('Redirecting to dashboard...');
    console.log('Redirect URL:', `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`);

    return {
      statusCode: 302,
      headers: {
        Location: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      },
      body: '',
    };
  } catch (error) {
    console.error('Error retrieving Stripe account ID:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve Stripe account ID' }),
    };
  }
};