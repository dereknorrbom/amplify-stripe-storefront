import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { createSellerRecord } from './functions/createSellerRecord/resource.js';

defineBackend({
  auth,
  data,
  createSellerRecord,
});
