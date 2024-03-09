/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePurchase = /* GraphQL */ `
  subscription OnCreatePurchase(
    $filter: ModelSubscriptionPurchaseFilterInput
    $owner: String
  ) {
    onCreatePurchase(filter: $filter, owner: $owner) {
      id
      productId
      product {
        id
        name
        description
        price
        sellerId
        createdAt
        updatedAt
        owner
        __typename
      }
      buyer
      buyerEmail
      amount
      fee
      stripeChargeId
      createdAt
      updatedAt
      owner
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
      id
      productId
      product {
        id
        name
        description
        price
        sellerId
        createdAt
        updatedAt
        owner
        __typename
      }
      buyer
      buyerEmail
      amount
      fee
      stripeChargeId
      createdAt
      updatedAt
      owner
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
      id
      productId
      product {
        id
        name
        description
        price
        sellerId
        createdAt
        updatedAt
        owner
        __typename
      }
      buyer
      buyerEmail
      amount
      fee
      stripeChargeId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
    onCreateProduct(filter: $filter) {
      id
      name
      description
      price
      sellerId
      seller {
        id
        name
        email
        stripeAccountId
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
    onUpdateProduct(filter: $filter) {
      id
      name
      description
      price
      sellerId
      seller {
        id
        name
        email
        stripeAccountId
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
    onDeleteProduct(filter: $filter) {
      id
      name
      description
      price
      sellerId
      seller {
        id
        name
        email
        stripeAccountId
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateSeller = /* GraphQL */ `
  subscription OnCreateSeller($filter: ModelSubscriptionSellerFilterInput) {
    onCreateSeller(filter: $filter) {
      id
      name
      email
      stripeAccountId
      products {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateSeller = /* GraphQL */ `
  subscription OnUpdateSeller($filter: ModelSubscriptionSellerFilterInput) {
    onUpdateSeller(filter: $filter) {
      id
      name
      email
      stripeAccountId
      products {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteSeller = /* GraphQL */ `
  subscription OnDeleteSeller($filter: ModelSubscriptionSellerFilterInput) {
    onDeleteSeller(filter: $filter) {
      id
      name
      email
      stripeAccountId
      products {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
