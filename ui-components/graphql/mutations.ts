/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $condition: ModelProductConditionInput
    $input: CreateProductInput!
  ) {
    createProduct(condition: $condition, input: $input) {
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
export const createPurchase = /* GraphQL */ `
  mutation CreatePurchase(
    $condition: ModelPurchaseConditionInput
    $input: CreatePurchaseInput!
  ) {
    createPurchase(condition: $condition, input: $input) {
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
export const createSeller = /* GraphQL */ `
  mutation CreateSeller(
    $condition: ModelSellerConditionInput
    $input: CreateSellerInput!
  ) {
    createSeller(condition: $condition, input: $input) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $condition: ModelProductConditionInput
    $input: DeleteProductInput!
  ) {
    deleteProduct(condition: $condition, input: $input) {
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
export const deletePurchase = /* GraphQL */ `
  mutation DeletePurchase(
    $condition: ModelPurchaseConditionInput
    $input: DeletePurchaseInput!
  ) {
    deletePurchase(condition: $condition, input: $input) {
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
export const deleteSeller = /* GraphQL */ `
  mutation DeleteSeller(
    $condition: ModelSellerConditionInput
    $input: DeleteSellerInput!
  ) {
    deleteSeller(condition: $condition, input: $input) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $condition: ModelProductConditionInput
    $input: UpdateProductInput!
  ) {
    updateProduct(condition: $condition, input: $input) {
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
export const updatePurchase = /* GraphQL */ `
  mutation UpdatePurchase(
    $condition: ModelPurchaseConditionInput
    $input: UpdatePurchaseInput!
  ) {
    updatePurchase(condition: $condition, input: $input) {
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
export const updateSeller = /* GraphQL */ `
  mutation UpdateSeller(
    $condition: ModelSellerConditionInput
    $input: UpdateSellerInput!
  ) {
    updateSeller(condition: $condition, input: $input) {
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
