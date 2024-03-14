/* eslint-disable */
"use client";
import * as React from "react";
import { getCurrentUser } from 'aws-amplify/auth';
import { fetchByPath, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createProduct } from "./graphql/mutations";

const client = generateClient();
export default function ProductCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    description: "",
    price: "",
    owner: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [description, setDescription] = React.useState(initialValues.description);
  const [price, setPrice] = React.useState(initialValues.price);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setOwner(user.username);
    };

    fetchUser();
  }, []);

  const resetStateValues = () => {
    setName(initialValues.name);
    setDescription(initialValues.description);
    setPrice(initialValues.price);
    setOwner(initialValues.owner);
    setErrors({});
  };

  const validations = {
    name: [],
    description: [],
    price: [],
    owner: [],
  };

  const runValidationTasks = async (fieldName, currentValue, getDisplayValue) => {
    const value = currentValue && getDisplayValue ? getDisplayValue(currentValue) : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const currentUser = await getCurrentUser();
        const currentOwner = currentUser.username; // Assuming getCurrentUser() returns an object with a username property

        // Ensure price is treated as a number before conversion
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice)) {
          console.error('Price is not a valid number:', price);
          // Consider adding user feedback here to correct the price input
          return;
        }

        let modelFields = {
          name,
          description,
          price: Math.round(numericPrice * 100), // Convert price to integer (cents)
          owner: currentOwner,
        };

        // Debugging: Log the modelFields to verify the price conversion
        console.log('Submitting product with fields:', modelFields);

        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(...modelFields[fieldName].map((item) => runValidationTasks(fieldName, item)));
              return promises;
            }
            promises.push(runValidationTasks(fieldName, modelFields[fieldName]));
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
            query: createProduct.replaceAll("__typename", ""),
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
      {...rest}
    >
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1 font-semibold">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => {
            let { value } = e.target;
            if (onChange) {
              const modelFields = {
                name: value,
                description,
                price: Math.round(price * 100),
                owner,
              };
              const result = onChange(modelFields);
              value = result?.name ?? value;
            }
            if (errors.name?.hasError) {
              runValidationTasks("name", value);
            }
            setName(value);
          }}
          onBlur={() => runValidationTasks("name", name)}
          className={`border border-gray-300 rounded px-2 py-1 w-full ${errors.name?.hasError ? 'border-red-500' : ''}`}
        />
        {errors.name?.hasError && (
          <p className="text-red-500 text-sm mt-1">{errors.name?.errorMessage}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-1 font-semibold">Description</label>
        <textarea
          id="description"
          placeholder="Enter product description"
          value={description}
          onChange={(e) => {
            let { value } = e.target;
            if (onChange) {
              const modelFields = {
                name,
                description: value,
                price,
                owner,
              };
              const result = onChange(modelFields);
              value = result?.description ?? value;
            }
            if (errors.description?.hasError) {
              runValidationTasks("description", value);
            }
            setDescription(value);
          }}
          onBlur={() => runValidationTasks("description", description)}
          className={`border border-gray-300 rounded px-2 py-1 w-full ${errors.description?.hasError ? 'border-red-500' : ''}`}
          rows={4}
        />
        {errors.description?.hasError && (
          <p className="text-red-500 text-sm mt-1">{errors.description?.errorMessage}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block mb-1 font-semibold">Price</label>
        <input
          id="price"
          type="number"
          step="0.01"
          placeholder="Enter product price"
          value={price}
          onChange={(e) => {
            let value = isNaN(parseFloat(e.target.value)) ? e.target.value : parseFloat(e.target.value);
            if (onChange) {
              const modelFields = {
                name,
                description,
                price: Math.round(price * 100),
                owner,
              };
              const result = onChange(modelFields);
              value = result?.price ?? value;
            }
            if (errors.price?.hasError) {
              runValidationTasks("price", value);
            }
            setPrice(value);
          }}
          onBlur={() => runValidationTasks("price", price)}
          className={`border border-gray-300 rounded px-2 py-1 w-full ${errors.price?.hasError ? 'border-red-500' : ''}`}
        />
        {errors.price?.hasError && (
          <p className="text-red-500 text-sm mt-1">{errors.price?.errorMessage}</p>
        )}
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-4 rounded"
        >
          Clear
        </button>
        <button
          type="submit"
          disabled={Object.values(errors).some((e) => e?.hasError)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded disabled:bg-gray-400"
        >
          Submit
        </button>
      </div>
    </form>
  );
}