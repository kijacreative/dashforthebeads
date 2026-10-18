// Server entry: renders each route to static HTML at build time.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { PAGES } from './pages/index.js';
export { ROUTES } from './routes.js';
export { buildSchema } from './schema.js';
export { default as D, SITE_URL } from './data.js';
export { RACE_FAQ, GRANTS_FAQ, SPONSOR_FAQ, QUICK_FACTS } from './content.js';

export function render(route) {
  const Page = PAGES[route.page];
  return renderToString(<Page {...(route.props || {})} />);
}
