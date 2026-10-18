// Browser entry: hydrates the prerendered page so forms, menus, and filters work.
import React from 'react';
import { hydrateRoot } from 'react-dom/client';

const LOADERS = {
  home: () => import('./pages/home.jsx'),
  race: () => import('./pages/race.jsx'),
  about: () => import('./pages/about.jsx'),
  involved: () => import('./pages/involved.jsx'),
  sponsor: () => import('./pages/sponsor.jsx'),
  sponsors: () => import('./pages/sponsors.jsx'),
  grants: () => import('./pages/grants.jsx'),
  contact: () => import('./pages/contact.jsx'),
  tier: () => import('./pages/tier.jsx')
};

const root = document.getElementById('root');
const { page, props } = root.dataset;
LOADERS[page]().then(({ default: Page }) => {
  hydrateRoot(root, <Page {...(props ? JSON.parse(props) : {})} />);
});
