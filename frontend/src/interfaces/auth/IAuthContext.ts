import type { QueryObserverResult } from '@tanstack/react-query';
import type IUserResponse from './IUserResponse';

export default interface IAuthContext {
  user: IUserResponse | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  checkAuth: () => Promise<QueryObserverResult<IUserResponse, Error>>;
}
