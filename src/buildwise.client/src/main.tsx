import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './authConfig';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import './index.css'
import App from './App.tsx'

if (import.meta.env.MODE !== 'development')
{
  msalConfig.auth.redirectUri = "https://buildwise-test.azurewebsites.net/";
}

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <FluentProvider theme={webLightTheme}>
        <App />
      </FluentProvider>
    </MsalProvider>
  </StrictMode>,
)
