/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Product = {
  __typename: "Product",
  createdAt: string,
  description?: string | null,
  id: string,
  name?: string | null,
  owner?: string | null,
  price?: number | null,
  productSellerId?: string | null,
  seller?: Seller | null,
  sellerProductsId?: string | null,
  updatedAt: string,
};

export type Seller = {
  __typename: "Seller",
  createdAt?: string | null,
  email?: string | null,
  id: string,
  name?: string | null,
  products?: ModelProductConnection | null,
  stripeAccountId?: string | null,
  updatedAt?: string | null,
};

export type ModelProductConnection = {
  __typename: "ModelProductConnection",
  items:  Array<Product | null >,
  nextToken?: string | null,
};

export type Purchase = {
  __typename: "Purchase",
  amount?: number | null,
  buyer?: string | null,
  buyerEmail?: string | null,
  createdAt?: string | null,
  fee?: number | null,
  id: string,
  owner?: string | null,
  product?: Product | null,
  purchaseProductId?: string | null,
  stripeChargeId?: string | null,
  updatedAt: string,
};

export type ModelProductFilterInput = {
  and?: Array< ModelProductFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelProductFilterInput | null,
  or?: Array< ModelProductFilterInput | null > | null,
  owner?: ModelStringInput | null,
  price?: ModelIntInput | null,
  productSellerId?: ModelIDInput | null,
  sellerProductsId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelPurchaseFilterInput = {
  amount?: ModelIntInput | null,
  and?: Array< ModelPurchaseFilterInput | null > | null,
  buyer?: ModelStringInput | null,
  buyerEmail?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  fee?: ModelIntInput | null,
  id?: ModelIDInput | null,
  not?: ModelPurchaseFilterInput | null,
  or?: Array< ModelPurchaseFilterInput | null > | null,
  owner?: ModelStringInput | null,
  purchaseProductId?: ModelIDInput | null,
  stripeChargeId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelPurchaseConnection = {
  __typename: "ModelPurchaseConnection",
  items:  Array<Purchase | null >,
  nextToken?: string | null,
};

export type ModelSellerFilterInput = {
  and?: Array< ModelSellerFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelSellerFilterInput | null,
  or?: Array< ModelSellerFilterInput | null > | null,
  stripeAccountId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelSellerConnection = {
  __typename: "ModelSellerConnection",
  items:  Array<Seller | null >,
  nextToken?: string | null,
};

export type ModelProductConditionInput = {
  and?: Array< ModelProductConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelProductConditionInput | null,
  or?: Array< ModelProductConditionInput | null > | null,
  owner?: ModelStringInput | null,
  price?: ModelIntInput | null,
  productSellerId?: ModelIDInput | null,
  sellerProductsId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateProductInput = {
  createdAt?: string | null,
  description?: string | null,
  id?: string | null,
  name?: string | null,
  owner?: string | null,
  price?: number | null,
  productSellerId?: string | null,
  sellerProductsId?: string | null,
  updatedAt?: string | null,
};

export type ModelPurchaseConditionInput = {
  amount?: ModelIntInput | null,
  and?: Array< ModelPurchaseConditionInput | null > | null,
  buyer?: ModelStringInput | null,
  buyerEmail?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  fee?: ModelIntInput | null,
  not?: ModelPurchaseConditionInput | null,
  or?: Array< ModelPurchaseConditionInput | null > | null,
  owner?: ModelStringInput | null,
  purchaseProductId?: ModelIDInput | null,
  stripeChargeId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreatePurchaseInput = {
  amount?: number | null,
  buyer?: string | null,
  buyerEmail?: string | null,
  createdAt?: string | null,
  fee?: number | null,
  id?: string | null,
  owner?: string | null,
  purchaseProductId?: string | null,
  stripeChargeId?: string | null,
  updatedAt?: string | null,
};

export type ModelSellerConditionInput = {
  and?: Array< ModelSellerConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelSellerConditionInput | null,
  or?: Array< ModelSellerConditionInput | null > | null,
  stripeAccountId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateSellerInput = {
  createdAt?: string | null,
  email?: string | null,
  id?: string | null,
  name?: string | null,
  stripeAccountId?: string | null,
  updatedAt?: string | null,
};

export type DeleteProductInput = {
  id: string,
};

export type DeletePurchaseInput = {
  id: string,
};

export type DeleteSellerInput = {
  id: string,
};

export type UpdateProductInput = {
  createdAt?: string | null,
  description?: string | null,
  id: string,
  name?: string | null,
  owner?: string | null,
  price?: number | null,
  productSellerId?: string | null,
  sellerProductsId?: string | null,
  updatedAt?: string | null,
};

export type UpdatePurchaseInput = {
  amount?: number | null,
  buyer?: string | null,
  buyerEmail?: string | null,
  createdAt?: string | null,
  fee?: number | null,
  id: string,
  owner?: string | null,
  purchaseProductId?: string | null,
  stripeChargeId?: string | null,
  updatedAt?: string | null,
};

export type UpdateSellerInput = {
  createdAt?: string | null,
  email?: string | null,
  id: string,
  name?: string | null,
  stripeAccountId?: string | null,
  updatedAt?: string | null,
};

export type ModelSubscriptionProductFilterInput = {
  and?: Array< ModelSubscriptionProductFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionProductFilterInput | null > | null,
  owner?: ModelStringInput | null,
  price?: ModelSubscriptionIntInput | null,
  productSellerId?: ModelSubscriptionIDInput | null,
  sellerProductsId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionPurchaseFilterInput = {
  amount?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionPurchaseFilterInput | null > | null,
  buyer?: ModelSubscriptionStringInput | null,
  buyerEmail?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  fee?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionPurchaseFilterInput | null > | null,
  owner?: ModelStringInput | null,
  purchaseProductId?: ModelSubscriptionIDInput | null,
  stripeChargeId?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionSellerFilterInput = {
  and?: Array< ModelSubscriptionSellerFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionSellerFilterInput | null > | null,
  sellerProductsId?: ModelSubscriptionIDInput | null,
  stripeAccountId?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type GetProductQueryVariables = {
  id: string,
};

export type GetProductQuery = {
  getProduct?:  {
    __typename: "Product",
    createdAt: string,
    description?: string | null,
    id: string,
    name?: string | null,
    owner?: string | null,
    price?: number | null,
    productSellerId?: string | null,
    seller?:  {
      __typename: "Seller",
      createdAt?: string | null,
      email?: string | null,
      id: string,
      name?: string | null,
      stripeAccountId?: string | null,
      updatedAt?: string | null,
    } | null,
    sellerProductsId?: string | null,
    updatedAt: string,
  } | null,
};

export type GetPurchaseQueryVariables = {
  id: string,
};

export type GetPurchaseQuery = {
  getPurchase?:  {
    __typename: "Purchase",
    amount?: number | null,
    buyer?: string | null,
    buyerEmail?: string | null,
    createdAt?: string | null,
    fee?: number | null,
    id: string,
    owner?: string | null,
    product?:  {
      __typename: "Product",
      createdAt: string,
      description?: string | null,
      id: string,
      name?: string | null,
      owner?: string | null,
      price?: number | null,
      productSellerId?: string | null,
      sellerProductsId?: string | null,
      updatedAt: string,
    } | null,
    purchaseProductId?: string | null,
    stripeChargeId?: string | null,
    updatedAt: string,
  } | null,
};

export type GetSellerQueryVariables = {
  id: string,
};

export type GetSellerQuery = {
  getSeller?:  {
    __typename: "Seller",
    createdAt?: string | null,
    email?: string | null,
    id: string,
    name?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    stripeAccountId?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type ListProductsQueryVariables = {
  filter?: ModelProductFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListProductsQuery = {
  listProducts?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      createdAt: string,
      description?: string | null,
      id: string,
      name?: string | null,
      owner?: string | null,
      price?: number | null,
      productSellerId?: string | null,
      sellerProductsId?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPurchasesQueryVariables = {
  filter?: ModelPurchaseFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPurchasesQuery = {
  listPurchases?:  {
    __typename: "ModelPurchaseConnection",
    items:  Array< {
      __typename: "Purchase",
      amount?: number | null,
      buyer?: string | null,
      buyerEmail?: string | null,
      createdAt?: string | null,
      fee?: number | null,
      id: string,
      owner?: string | null,
      purchaseProductId?: string | null,
      stripeChargeId?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSellersQueryVariables = {
  filter?: ModelSellerFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListSellersQuery = {
  listSellers?:  {
    __typename: "ModelSellerConnection",
    items:  Array< {
      __typename: "Seller",
      createdAt?: string | null,
      email?: string | null,
      id: string,
      name?: string | null,
      stripeAccountId?: string | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateProductMutationVariables = {
  condition?: ModelProductConditionInput | null,
  input: CreateProductInput,
};

export type CreateProductMutation = {
  createProduct?:  {
    __typename: "Product",
    createdAt: string,
    description?: string | null,
    id: string,
    name?: string | null,
    owner?: string | null,
    price?: number | null,
    productSellerId?: string | null,
    seller?:  {
      __typename: "Seller",
      createdAt?: string | null,
      email?: string | null,
      id: string,
      name?: string | null,
      stripeAccountId?: string | null,
      updatedAt?: string | null,
    } | null,
    sellerProductsId?: string | null,
    updatedAt: string,
  } | null,
};

export type CreatePurchaseMutationVariables = {
  condition?: ModelPurchaseConditionInput | null,
  input: CreatePurchaseInput,
};

export type CreatePurchaseMutation = {
  createPurchase?:  {
    __typename: "Purchase",
    amount?: number | null,
    buyer?: string | null,
    buyerEmail?: string | null,
    createdAt?: string | null,
    fee?: number | null,
    id: string,
    owner?: string | null,
    product?:  {
      __typename: "Product",
      createdAt: string,
      description?: string | null,
      id: string,
      name?: string | null,
      owner?: string | null,
      price?: number | null,
      productSellerId?: string | null,
      sellerProductsId?: string | null,
      updatedAt: string,
    } | null,
    purchaseProductId?: string | null,
    stripeChargeId?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateSellerMutationVariables = {
  condition?: ModelSellerConditionInput | null,
  input: CreateSellerInput,
};

export type CreateSellerMutation = {
  createSeller?:  {
    __typename: "Seller",
    createdAt?: string | null,
    email?: string | null,
    id: string,
    name?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    stripeAccountId?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type DeleteProductMutationVariables = {
  condition?: ModelProductConditionInput | null,
  input: DeleteProductInput,
};

export type DeleteProductMutation = {
  deleteProduct?:  {
    __typename: "Product",
    createdAt: string,
    description?: string | null,
    id: string,
    name?: string | null,
    owner?: string | null,
    price?: number | null,
    productSellerId?: string | null,
    seller?:  {
      __typename: "Seller",
      createdAt?: string | null,
      email?: string | null,
      id: string,
      name?: string | null,
      stripeAccountId?: string | null,
      updatedAt?: string | null,
    } | null,
    sellerProductsId?: string | null,
    updatedAt: string,
  } | null,
};

export type DeletePurchaseMutationVariables = {
  condition?: ModelPurchaseConditionInput | null,
  input: DeletePurchaseInput,
};

export type DeletePurchaseMutation = {
  deletePurchase?:  {
    __typename: "Purchase",
    amount?: number | null,
    buyer?: string | null,
    buyerEmail?: string | null,
    createdAt?: string | null,
    fee?: number | null,
    id: string,
    owner?: string | null,
    product?:  {
      __typename: "Product",
      createdAt: string,
      description?: string | null,
      id: string,
      name?: string | null,
      owner?: string | null,
      price?: number | null,
      productSellerId?: string | null,
      sellerProductsId?: string | null,
      updatedAt: string,
    } | null,
    purchaseProductId?: string | null,
    stripeChargeId?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteSellerMutationVariables = {
  condition?: ModelSellerConditionInput | null,
  input: DeleteSellerInput,
};

export type DeleteSellerMutation = {
  deleteSeller?:  {
    __typename: "Seller",
    createdAt?: string | null,
    email?: string | null,
    id: string,
    name?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    stripeAccountId?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdateProductMutationVariables = {
  condition?: ModelProductConditionInput | null,
  input: UpdateProductInput,
};

export type UpdateProductMutation = {
  updateProduct?:  {
    __typename: "Product",
    createdAt: string,
    description?: string | null,
    id: string,
    name?: string | null,
    owner?: string | null,
    price?: number | null,
    productSellerId?: string | null,
    seller?:  {
      __typename: "Seller",
      createdAt?: string | null,
      email?: string | null,
      id: string,
      name?: string | null,
      stripeAccountId?: string | null,
      updatedAt?: string | null,
    } | null,
    sellerProductsId?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdatePurchaseMutationVariables = {
  condition?: ModelPurchaseConditionInput | null,
  input: UpdatePurchaseInput,
};

export type UpdatePurchaseMutation = {
  updatePurchase?:  {
    __typename: "Purchase",
    amount?: number | null,
    buyer?: string | null,
    buyerEmail?: string | null,
    createdAt?: string | null,
    fee?: number | null,
    id: string,
    owner?: string | null,
    product?:  {
      __typename: "Product",
      createdAt: string,
      description?: string | null,
      id: string,
      name?: string | null,
      owner?: string | null,
      price?: number | null,
      productSellerId?: string | null,
      sellerProductsId?: string | null,
      updatedAt: string,
    } | null,
    purchaseProductId?: string | null,
    stripeChargeId?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateSellerMutationVariables = {
  condition?: ModelSellerConditionInput | null,
  input: UpdateSellerInput,
};

export type UpdateSellerMutation = {
  updateSeller?:  {
    __typename: "Seller",
    createdAt?: string | null,
    email?: string | null,
    id: string,
    name?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    stripeAccountId?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
  owner?: string | null,
};

export type OnCreateProductSubscription = {
  onCreateProduct?:  {
    __typename: "Product",
    createdAt: string,
    description?: string | null,
    id: string,
    name?: string | null,
    owner?: string | null,
    price?: number | null,
    productSellerId?: string | null,
    seller?:  {
      __typename: "Seller",
      createdAt?: string | null,
      email?: string | null,
      id: string,
      name?: string | null,
      stripeAccountId?: string | null,
      updatedAt?: string | null,
    } | null,
    sellerProductsId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreatePurchaseSubscriptionVariables = {
  filter?: ModelSubscriptionPurchaseFilterInput | null,
  owner?: string | null,
};

export type OnCreatePurchaseSubscription = {
  onCreatePurchase?:  {
    __typename: "Purchase",
    amount?: number | null,
    buyer?: string | null,
    buyerEmail?: string | null,
    createdAt?: string | null,
    fee?: number | null,
    id: string,
    owner?: string | null,
    product?:  {
      __typename: "Product",
      createdAt: string,
      description?: string | null,
      id: string,
      name?: string | null,
      owner?: string | null,
      price?: number | null,
      productSellerId?: string | null,
      sellerProductsId?: string | null,
      updatedAt: string,
    } | null,
    purchaseProductId?: string | null,
    stripeChargeId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateSellerSubscriptionVariables = {
  filter?: ModelSubscriptionSellerFilterInput | null,
};

export type OnCreateSellerSubscription = {
  onCreateSeller?:  {
    __typename: "Seller",
    createdAt?: string | null,
    email?: string | null,
    id: string,
    name?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    stripeAccountId?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
  owner?: string | null,
};

export type OnDeleteProductSubscription = {
  onDeleteProduct?:  {
    __typename: "Product",
    createdAt: string,
    description?: string | null,
    id: string,
    name?: string | null,
    owner?: string | null,
    price?: number | null,
    productSellerId?: string | null,
    seller?:  {
      __typename: "Seller",
      createdAt?: string | null,
      email?: string | null,
      id: string,
      name?: string | null,
      stripeAccountId?: string | null,
      updatedAt?: string | null,
    } | null,
    sellerProductsId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeletePurchaseSubscriptionVariables = {
  filter?: ModelSubscriptionPurchaseFilterInput | null,
  owner?: string | null,
};

export type OnDeletePurchaseSubscription = {
  onDeletePurchase?:  {
    __typename: "Purchase",
    amount?: number | null,
    buyer?: string | null,
    buyerEmail?: string | null,
    createdAt?: string | null,
    fee?: number | null,
    id: string,
    owner?: string | null,
    product?:  {
      __typename: "Product",
      createdAt: string,
      description?: string | null,
      id: string,
      name?: string | null,
      owner?: string | null,
      price?: number | null,
      productSellerId?: string | null,
      sellerProductsId?: string | null,
      updatedAt: string,
    } | null,
    purchaseProductId?: string | null,
    stripeChargeId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteSellerSubscriptionVariables = {
  filter?: ModelSubscriptionSellerFilterInput | null,
};

export type OnDeleteSellerSubscription = {
  onDeleteSeller?:  {
    __typename: "Seller",
    createdAt?: string | null,
    email?: string | null,
    id: string,
    name?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    stripeAccountId?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
  owner?: string | null,
};

export type OnUpdateProductSubscription = {
  onUpdateProduct?:  {
    __typename: "Product",
    createdAt: string,
    description?: string | null,
    id: string,
    name?: string | null,
    owner?: string | null,
    price?: number | null,
    productSellerId?: string | null,
    seller?:  {
      __typename: "Seller",
      createdAt?: string | null,
      email?: string | null,
      id: string,
      name?: string | null,
      stripeAccountId?: string | null,
      updatedAt?: string | null,
    } | null,
    sellerProductsId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdatePurchaseSubscriptionVariables = {
  filter?: ModelSubscriptionPurchaseFilterInput | null,
  owner?: string | null,
};

export type OnUpdatePurchaseSubscription = {
  onUpdatePurchase?:  {
    __typename: "Purchase",
    amount?: number | null,
    buyer?: string | null,
    buyerEmail?: string | null,
    createdAt?: string | null,
    fee?: number | null,
    id: string,
    owner?: string | null,
    product?:  {
      __typename: "Product",
      createdAt: string,
      description?: string | null,
      id: string,
      name?: string | null,
      owner?: string | null,
      price?: number | null,
      productSellerId?: string | null,
      sellerProductsId?: string | null,
      updatedAt: string,
    } | null,
    purchaseProductId?: string | null,
    stripeChargeId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateSellerSubscriptionVariables = {
  filter?: ModelSubscriptionSellerFilterInput | null,
};

export type OnUpdateSellerSubscription = {
  onUpdateSeller?:  {
    __typename: "Seller",
    createdAt?: string | null,
    email?: string | null,
    id: string,
    name?: string | null,
    products?:  {
      __typename: "ModelProductConnection",
      nextToken?: string | null,
    } | null,
    stripeAccountId?: string | null,
    updatedAt?: string | null,
  } | null,
};
