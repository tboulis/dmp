import 'styles/global.css';
import 'styles/stylesheet.css';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Inter } from '@next/font/google';
import { AppProps } from 'next/app';
import React from 'react';
import ReactDOM from 'react-dom';
import { SWRConfig } from 'swr';

import { AppCrashFallback, ErrorBoundary } from 'components';
import { LanguageWrapper } from 'context';
import { Intl } from 'providers';
import { apiClient } from 'services/api/client';
import { muiTheme } from 'theme/muiTheme';

if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  void import('@axe-core/react').then(({ default: reactAxe }) => {
    const ACCESSIBILITY_CHECK_DELAY = 1000;

    return reactAxe(React, ReactDOM, ACCESSIBILITY_CHECK_DELAY);
  });
}

// https://nextjs.org/docs/basic-features/font-optimization
const inter = Inter({ subsets: ['latin'] });

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <ThemeProvider theme={muiTheme}>
        <ErrorBoundary FallbackComponent={AppCrashFallback}>
          <LanguageWrapper>
            <Intl>
              <SWRConfig
                value={{
                  refreshInterval: 0, // disable auto refresh by interval by default
                  fetcher: (resource: string) =>
                    apiClient
                      .get<unknown>(resource)
                      .then(response => response.data),
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div>
                    <Component {...pageProps} />
                  </div>
                </LocalizationProvider>
              </SWRConfig>
            </Intl>
          </LanguageWrapper>
        </ErrorBoundary>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
