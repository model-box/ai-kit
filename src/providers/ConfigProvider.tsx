import { createContext, useContext } from 'react';

export interface RootConfig {
  // apiKey: string;
  // apiURL: string;
  auth: AuthConfig;
  defaultModel: string;
}

export interface AuthConfig {
  publicKey: string;
  apiURL: string;
}

export const ConfigContext = createContext<RootConfig>({
  auth: {
    publicKey: 'your-public-key',
    apiURL: 'https://api.model.box',
  },
  defaultModel: 'deepseek/deepseek-chat',
});

export const useConfig = () => {
  return useContext(ConfigContext);
};

export function ConfigProvider({
  children,
  config,
}: {
  children: React.ReactNode;
  config: RootConfig;
}) {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}
