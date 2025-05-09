import { createRoutesView } from 'atomic-router-react';

import { GameRoute } from './game';
import { HomeRoute } from './home';

export const Pages = createRoutesView({
  routes: [HomeRoute, GameRoute],
});
