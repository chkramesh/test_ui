import { Role } from './role.enum'

export interface IAuthStatus {
    isAuthenticated: boolean;
    userRole: Role;
    userId: string;
  }


  