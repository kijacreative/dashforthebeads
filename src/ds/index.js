// Loads the Claude Design system bundle (a classic script that expects global React and window).
import './globals.js';
import './bundle.js';

export const DS = globalThis.DashForTheBeadsDesignSystem_b16088;
if (DS.__errors && DS.__errors.length) console.error('Design system load errors', DS.__errors);
