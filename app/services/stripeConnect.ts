// lib/stripeConnect.ts
export const generateStripeConnectUrl = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_GENERATE_STRIPE_CONNECT_URL!);
    const { stripeConnectUrl } = await response.json();
    return stripeConnectUrl;
};

export const retrieveStripeAccountId = async (code: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_RETRIEVE_STRIPE_ACCOUNT_ID_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
    });
    const { stripeAccountId } = await response.json();
    return stripeAccountId;
};