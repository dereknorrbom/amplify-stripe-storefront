import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export const handler = async (event: any) => {
  try {
    const { sub: id, email } = event.request.userAttributes;

    const params = {
      //TableName: 'Seller-7v5may5tl5bulonzl23ui4akcy-NONE', // Sandbox table name: Seller-7v5may5tl5bulonzl23ui4akcy-NONE
      TableName: 'Seller-3pikmbbbznhw7ks5ixk2imnrxy-main', // Main table name: Seller-3pikmbbbznhw7ks5ixk2imnrxy-main
      Item: {
        id,
        email,
        name: '', // Set an empty string as the initial value for the name field
        stripeAccountId: '', // Add an empty string as the initial value
        products: [], // Add an empty array as the initial value
        createdAt: new Date().toISOString(), // Add the current timestamp
        updatedAt: new Date().toISOString(), // Add the current timestamp
      },
    };

    await dynamoDb.put(params).promise();

    return event;
  } catch (error) {
    console.error('Error creating seller record:', error);
    throw error;
  }
};