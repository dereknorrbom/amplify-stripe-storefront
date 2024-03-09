/** * This code loads environment values from SSM and places them in their corresponding environment variables. * If there are no SSM environment values for this function, this is a noop. */import { SSM } from '@aws-sdk/client-ssm';/** * Reads SSM environment context from a known Amplify environment variable, * fetches values from SSM and places those values in the corresponding environment variables */export const internalAmplifyFunctionResolveSsmParams = async (client = new SSM()) => {    const envPathObject = JSON.parse(process.env.AMPLIFY_SSM_ENV_CONFIG ?? '{}');    const paths = Object.keys(envPathObject);    if (paths.length === 0) {        return;    }    const resolveSecrets = async (paths) => {        const response = await client.getParameters({            Names: paths,            WithDecryption: true,        });        if (response.Parameters && response.Parameters.length > 0) {            for (const parameter of response.Parameters) {                if (parameter.Name) {                    const envKey = Object.keys(envPathObject).find((key) => envPathObject[key].sharedPath === parameter.Name);                    const envName = envKey                        ? envPathObject[envKey].name                        : envPathObject[parameter.Name]?.name;                    process.env[envName] = parameter.Value;                }            }        }        return response;    };    const response = await resolveSecrets(paths);    const sharedPaths = (response?.InvalidParameters || [])        .map((invalidParam) => envPathObject[invalidParam].sharedPath)        .filter((sharedParam) => !!sharedParam);     if (sharedPaths.length > 0) {        await resolveSecrets(sharedPaths);    }};await internalAmplifyFunctionResolveSsmParams();const SSM_PARAMETER_REFRESH_MS = 1000 * 60;setInterval(() => {    void internalAmplifyFunctionResolveSsmParams();}, SSM_PARAMETER_REFRESH_MS);export {};

// node_modules/@aws-amplify/backend-function/lib/lambda-shims/cjs_shim.js
import { createRequire } from "node:module";
import path from "node:path";
import url from "node:url";
global.require = createRequire(import.meta.url);
global.__filename = url.fileURLToPath(import.meta.url);
global.__dirname = path.dirname(__filename);

// amplify/functions/createSellerRecord/handler.ts
var handler = async (event) => {
  return "You made a function!";
};
export {
  handler
};
