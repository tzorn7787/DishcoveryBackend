import { BaseEntity } from '../shared/base';
import { WatchEntry } from './watch-entry.entity';
export declare class User extends BaseEntity {
    username: string;
    email: string;
    passwordHash: string;
    userImgUrl?: string;
    role: 'user' | 'admin';
    watchEntries: WatchEntry[];
    hashPassword(): Promise<void>;
}
