import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { WatchEntry } from './watch-entry.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  userImgUrl?: string;

  @Column({
    type: 'text',
    enum: ['user', 'admin'],
    default: 'user',
  })
  role: 'user' | 'admin';

  @OneToMany(() => WatchEntry, (watchEntry) => watchEntry.user, {
    cascade: true,
  })
  watchEntries: WatchEntry[];
}
