import { Role } from './role.enum'

export interface IAuthStatus {
    isAuthenticated: boolean;
    // userRole: Role;
    userRole: string;
    userId: string;
  }


  