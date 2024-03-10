import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Purchase } from "./graphql/types";
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
export declare type PurchaseUpdateFormInputValues = {
    buyer?: string;
    buyerEmail?: string;
    amount?: number;
    fee?: number;
    stripeChargeId?: string;
    owner?: string;
};
export declare type PurchaseUpdateFormValidationValues = {
    buyer?: ValidationFunction<string>;
    buyerEmail?: ValidationFunction<string>;
    amount?: ValidationFunction<number>;
    fee?: ValidationFunction<number>;
    stripeChargeId?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PurchaseUpdateFormOverridesProps = {
    PurchaseUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    buyer?: PrimitiveOverrideProps<TextFieldProps>;
    buyerEmail?: PrimitiveOverrideProps<TextFieldProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    fee?: PrimitiveOverrideProps<TextFieldProps>;
    stripeChargeId?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PurchaseUpdateFormProps = React.PropsWithChildren<{
    overrides?: PurchaseUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    purchase?: Purchase;
    onSubmit?: (fields: PurchaseUpdateFormInputValues) => PurchaseUpdateFormInputValues;
    onSuccess?: (fields: PurchaseUpdateFormInputValues) => void;
    onError?: (fields: PurchaseUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PurchaseUpdateFormInputValues) => PurchaseUpdateFormInputValues;
    onValidate?: PurchaseUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PurchaseUpdateForm(props: PurchaseUpdateFormProps): React.ReactElement;
