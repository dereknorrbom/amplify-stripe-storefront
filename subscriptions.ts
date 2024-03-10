/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateProduct = /* GraphQL */ `subscription OnCreateProduct(
  $filter: ModelSubscriptionProductFilterInput
  $owner: String
) {
  onCreateProduct(filter: $filter, owner: $owner) {
    createdAt
    description
    id
    name
    owner
    price
    productSellerId
    seller {
      createdAt
      email
      id
      name
      stripeAccountId
      updatedAt
      __typename
    }
    sellerProductsId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateProductSubscriptionVariables,
  APITypes.OnCreateProductSubscription
>;
export const onCreatePurchase = /* GraphQL */ `subscription OnCreatePurchase(
  $filter: ModelSubscriptionPurchaseFilterInput
  $owner: String
) {
  onCreatePurchase(filter: $filter, owner: $owner) {
    amount
    buyer
    buyerEmail
    createdAt
    fee
    id
    owner
    product {
      createdAt
      description
      id
      name
      owner
      price
      productSellerId
      sellerProductsId
      updatedAt
      __typename
    }
    purchaseProductId
    stripeChargeId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePurchaseSubscriptionVariables,
  APITypes.OnCreatePurchaseSubscription
>;
export const onCreateSeller = /* GraphQL */ `subscription OnCreateSeller($filter: ModelSubscriptionSellerFilterInput) {
  onCreateSeller(filter: $filter) {
    createdAt
    email
    id
    name
    products {
      nextToken
      __typename
    }
    stripeAccountId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateSellerSubscriptionVariables,
  APITypes.OnCreateSellerSubscription
>;
export const onDeleteProduct = /* GraphQL */ `subscription OnDeleteProduct(
  $filter: ModelSubscriptionProductFilterInput
  $owner: String
) {
  onDeleteProduct(filter: $filter, owner: $owner) {
    createdAt
    description
    id
    name
    owner
    price
    productSellerId
    seller {
      createdAt
      email
      id
      name
      stripeAccountId
      updatedAt
      __typename
    }
    sellerProductsId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteProductSubscriptionVariables,
  APITypes.OnDeleteProductSubscription
>;
export const onDeletePurchase = /* GraphQL */ `subscription OnDeletePurchase(
  $filter: ModelSubscriptionPurchaseFilterInput
  $owner: String
) {
  onDeletePurchase(filter: $filter, owner: $owner) {
    amount
    buyer
    buyerEmail
    createdAt
    fee
    id
    owner
    product {
      createdAt
      description
      id
      name
      owner
      price
      productSellerId
      sellerProductsId
      updatedAt
      __typename
    }
    purchaseProductId
    stripeChargeId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePurchaseSubscriptionVariables,
  APITypes.OnDeletePurchaseSubscription
>;
export const onDeleteSeller = /* GraphQL */ `subscription OnDeleteSeller($filter: ModelSubscriptionSellerFilterInput) {
  onDeleteSeller(filter: $filter) {
    createdAt
    email
    id
    name
    products {
      nextToken
      __typename
    }
    stripeAccountId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteSellerSubscriptionVariables,
  APITypes.OnDeleteSellerSubscription
>;
export const onUpdateProduct = /* GraphQL */ `subscription OnUpdateProduct(
  $filter: ModelSubscriptionProductFilterInput
  $owner: String
) {
  onUpdateProduct(filter: $filter, owner: $owner) {
    createdAt
    description
    id
    name
    owner
    price
    productSellerId
    seller {
      createdAt
      email
      id
      name
      stripeAccountId
      updatedAt
      __typename
    }
    sellerProductsId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateProductSubscriptionVariables,
  APITypes.OnUpdateProductSubscription
>;
export const onUpdatePurchase = /* GraphQL */ `subscription OnUpdatePurchase(
  $filter: ModelSubscriptionPurchaseFilterInput
  $owner: String
) {
  onUpdatePurchase(filter: $filter, owner: $owner) {
    amount
    buyer
    buyerEmail
    createdAt
    fee
    id
    owner
    product {
      createdAt
      description
      id
      name
      owner
      price
      productSellerId
      sellerProductsId
      updatedAt
      __typename
    }
    purchaseProductId
    stripeChargeId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePurchaseSubscriptionVariables,
  APITypes.OnUpdatePurchaseSubscription
>;
export const onUpdateSeller = /* GraphQL */ `subscription OnUpdateSeller($filter: ModelSubscriptionSellerFilterInput) {
  onUpdateSeller(filter: $filter) {
    createdAt
    email
    id
    name
    products {
      nextToken
      __typename
    }
    stripeAccountId
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateSellerSubscriptionVariables,
  APITypes.OnUpdateSellerSubscription
>;
