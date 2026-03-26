import { UsersService } from './service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    login(req: any): Promise<import("./schema").User>;
    getMe(req: any): Promise<import("./schema").User | null>;
    getAll(): Promise<import("./schema").User[]>;
}
