// app/api/stripe/callback/route.ts
import { Amplify } from 'aws-amplify';
import { NextRequest, NextResponse } from 'next/server';
import { retrieveStripeAccountId } from '@/app/services/stripeConnect';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '@/amplify/data/resource';
import { runWithAmplifyServerContext } from '@/utils/amplifyServerUtils';

import config from '@/amplifyconfiguration.json';
Amplify.configure(config, { ssr: true });

const client = generateClient<Schema>();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const username = searchParams.get('state');

  if (!code || !username) {
    return NextResponse.json(
      { error: 'Invalid authorization code or username' },
      { status: 400 }
    );
  }

  try {
    const stripeAccountId = await retrieveStripeAccountId(code);
    console.log('Stripe Account ID:', stripeAccountId);

    const seller = await runWithAmplifyServerContext({
      nextServerContext: { request: req, response: NextResponse },
      operation: async () => {
        const { data } = await client.models.Seller.get({ id: username });
        return data;
      },
    });

    console.log('Retrieved seller:', seller);

    if (seller) {
      const updatedSeller = await runWithAmplifyServerContext({
        nextServerContext: { request: req, response: NextResponse },
        operation: async () => {
          const { data } = await client.models.Seller.update({
            id: seller.id,
            stripeAccountId,
          });
          return data;
        },
      });

      console.log('Updated seller:', updatedSeller);
    } else {
      console.error('Seller not found');
    }

    return NextResponse.redirect('/dashboard');
  } catch (error) {
    console.error('Error retrieving Stripe account ID:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve Stripe account ID' },
      { status: 500 }
    );
  }
}