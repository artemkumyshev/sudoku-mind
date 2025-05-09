import {
  createHistoryRouter,
  createRoute,
  createRouterControls,
} from 'atomic-router';
import { createEvent, sample } from 'effector';
import { createBrowserHistory } from 'history';

export const appStarted = createEvent();

export const routes = {
  home: createRoute(),
  game: createRoute(),
  profile: createRoute(),
  settings: createRoute(),
};

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: [
    { path: '/', route: routes.home },
    { path: '/game', route: routes.game },
    { path: '/profile', route: routes.profile },
    { path: '/settings', route: routes.settings },
  ],
  controls,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
