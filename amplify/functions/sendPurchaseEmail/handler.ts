// sendPurchaseEmail/handler.ts
import { Handler } from 'aws-lambda';
import { SES } from 'aws-sdk';

const ses = new SES();

export const handler: Handler = async (event) => {
  console.log('Received event:', event);
  const { email, productName, productPrice, paymentAmount, transactionId } = event;

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `Thank you for your purchase!

          Product Details:
          Name: ${productName}
          Price: $${productPrice}

          Payment Details:
          Payment Amount: $${paymentAmount}
          Transaction ID: ${transactionId}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Your Purchase Confirmation',
      },
    },
    Source: 'dereknorrbom+ses@gmail.com',
  };


  try {
    await ses.sendEmail(params).promise();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};