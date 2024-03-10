import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Seller } from "./graphql/types";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SellerUpdateFormInputValues = {
    name?: string;
    email?: string;
    stripeAccountId?: string;
};
export declare type SellerUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    stripeAccountId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SellerUpdateFormOverridesProps = {
    SellerUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    stripeAccountId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SellerUpdateFormProps = React.PropsWithChildren<{
    overrides?: SellerUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    seller?: Seller;
    onSubmit?: (fields: SellerUpdateFormInputValues) => SellerUpdateFormInputValues;
    onSuccess?: (fields: SellerUpdateFormInputValues) => void;
    onError?: (fields: SellerUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SellerUpdateFormInputValues) => SellerUpdateFormInputValues;
    onValidate?: SellerUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SellerUpdateForm(props: SellerUpdateFormProps): React.ReactElement;
