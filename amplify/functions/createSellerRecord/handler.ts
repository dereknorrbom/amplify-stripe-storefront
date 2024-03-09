import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export const handler = async (event: any) => {
  try {
    const { sub: id, email } = event.request.userAttributes;

    const params = {
      TableName: 'Seller-7v5may5tl5bulonzl23ui4akcy-NONE', // Replace with your DynamoDB table name
      Item: {
        id,
        email,
        // Add other seller fields as needed
      },
    };

    await dynamoDb.put(params).promise();

    return event;
  } catch (error) {
    console.error('Error creating seller record:', error);
    throw error;
  }
};