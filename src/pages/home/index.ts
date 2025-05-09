import { createRouteView } from 'atomic-router-react';

import { routes } from '@/shared/router';
import { HomePage } from './ui';

const currentRoute = routes.home;

export const HomeRoute = {
  view: createRouteView({ route: currentRoute, view: HomePage }),
  route: currentRoute,
};
