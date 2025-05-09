import { attachReduxDevTools } from '@effector/redux-devtools-adapter';
import WebApp from '@twa-dev/sdk';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/app';
import { appStarted } from '@/shared/router';

WebApp.ready();
attachReduxDevTools();
appStarted();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
