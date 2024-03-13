import { handler } from '../../amplify/functions/generateStripeConnectUrl/handler';
import Stripe from 'stripe';
import { APIGatewayProxyResult } from 'aws-lambda';

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => {
    return {
      oauth: {
        authorizeUrl: jest.fn().mockResolvedValue('https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_test&scope=read_write'),
      },
    };
  });
});

describe('generateStripeConnectUrl Lambda Function', () => {
  it('successfully generates a Stripe Connect URL and returns a 200 status code', async () => {
    const event = {} as any; // Replace 'event' with a new event object
    const result = await handler(event, {} as any, jest.fn()) as APIGatewayProxyResult;

    expect(result.statusCode).toEqual(200);
    const body = JSON.parse(result.body);
    expect(body.stripeConnectUrl).toEqual('https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_test&scope=read_write');
  });

  it('returns a 500 status code if there is an error generating the Stripe Connect URL', async () => {
    // Override the mock to simulate an error
    const mockEvent = {} as any;
    const result = await handler(mockEvent, {} as any, jest.fn()) as APIGatewayProxyResult;

    expect(result.statusCode).toEqual(500);
    const body = JSON.parse(result.body);
    expect(body.error).toEqual('Failed to generate Stripe Connect URL');
  });
});
