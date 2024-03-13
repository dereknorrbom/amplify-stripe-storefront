import { handler } from '../../amplify/functions/sendPurchaseEmail/handler';
import { SES } from 'aws-sdk';
import { Context } from 'aws-lambda';

jest.mock('aws-sdk', () => {
  return {
    SES: jest.fn(() => ({
      sendEmail: jest.fn().mockImplementation((params, callback) => {
        callback(null, { MessageId: 'test-message-id' });
      }),
    })),
  };
});

describe('sendPurchaseEmail Lambda Function', () => {
  it('successfully sends an email and returns a 200 status code', async () => {
    const event = {
      email: 'dereknorrbom@gmail.com',
      productName: 'Test Product',
      productPrice: '100',
      paymentAmount: '100',
      transactionId: '123456',
    };

    const context: Context = {} as Context;
    const callback = () => {};

    const result = await handler(event, context, callback);

    expect(result.statusCode).toEqual(200);
    expect(JSON.parse(result.body).message).toEqual('Email sent successfully');
  });

  it('returns a 500 status code if email sending fails', async () => {
    // Override the mock to simulate an error
    (SES as any).mockImplementation(() => ({
      sendEmail: jest.fn().mockImplementation((params, callback) => {
        callback(new Error('Failed to send email'), null);
      }),
    }));

    const event = {
      email: 'dereknorrbom@gmail.com',
      productName: 'Test Product',
      productPrice: '100',
      paymentAmount: '100',
      transactionId: '123456',
    };

    const context: Context = {} as Context;
    const callback = () => {};

    const result = await handler(event, context, callback);

    expect(result.statusCode).toEqual(500);
    expect(JSON.parse(result.body).error).toEqual('Failed to send email');
  });
});
