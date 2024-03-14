// services/stripeConnect.ts
import { post } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';
import config from '@/amplifyconfiguration.json';
Amplify.configure(config); // <=== Initialize Amplify with the exports config
const existingConfig = Amplify.getConfig(); // <=== the initialized config should now be returned to existingConfig

Amplify.configure({
    ...existingConfig,
    API: {
        ...existingConfig.API,
        REST: {
        [config.custom.apiName]: {
            endpoint: config.custom.apiEndpoint,
            region: config.custom.apiRegion,
        },
        },
    },
}, { ssr: true });

console.log('apiName stripe-connect: ', config.custom.apiName);

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