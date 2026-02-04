import type { IAuthContext } from '@/interfaces/auth';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

export const Route = createRootRouteWithContext<{
  auth: IAuthContext;
}>()({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});
