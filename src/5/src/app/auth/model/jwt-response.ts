import { Role } from './role.enum';
import { User } from './user';

export class JwtResponse {
    // isAuthenticated: boolean;
    // userRole: Role;
    // userId: string;

    accessToken: string;
    type: string;
    username: string;
    //authorities: string[];
    //authorities: authority[];
    /////authorities: any;

    authorities: Authority[];
    //authorities: authority[];
    //authorities: authority;
    //userDo: any;
    userDo: User;
}

export class Authority {   
    authority: string;
    //authority: string[]
}


