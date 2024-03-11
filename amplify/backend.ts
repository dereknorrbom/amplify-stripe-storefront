import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { createSellerRecord } from './functions/createSellerRecord/resource.js';
import { stripeConnectCallback } from './functions/stripeConnectCallback/resource.js';
import { createCheckoutSession } from './functions/createCheckoutSession/resource.js';

defineBackend({
  auth,
  data,
  createSellerRecord,
  stripeConnectCallback,
  createCheckoutSession,
});
