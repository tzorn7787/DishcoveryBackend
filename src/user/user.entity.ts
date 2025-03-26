import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { WatchEntry } from './watch-entry.entity';
import {FavoriteEntry} from './favorite-entry.entity'
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
  @Column()
  @ApiProperty({ example: 'john_doe', description: 'Der eindeutige Benutzername' })
  username: string;

  @Column()
  @ApiProperty({ example: 'john.doe@example.com', description: 'Die E-Mail-Adresse des Benutzers' })
  email: string;

  @Column()
  @ApiProperty({ example: '$2b$10$abcdefghijklmnopqrstuv', description: 'Das verschlüsselte Passwort', writeOnly: true })
  passwordHash: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'https://example.com/profile.jpg', description: 'URL des Benutzerprofilbilds', required: false })
  userImgUrl?: string;

  @Column({
    type: 'text',
    enum: ['user', 'admin'],
    default: 'user',
  })
  @ApiProperty({ example: 'user', description: 'Die Benutzerrolle (user oder admin)', enum: ['user', 'admin'] })
  role: 'user' | 'admin';

  @Column({ nullable: true, default: '' }) 
  @ApiProperty({ example: 'Hey, ich bin John!', description: 'Kurzbeschreibung des Benutzers', required: false })
  profileText: string;  

  @OneToMany(() => WatchEntry, (watchEntry) => watchEntry.user, {
    cascade: true,
  })
  @ApiProperty({ description: 'Liste der Watch-Entries des Benutzers', type: () => WatchEntry, isArray: true })
  watchEntries: WatchEntry[];


  @OneToMany(() => FavoriteEntry, (favoriteEntry) => favoriteEntry.user, {
    cascade: true,
  })
  @ApiProperty({ description: 'Liste der Watch-Entries des Benutzers', type: () => FavoriteEntry, isArray: true })
  favoriteEntry: FavoriteEntry[];


  // Vor dem Speichern das Passwort hashen
  @BeforeInsert()
  async hashPassword() {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  }

  
}
