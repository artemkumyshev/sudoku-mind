import { createRouteView } from 'atomic-router-react';

import { $$game } from './model';
import { GamePage } from './ui/page';

export const GameRoute = {
  view: createRouteView({ route: $$game.currentRoute, view: GamePage }),
  route: $$game.currentRoute,
};
