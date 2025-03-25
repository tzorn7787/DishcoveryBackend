import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // ✅ Benutzer erstellen mit DTO
  async create(userDto: CreateUserDto): Promise<User> {
    const user = new User();

    user.username = userDto.username;
    user.email = userDto.email;
    user.profileText = userDto.profileText || '';
    user.role = 'user';
    user.userImgUrl = userDto.userImgUrl || undefined;

    // Passwort hashen
    user.passwordHash = await bcrypt.hash(userDto.password, 10);

    return await this.usersRepository.save(user);
  }

  // Alle Benutzer abrufen
  async readAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  // Einen Benutzer abrufen
  async readOne(id: number): Promise<User | null> {
    const result = await this.usersRepository.find({
      where: { id },
      relations: { watchEntries: { recipe: true } },
    });
    return result ? result[0] : null;
  }

  // Benutzerprofil aktualisieren
  async updateProfile(userId: number, data: any): Promise<User> {
    console.log('Wir sind im Backend');

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('Benutzer nicht gefunden');
    }

    if (data.username) user.username = data.username;
    if (data.email) user.email = data.email;
    if (data.profileText) user.profileText = data.profileText;
    if (data.profileImage) {
      user.userImgUrl = data.profileImage;
      console.log('User-Image:', user.userImgUrl);
    }

    if (data.oldPassword && data.newPassword) {
      const isPasswordValid = await bcrypt.compare(data.oldPassword, user.passwordHash);
      if (!isPasswordValid) {
        throw new Error('Altes Passwort ist falsch');
      }
      user.passwordHash = await bcrypt.hash(data.newPassword, 10);
    }

    await this.usersRepository.save(user);
    return user;
  }

  // Benutzer löschen
  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // Benutzer per E-Mail suchen
  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
