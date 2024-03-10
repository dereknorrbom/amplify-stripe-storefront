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
export declare type PurchaseCreateFormInputValues = {
    buyer?: string;
    buyerEmail?: string;
    amount?: number;
    fee?: number;
    stripeChargeId?: string;
    owner?: string;
};
export declare type PurchaseCreateFormValidationValues = {
    buyer?: ValidationFunction<string>;
    buyerEmail?: ValidationFunction<string>;
    amount?: ValidationFunction<number>;
    fee?: ValidationFunction<number>;
    stripeChargeId?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PurchaseCreateFormOverridesProps = {
    PurchaseCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    buyer?: PrimitiveOverrideProps<TextFieldProps>;
    buyerEmail?: PrimitiveOverrideProps<TextFieldProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    fee?: PrimitiveOverrideProps<TextFieldProps>;
    stripeChargeId?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PurchaseCreateFormProps = React.PropsWithChildren<{
    overrides?: PurchaseCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PurchaseCreateFormInputValues) => PurchaseCreateFormInputValues;
    onSuccess?: (fields: PurchaseCreateFormInputValues) => void;
    onError?: (fields: PurchaseCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PurchaseCreateFormInputValues) => PurchaseCreateFormInputValues;
    onValidate?: PurchaseCreateFormValidationValues;
} & React.CSSProperties>;
export default function PurchaseCreateForm(props: PurchaseCreateFormProps): React.ReactElement;
