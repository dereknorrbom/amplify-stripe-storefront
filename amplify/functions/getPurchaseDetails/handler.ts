// getPurchaseDetails/handler.ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import Stripe from 'stripe';
import { Lambda, DynamoDB } from 'aws-sdk';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});
const lambda = new Lambda();
const dynamoDb = new DynamoDB.DocumentClient();

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

    // Check if a purchase record already exists for the given transaction ID
    const existingPurchase = await dynamoDb
      .get({
        TableName: 'Purchase-7v5may5tl5bulonzl23ui4akcy-NONE',
        Key: { id: paymentIntent.id },
      })
      .promise();

    if (!existingPurchase.Item || !existingPurchase.Item.emailSent) {
      // Create a new purchase record or update the existing one
      const purchase = {
        id : paymentIntent.id,
        product: { id: purchaseDetails.productId },
        buyer: session.customer_details?.email,
        buyerEmail: session.customer_details?.email,
        amount: paymentIntent.amount,
        fee: paymentIntent.application_fee_amount,
        stripeChargeId: paymentIntent.id,
        createdAt: new Date().toISOString(),
        emailSent: false, // Set the initial value to false
      };

      await dynamoDb
        .put({
          TableName: 'Purchase-7v5may5tl5bulonzl23ui4akcy-NONE',
          Item: purchase,
        })
        .promise();

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

      // Update the purchase record to set emailSent to true
      await dynamoDb
        .update({
          TableName: 'Purchase-7v5may5tl5bulonzl23ui4akcy-NONE',
          Key: { id: paymentIntent.id },
          UpdateExpression: 'set emailSent = :emailSent',
          ExpressionAttributeValues: { ':emailSent': true },
        })
        .promise();
    }

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