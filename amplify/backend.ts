import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { createSellerRecord } from './functions/createSellerRecord/resource.js';
import { stripeConnectCallback } from './functions/stripeConnectCallback/resource.js';
import { createCheckoutSession } from './functions/createCheckoutSession/resource.js';
import { retrieveStripeAccountId } from './functions/retrieveStripeAccountId/resource.js';
import { generateStripeConnectUrl } from './functions/generateStripeConnectUrl/resource.js';

defineBackend({
  auth,
  data,
  createSellerRecord,
  stripeConnectCallback,
  createCheckoutSession,
  retrieveStripeAccountId,
  generateStripeConnectUrl,
});
