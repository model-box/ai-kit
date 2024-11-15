import { createContext } from 'react';

// packages/theme/src/types.ts
export interface ThemeTokens {
  colorPrimary: string;
  colorSuccess: string;
  colorWarning: string;
  colorError: string;
  colorBackground: string;
  colorText: string;
}

export interface ThemeConfig extends ThemeTokens {
  // 允许用户扩展主题变量
  [key: string]: string;
}

// packages/theme/src/default-theme.ts
export const defaultTheme: ThemeTokens = {
  colorPrimary: '#1677ff',
  colorSuccess: '#52c41a',
  colorWarning: '#faad14',
  colorError: '#ff4d4f',
  colorBackground: '#ffffff',
  colorText: '#000000',
};

// 转换主题对象为 CSS 变量
export function themeToCssVars(theme: ThemeConfig): string {
  return `:root {
      ${Object.entries(theme)
        .map(([key, value]) => `--ai-kit-${key}: ${value};`)
        .join('\n')}
    }`;
}

export const ThemeContext = createContext<ThemeTokens>(defaultTheme);

export function ThemeProvider({
  theme = defaultTheme,
  children,
}: {
  theme?: Partial<ThemeTokens>;
  children: React.ReactNode;
}) {
  const mergedTheme = { ...defaultTheme, ...theme };

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
}
