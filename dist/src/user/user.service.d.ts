import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(user: User): Promise<User>;
    readAll(): Promise<User[]>;
    readOne(id: number): Promise<User | null>;
    update(id: number, data: Partial<User>): Promise<import("typeorm").UpdateResult>;
    delete(id: number): Promise<void>;
}
