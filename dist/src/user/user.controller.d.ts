import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    readOne(id: string): Promise<import("./user.entity").User | null>;
}
