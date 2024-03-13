import { handler } from '../../amplify/functions/getPurchaseDetails/handler';
import { APIGatewayProxyResult } from 'aws-lambda';

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => {
    return {
      checkout: {
        sessions: {
          retrieve: jest.fn().mockResolvedValue({
            payment_intent: 'pi_123',
            customer_details: {
              email: 'test@example.com',
            },
          }),
        },
      },
      paymentIntents: {
        retrieve: jest.fn().mockResolvedValue({
          id: 'pi_123',
          amount: 1000,
          metadata: {
            productId: 'prod_123',
            productName: 'Test Product',
            productPrice: '10.00',
          },
        }),
      },
    };
  });
});

jest.mock('aws-sdk', () => {
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => ({
        get: jest.fn().mockImplementation(() => ({
          promise: jest.fn().mockResolvedValue({}),
        })),
        put: jest.fn().mockImplementation(() => ({
          promise: jest.fn().mockResolvedValue({}),
        })),
        update: jest.fn().mockImplementation(() => ({
          promise: jest.fn().mockResolvedValue({}),
        })),
      })),
    },
    Lambda: jest.fn(() => ({
      invoke: jest.fn().mockImplementation(() => ({
        promise: jest.fn().mockResolvedValue({}),
      })),
    })),
  };
});

describe('getPurchaseDetails Lambda Function', () => {
  it('successfully retrieves purchase details and returns a 200 status code', async () => {
    const event = {
      queryStringParameters: {
        sessionId: 'cs_test_123',
      },
    };

    const result = await handler(event as any, {} as any, jest.fn()) as APIGatewayProxyResult;

    expect(result.statusCode).toEqual(200);
    const body = JSON.parse(result.body);
    expect(body.paymentAmount).toEqual('10.00');
    expect(body.transactionId).toEqual('pi_123');
    expect(body.productId).toEqual('prod_123');
    expect(body.productName).toEqual('Test Product');
    expect(body.productPrice).toEqual('10.00');
  });

  it('returns a 400 status code if session ID is missing', async () => {
    const event = {
      queryStringParameters: {},
    };

    const result = await handler(event as any, {} as any, jest.fn()) as APIGatewayProxyResult;

    expect(result.statusCode).toEqual(400);
    const body = JSON.parse(result.body);
    expect(body.error).toEqual('Missing session ID');
  });

});
