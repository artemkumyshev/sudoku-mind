import { createRouteView } from 'atomic-router-react';
import { lazy } from 'react';

import { routes } from '@/shared/router';

const HomePage = lazy(() => import('./ui'));

const currentRoute = routes.home;

export const HomeRoute = {
  view: createRouteView({ route: currentRoute, view: HomePage }),
  route: currentRoute,
};
