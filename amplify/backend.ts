import { LambdaRestApi, RestApi } from "aws-cdk-lib/aws-apigateway";
import { defineBackend } from '@aws-amplify/backend';
import { Stack } from 'aws-cdk-lib/core';
import { aws_lambda as lambda, aws_apigateway as apigateway, aws_iam as iam } from 'aws-cdk-lib';

import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { createSellerRecord } from './functions/createSellerRecord/resource.js';
import { stripeConnectCallback } from './functions/stripeConnectCallback/resource.js';
import { createCheckoutSession } from './functions/createCheckoutSession/resource.js';
import { retrieveStripeAccountId } from './functions/retrieveStripeAccountId/resource.js';
import { generateStripeConnectUrl } from './functions/generateStripeConnectUrl/resource.js';
import { getPurchaseDetails } from './functions/getPurchaseDetails/resource.js';
import { sendPurchaseEmail } from './functions/sendPurchaseEmail/resource.js';


const backend = defineBackend({
  auth,
  data,
  createSellerRecord,
  stripeConnectCallback,
  createCheckoutSession,
  retrieveStripeAccountId,
  generateStripeConnectUrl,
  getPurchaseDetails,
  sendPurchaseEmail
});

const apiGatewayStack = backend.createStack("apigateway-stack");

// API Gateway Role and Policy Config
const apiGatewayRole = new iam.Role(apiGatewayStack, 'apiGatewayRole',{
  assumedBy: new iam.ServicePrincipal('apigateway.amazonaws.com'),
  managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')]
});

// Create an API Gateway resource
const api = new RestApi(apiGatewayStack, 'store-api', {
  restApiName: `store-api`,
  binaryMediaTypes: ['image/png'],
  deployOptions: {
    loggingLevel: apigateway.MethodLoggingLevel.INFO,
    stageName: 'Prod',
    dataTraceEnabled: true
  }
});

// Web Elements Proxy
const proxy = api.root.addProxy({ anyMethod:false });
const apiResource = api.root.addResource('api');
const sendPurchaseEmailEndpoint = apiResource.addResource('sendPurchaseEmail');
const createCheckoutSessionEndpoint = apiResource.addResource('createCheckoutSession');

const apiPaths = [proxy, apiResource, sendPurchaseEmailEndpoint, createCheckoutSessionEndpoint];

// add cors to all paths
apiPaths.forEach(path => {
  addCorsOptions(path)
});

apiGetMethod( sendPurchaseEmailEndpoint, backend.sendPurchaseEmail.resources.lambda, apiGatewayRole);
apiGetMethod( apiResource, backend.sendPurchaseEmail.resources.lambda, apiGatewayRole);
apiGetMethod( createCheckoutSessionEndpoint, backend.createCheckoutSession.resources.lambda, apiGatewayRole);

export function apiGetMethod(apiResource: apigateway.IResource, lambdaFunction: lambda.IFunction, apiGetRole: iam.IRole) {
  const integrationOptions: apigateway.IntegrationOptions = {
    integrationResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
        'method.response.header.Access-Control-Allow-Origin': "'*'",
        'method.response.header.Access-Control-Allow-Credentials': "'false'",
        'method.response.header.Content-Type': "'application/json'",
      },
    }],
  };

  apiResource.addMethod('GET', new apigateway.LambdaIntegration(lambdaFunction, integrationOptions), {
    methodResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': true,
        'method.response.header.Access-Control-Allow-Origin': true,
        'method.response.header.Access-Control-Allow-Credentials': true,
        'method.response.header.Content-Type': true,
      },
    }],
  });

  apiResource.addMethod('POST', new apigateway.LambdaIntegration(lambdaFunction, integrationOptions), {
    methodResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': true,
        'method.response.header.Access-Control-Allow-Origin': true,
        'method.response.header.Access-Control-Allow-Credentials': true,
        'method.response.header.Content-Type': true,
      },
    }],
  });
}

export function addCorsOptions(apiResource: apigateway.IResource) {
  apiResource.addMethod('OPTIONS', new apigateway.MockIntegration({
    integrationResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
        'method.response.header.Access-Control-Allow-Origin': "'*'",
        'method.response.header.Access-Control-Allow-Credentials': "'false'",
        'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE'",
      },
    }],
    passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
    requestTemplates: {
      "application/json": "{\"statusCode\": 200}"
    },
  }), {
    methodResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': true,
        'method.response.header.Access-Control-Allow-Methods': true,
        'method.response.header.Access-Control-Allow-Credentials': true,
        'method.response.header.Access-Control-Allow-Origin': true,
      },
    }]
  });
}
// patch the custom REST API resource to the expected output configuration
backend.addOutput({
  custom: {
    apiId: api.restApiId,
    apiEndpoint: api.url,
    apiName: api.restApiName,
    apiRegion: Stack.of(apiGatewayStack).region,
  },
});