import { Role } from './role.enum'
export class JwtResponse {
    isAuthenticated: boolean;
    userRole: Role;
    userId: string;
}
