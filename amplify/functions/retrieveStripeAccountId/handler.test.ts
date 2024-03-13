import { handler } from './handler';
import { Context } from 'aws-lambda';
import { APIGatewayProxyResult } from 'aws-lambda';

// Mock the Stripe module
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    oauth: {
      token: jest.fn().mockImplementation(({ code }) => {
        if (code === 'authorization_code') {
          return Promise.resolve({ stripe_user_id: 'acct_test_id' });
        } else {
          return Promise.reject(new Error('Failed to retrieve Stripe account ID'));
        }
      }),
    },
  }));
});

describe('retrieveStripeAccountId Lambda Function', () => {
  const context = {} as Context;
  const callback = jest.fn();

  it('successfully retrieves the Stripe account ID and returns a 200 status code', async () => {
    const event = {
      body: JSON.stringify({ code: 'authorization_code' }),
    };

    const result = await handler(event as any, context, callback) as APIGatewayProxyResult;

    expect(result.statusCode).toEqual(200);
    expect(JSON.parse(result.body).stripeAccountId).toEqual('acct_test_id');
  });

  it('returns a 500 status code if the Stripe account ID retrieval fails', async () => {
    const event = {
      body: JSON.stringify({ code: 'invalid_code' }),
    };

    const result = await handler(event as any, context, callback) as APIGatewayProxyResult;

    expect(result.statusCode).toEqual(500);
    expect(JSON.parse(result.body).error).toEqual('Failed to retrieve Stripe account ID');
  });
});
