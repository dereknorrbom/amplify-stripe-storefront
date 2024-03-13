import { handler } from '../../amplify/functions/stripeConnectCallback/handler';
import Stripe from 'stripe';
import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';

// Set the AWS region for testing
AWS.config.update({ region: 'us-east-1' }); // Change 'us-east-1' to your region if different

// Mock the Stripe OAuth token method
jest.mock('stripe', () => {
  const actualStripe = jest.requireActual('stripe');
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      return {
        oauth: {
          token: jest.fn().mockResolvedValue({
            stripe_user_id: 'acct_test_id',
          }),
        },
      };
    }),
  };
});

// Mock AWS DynamoDB
AWSMock.setSDKInstance(AWS);
AWSMock.mock('DynamoDB.DocumentClient', 'update', (params: any, callback: Function) => {
  // Mock the response as successful update
  callback(null, { Attributes: { id: params.Key.id } });
});

describe('Stripe Account Link Lambda Function', () => {
  afterAll(() => {
    jest.restoreAllMocks();
    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('successfully links Stripe account and updates DynamoDB', async () => {
    const event = {
      queryStringParameters: {
        code: 'authorization_code',
        state: 'username',
      },
    };

    const result = await handler(event);

    expect(result.statusCode).toEqual(302);
    expect((result.headers as { Location: string }).Location).toEqual('http://localhost:3000/dashboard');
  });

  it('returns an error if the code or username is not provided', async () => {
    const event = {
      queryStringParameters: {},
    };

    const result = await handler(event);

    expect(result.statusCode).toEqual(400);
    expect(JSON.parse(result.body).error).toEqual('Invalid authorization code or username');
  });

  // Add more tests as needed...
});
