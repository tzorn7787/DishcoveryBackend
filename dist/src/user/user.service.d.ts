import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(user: User): Promise<User>;
    readAll(): Promise<User[]>;
    readOne(id: number): Promise<User | null>;
    updateUser(id: number, data: Partial<User>): Promise<User>;
    delete(id: number): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
}
