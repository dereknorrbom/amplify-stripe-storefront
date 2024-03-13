# Revv Stripe Storefront

This project is an e-commerce application built with AWS Amplify, Next.js, Stripe, and GraphQL. It provides a platform for sellers to connect their Stripe accounts, create and manage products, and receive payments from buyers. The application leverages various AWS services, including Lambda functions, API Gateway, and DynamoDB, to handle server-side logic and data storage.

## Table of Contents
- Prerequisites
- Getting Started
- Architecture Overview
- API Endpoints
- Stripe Integration
- GraphQL Schema
- Deployment
- Contributing
- License

## Prerequisites

Before getting started with the project, ensure you have the following prerequisites installed:

- Node.js
- AWS CLI
- Amplify CLI

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/dereknorrbom/revv-stripe-storefront.git
   ```

2. Change into the project directory:
   ```
   cd revv-stripe-storefront
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Configure your AWS credentials using the AWS CLI:
   ```
   aws configure
   ```

5. Initialize the Amplify project:
   ```
   npx amplify sandbox
   ```

6. Start the development server:
   ```
   npm run dev
   ```

The application should now be running locally at http://localhost:3000.

## Architecture Overview

The Revv Stripe Storefront application follows a serverless architecture, leveraging various AWS services and integrating with Stripe for payment processing. Here's an overview of the main components:

- **Next.js:** The frontend of the application is built using Next.js, a React framework for server-rendered applications. It provides a seamless user experience and handles client-side rendering.

- **AWS Amplify:** Amplify is used as the backend framework, providing a set of tools and services to build and deploy the application. It simplifies the setup and configuration of various AWS services.

- **API Gateway:** The application utilizes API Gateway to create RESTful APIs that interact with Lambda functions. It acts as the entry point for client requests and routes them to the appropriate Lambda functions.

- **Lambda Functions:** The server-side logic is implemented using Lambda functions. These functions handle various tasks, such as creating Stripe Checkout sessions, retrieving purchase details, sending emails, and managing Stripe Connect flows.

- **DynamoDB:** DynamoDB is used as the primary database for storing seller, product, and purchase information. It provides a scalable and flexible NoSQL database solution.

- **Stripe:** The application integrates with Stripe for payment processing. It utilizes Stripe Checkout for a seamless payment experience and Stripe Connect to allow sellers to connect their Stripe accounts and receive payments.

- **GraphQL:** The application uses GraphQL for querying and mutating data related to products, sellers, and purchases. Amplify's GraphQL API simplifies the setup and interaction with the GraphQL backend.

## API Endpoints

The application exposes several API endpoints through API Gateway, each associated with a specific Lambda function:

- `/api/sendPurchaseEmail`: Triggers the `sendPurchaseEmail` Lambda function to send a confirmation email to the buyer after a successful purchase.

- `/api/createCheckoutSession`: Calls the `createCheckoutSession` Lambda function to create a Stripe Checkout session for a specific product.

- `/api/getPurchaseDetails`: Invokes the `getPurchaseDetails` Lambda function to retrieve the details of a purchase based on the provided session ID.

- `/api/stripeConnectCallback`: Handles the callback from Stripe Connect after a seller successfully connects their Stripe account. It triggers the `stripeConnectCallback` Lambda function to update the seller's Stripe account ID in the database.

- `/api/generateStripeConnectUrl`: Calls the `generateStripeConnectUrl` Lambda function to generate a unique URL for initiating the Stripe Connect flow.

- `/api/retrieveStripeAccountId`: Invokes the `retrieveStripeAccountId` Lambda function to retrieve the Stripe account ID associated with a seller based on the provided authorization code.

These endpoints are defined in the API Gateway configuration and mapped to their respective Lambda functions.

## Stripe Integration

The application integrates with Stripe to handle payment processing and seller onboarding. Here are the key aspects of the Stripe integration:

- **Stripe Checkout:** The application uses Stripe Checkout to provide a seamless payment experience for buyers. When a buyer initiates a purchase, a Stripe Checkout session is created using the `createCheckoutSession` Lambda function. The buyer is then redirected to the Stripe Checkout page to complete the payment.

- **Stripe Connect:** Sellers can connect their Stripe accounts to the platform using Stripe Connect. The `generateStripeConnectUrl` Lambda function generates a unique URL for initiating the Stripe Connect flow. After the seller successfully connects their account, the `stripeConnectCallback` Lambda function is triggered to update the seller's Stripe account ID in the database.

- **Payment Processing:** When a buyer completes a payment through Stripe Checkout, the `getPurchaseDetails` Lambda function is invoked to retrieve the purchase details, including the payment amount, transaction ID, and associated product information. The `sendPurchaseEmail` Lambda function is then triggered to send a confirmation email to the buyer.

- **Seller Payouts:** The application supports seller payouts by transferring funds from the buyer to the seller's connected Stripe account. The `createCheckoutSession` Lambda function includes the necessary configuration to split the payment between the platform and the seller, applying a platform fee if applicable.

## GraphQL Schema

The application uses GraphQL to define the schema for the data models and their relationships. The main data models include:

- **Product:** Represents a product listed by a seller. It includes fields such as name, description, price, and the associated seller.

- **Seller:** Represents a seller on the platform. It includes fields such as name, email, and the associated Stripe account ID.

- **Purchase:** Represents a purchase made by a buyer. It includes fields such as the associated product, buyer details, payment amount, transaction ID, and the seller's Stripe account ID.

The GraphQL schema is defined using the Amplify CLI and is automatically generated based on the specified data models and their relationships.

## Deployment

To deploy the application to AWS, follow these steps:

1. Connect your deployment branch to AWS Amplify Gen2 through the AWS Console.

2. Push the changes to your repository.

Amplify will handle the deployment of the frontend and backend resources, including the Next.js application, Lambda functions, API Gateway, and DynamoDB tables.

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute the code for personal or commercial purposes.