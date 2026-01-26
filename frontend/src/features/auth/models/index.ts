export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
  confirmPassword: string;
}
