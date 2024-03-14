import { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import amplifyConfig from '@/amplifyconfiguration.json';

const useAmplifyConfig = () => {
  useEffect(() => {
    console.log('Configuring Amplify...');
    Amplify.configure(amplifyConfig, { ssr: true });
    const existingConfig = Amplify.getConfig();
    Amplify.configure({
      ...existingConfig,
      API: {
        ...existingConfig.API,
        REST: {
          [amplifyConfig.custom.apiName]: {
            endpoint: amplifyConfig.custom.apiEndpoint,
            region: amplifyConfig.custom.apiRegion,
          },
        },
      },
    }, { ssr: true });
  }, []);
};

export default useAmplifyConfig;
