/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createPurchase } from "./graphql/mutations";
const client = generateClient();
export default function PurchaseCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    buyer: "",
    buyerEmail: "",
    amount: "",
    fee: "",
    stripeChargeId: "",
    owner: "",
  };
  const [buyer, setBuyer] = React.useState(initialValues.buyer);
  const [buyerEmail, setBuyerEmail] = React.useState(initialValues.buyerEmail);
  const [amount, setAmount] = React.useState(initialValues.amount);
  const [fee, setFee] = React.useState(initialValues.fee);
  const [stripeChargeId, setStripeChargeId] = React.useState(
    initialValues.stripeChargeId
  );
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setBuyer(initialValues.buyer);
    setBuyerEmail(initialValues.buyerEmail);
    setAmount(initialValues.amount);
    setFee(initialValues.fee);
    setStripeChargeId(initialValues.stripeChargeId);
    setOwner(initialValues.owner);
    setErrors({});
  };
  const validations = {
    buyer: [],
    buyerEmail: [],
    amount: [],
    fee: [],
    stripeChargeId: [],
    owner: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          buyer,
          buyerEmail,
          amount,
          fee,
          stripeChargeId,
          owner,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createPurchase.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PurchaseCreateForm")}
      {...rest}
    >
      <TextField
        label="Buyer"
        isRequired={false}
        isReadOnly={false}
        value={buyer}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              buyer: value,
              buyerEmail,
              amount,
              fee,
              stripeChargeId,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.buyer ?? value;
          }
          if (errors.buyer?.hasError) {
            runValidationTasks("buyer", value);
          }
          setBuyer(value);
        }}
        onBlur={() => runValidationTasks("buyer", buyer)}
        errorMessage={errors.buyer?.errorMessage}
        hasError={errors.buyer?.hasError}
        {...getOverrideProps(overrides, "buyer")}
      ></TextField>
      <TextField
        label="Buyer email"
        isRequired={false}
        isReadOnly={false}
        value={buyerEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              buyer,
              buyerEmail: value,
              amount,
              fee,
              stripeChargeId,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.buyerEmail ?? value;
          }
          if (errors.buyerEmail?.hasError) {
            runValidationTasks("buyerEmail", value);
          }
          setBuyerEmail(value);
        }}
        onBlur={() => runValidationTasks("buyerEmail", buyerEmail)}
        errorMessage={errors.buyerEmail?.errorMessage}
        hasError={errors.buyerEmail?.hasError}
        {...getOverrideProps(overrides, "buyerEmail")}
      ></TextField>
      <TextField
        label="Amount"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={amount}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              buyer,
              buyerEmail,
              amount: value,
              fee,
              stripeChargeId,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.amount ?? value;
          }
          if (errors.amount?.hasError) {
            runValidationTasks("amount", value);
          }
          setAmount(value);
        }}
        onBlur={() => runValidationTasks("amount", amount)}
        errorMessage={errors.amount?.errorMessage}
        hasError={errors.amount?.hasError}
        {...getOverrideProps(overrides, "amount")}
      ></TextField>
      <TextField
        label="Fee"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={fee}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              buyer,
              buyerEmail,
              amount,
              fee: value,
              stripeChargeId,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.fee ?? value;
          }
          if (errors.fee?.hasError) {
            runValidationTasks("fee", value);
          }
          setFee(value);
        }}
        onBlur={() => runValidationTasks("fee", fee)}
        errorMessage={errors.fee?.errorMessage}
        hasError={errors.fee?.hasError}
        {...getOverrideProps(overrides, "fee")}
      ></TextField>
      <TextField
        label="Stripe charge id"
        isRequired={false}
        isReadOnly={false}
        value={stripeChargeId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              buyer,
              buyerEmail,
              amount,
              fee,
              stripeChargeId: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.stripeChargeId ?? value;
          }
          if (errors.stripeChargeId?.hasError) {
            runValidationTasks("stripeChargeId", value);
          }
          setStripeChargeId(value);
        }}
        onBlur={() => runValidationTasks("stripeChargeId", stripeChargeId)}
        errorMessage={errors.stripeChargeId?.errorMessage}
        hasError={errors.stripeChargeId?.hasError}
        {...getOverrideProps(overrides, "stripeChargeId")}
      ></TextField>
      <TextField
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              buyer,
              buyerEmail,
              amount,
              fee,
              stripeChargeId,
              owner: value,
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks("owner", value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks("owner", owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, "owner")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
