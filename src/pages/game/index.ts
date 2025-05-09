import { createRouteView } from 'atomic-router-react';
import { lazy } from 'react';

import { $$game } from './model';

const GamePage = lazy(() => import('./ui/page'));

export const GameRoute = {
  view: createRouteView({ route: $$game.currentRoute, view: GamePage }),
  route: $$game.currentRoute,
};
