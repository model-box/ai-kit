import { ReactNode } from 'react';
import { ConfigProvider, RootConfig } from './ConfigProvider';

interface ProviderProps {
  children: ReactNode;
  config: RootConfig;
}

export function Provider({ children, config }: ProviderProps) {
  return <ConfigProvider config={config}>{children}</ConfigProvider>;
}
