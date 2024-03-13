// services/stripeConnect.ts
import { post } from 'aws-amplify/api';

export const generateStripeConnectUrl = async () => {
    try {
        const operation = await post({
        apiName: 'store-api',
        path: '/api/generateStripeConnectUrl',
        });
        const responseData = await operation.response;
        const json = (await responseData.body.json()) as {stripeConnectUrl: string};
        return json.stripeConnectUrl;
    } catch (error) {
        console.error('Error generating Stripe Connect URL:', error);
        throw error;
    }
};

export const retrieveStripeAccountId = async (code: string) => {
    try {
        const operation = await post({
        apiName: 'store-api',
        path: '/api/retrieveStripeAccountId',
        options: {
            headers: {
            'Content-Type': 'application/json',
            },
            body: { code },
        },
        });
        const responseData = await operation.response;
        const json = (await responseData.body.json()) as {stripeAccountId: string};
        return json.stripeAccountId;
    } catch (error) {
        console.error('Error retrieving Stripe account ID:', error);
        throw error;
    }
};