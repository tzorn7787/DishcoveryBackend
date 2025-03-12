import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    readAll(): Promise<import("./user.entity").User[]>;
    readOne(id: string): Promise<import("./user.entity").User | null>;
    delete(id: string): Promise<void>;
}
