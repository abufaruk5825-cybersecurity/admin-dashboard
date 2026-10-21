/**
 * Legacy route kept for compatibility. 
 * The proper routed versions are UserList (/users) and ProductList (/products).
 * This file re-exports UserList so existing imports don't break.
 */
export { default } from '../users/UserList';
