// services/stripeConnect.ts
const GENERATE_STRIPE_CONNECT_URL_LAMBDA = process.env.NEXT_PUBLIC_GENERATE_STRIPE_CONNECT_URL!;
const RETRIEVE_STRIPE_ACCOUNT_ID_LAMBDA = process.env.NEXT_PUBLIC_RETRIEVE_STRIPE_ACCOUNT_ID_URL!;

export const generateStripeConnectUrl = async () => {
    try {
        const response = await fetch(GENERATE_STRIPE_CONNECT_URL_LAMBDA, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        return json.stripeConnectUrl;
    } catch (error) {
        console.error('Error generating Stripe Connect URL:', error);
        throw error;
    }
};

export const retrieveStripeAccountId = async (code: string) => {
    try {
        const response = await fetch(RETRIEVE_STRIPE_ACCOUNT_ID_LAMBDA, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        return json.stripeAccountId;
    } catch (error) {
        console.error('Error retrieving Stripe account ID:', error);
        throw error;
    }
};