import { BeforeInsert,Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { WatchEntry } from './watch-entry.entity';
import * as bcrypt from 'bcrypt';

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

  @Column({ nullable: true, default: '' }) 
  profileText: string;  

  @OneToMany(() => WatchEntry, (watchEntry) => watchEntry.user, {
    cascade: true,
  })
  watchEntries: WatchEntry[];

   // Vor dem Speichern das Passwort hashen
   @BeforeInsert()
   async hashPassword() {
     this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
   }
}
