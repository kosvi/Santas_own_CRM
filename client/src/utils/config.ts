import { parseNumber } from './validators';

export const API_BASE = process.env.REACT_APP_API_BASE || '/api';
export const LOGGING = process.env.REACT_APP_LOGGING || false;
export const NOTIFICATION_DELAY = parseNumber(process.env.REACT_APP_NOTIFICATION_DELAY) || 5000;
export const FAKED_API_DELAY = parseNumber(process.env.REACT_APP_FAKED_API_DELAY) || 0;
