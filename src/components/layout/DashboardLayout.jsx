/**
 * Architecture Responsibility Split:
 * Primary page-level layout composition is maintained at `src/layouts/DashboardLayout.jsx`.
 * This file re-exports the primary layout to prevent duplicated layout state and markup.
 */
export { default } from '../../layouts/DashboardLayout';
