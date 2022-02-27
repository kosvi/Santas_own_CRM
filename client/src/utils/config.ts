import { parseNumber } from './validators';

export const API_BASE = process.env.REACT_APP_API_BASE || '/api';
export const LOGGING = process.env.REACT_APP_LOGGING || false;
// tests will default to 500, otherwise 5000
export const NOTIFICATION_DELAY = process.env.NODE_ENV==='test' ? 500 : (parseNumber(process.env.REACT_APP_NOTIFICATION_DELAY) || 5000);
export const FAKED_API_DELAY = parseNumber(process.env.REACT_APP_FAKED_API_DELAY) || 0;
