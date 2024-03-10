import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type SellerCreateFormInputValues = {
    name?: string;
    email?: string;
    stripeAccountId?: string;
};
export declare type SellerCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    stripeAccountId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SellerCreateFormOverridesProps = {
    SellerCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    stripeAccountId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SellerCreateFormProps = React.PropsWithChildren<{
    overrides?: SellerCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SellerCreateFormInputValues) => SellerCreateFormInputValues;
    onSuccess?: (fields: SellerCreateFormInputValues) => void;
    onError?: (fields: SellerCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SellerCreateFormInputValues) => SellerCreateFormInputValues;
    onValidate?: SellerCreateFormValidationValues;
} & React.CSSProperties>;
export default function SellerCreateForm(props: SellerCreateFormProps): React.ReactElement;
