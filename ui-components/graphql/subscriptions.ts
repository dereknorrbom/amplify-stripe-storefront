/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct(
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
`;
export const onCreatePurchase = /* GraphQL */ `
  subscription OnCreatePurchase(
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
`;
export const onCreateSeller = /* GraphQL */ `
  subscription OnCreateSeller($filter: ModelSubscriptionSellerFilterInput) {
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
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct(
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
`;
export const onDeletePurchase = /* GraphQL */ `
  subscription OnDeletePurchase(
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
`;
export const onDeleteSeller = /* GraphQL */ `
  subscription OnDeleteSeller($filter: ModelSubscriptionSellerFilterInput) {
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
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct(
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
`;
export const onUpdatePurchase = /* GraphQL */ `
  subscription OnUpdatePurchase(
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
`;
export const onUpdateSeller = /* GraphQL */ `
  subscription OnUpdateSeller($filter: ModelSubscriptionSellerFilterInput) {
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
`;
