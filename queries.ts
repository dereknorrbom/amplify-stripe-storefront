/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getProduct = /* GraphQL */ `query GetProduct($id: ID!) {
  getProduct(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetProductQueryVariables,
  APITypes.GetProductQuery
>;
export const getPurchase = /* GraphQL */ `query GetPurchase($id: ID!) {
  getPurchase(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetPurchaseQueryVariables,
  APITypes.GetPurchaseQuery
>;
export const getSeller = /* GraphQL */ `query GetSeller($id: ID!) {
  getSeller(id: $id) {
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
` as GeneratedQuery<APITypes.GetSellerQueryVariables, APITypes.GetSellerQuery>;
export const listProducts = /* GraphQL */ `query ListProducts(
  $filter: ModelProductFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listProducts(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProductsQueryVariables,
  APITypes.ListProductsQuery
>;
export const listPurchases = /* GraphQL */ `query ListPurchases(
  $filter: ModelPurchaseFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listPurchases(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      amount
      buyer
      buyerEmail
      createdAt
      fee
      id
      owner
      purchaseProductId
      stripeChargeId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPurchasesQueryVariables,
  APITypes.ListPurchasesQuery
>;
export const listSellers = /* GraphQL */ `query ListSellers(
  $filter: ModelSellerFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listSellers(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      email
      id
      name
      stripeAccountId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSellersQueryVariables,
  APITypes.ListSellersQuery
>;
