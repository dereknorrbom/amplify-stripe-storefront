import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Product: a
    .model({
      name: a.string(),
      description: a.string(),
      price: a.integer(),
      seller: a.hasOne('Seller')
    })
    .authorization([
      a.allow.owner(), // Allow any authenticated user to create a product
      a.allow.public().to(['read']) // Allow public read access to products
    ]),
  
  Seller: a
    .model({
      name: a.string(),
      email: a.string(),
      stripeAccountId: a.string(),
      products: a.hasMany('Product'),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization([a.allow.public()]), // Allow public access for all operations
  
  Purchase: a
    .model({
      product: a.hasOne('Product'),
      buyer: a.string(),
      buyerEmail: a.string(),
      amount: a.integer(),
      fee: a.integer(),
      stripeChargeId: a.string(),
      createdAt: a.datetime(),
    })
    .authorization([a.allow.owner().to(['read']), a.allow.private().to(['create'])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
