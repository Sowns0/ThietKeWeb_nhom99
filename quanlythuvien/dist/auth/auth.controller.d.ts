import type { Response } from 'express';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    register(body: {
        username: string;
        password: string;
    }): Promise<{
        message: string;
        userId: number;
        username: string;
    }>;
    login(body: {
        username: string;
        password: string;
    }, res: Response): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): {
        message: string;
        user: any;
    };
}
