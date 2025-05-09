import { RouterProvider } from 'atomic-router-react';

import { Pages } from '@/pages';
import '@/shared/libs/i18n';
import { router } from '@/shared/router';

import { Layout } from './layout';

import '@/shared/assets/styles/index.css';

export const App = () => (
  <RouterProvider router={router}>
    <Layout>
      <Pages />
    </Layout>
  </RouterProvider>
);
