import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  // (!) Attention: If you use this api in production, implement a "where" filter
  async readAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async readOne(id: number): Promise<User | null> {
    const result = await this.usersRepository.find({
      where: { id },
      relations: { watchEntries: { recipe: true } },
    });
    return result ? result[0] : null;
  }

  async updateProfile(userId: number, data: any): Promise<User> {
    console.log('Wie sind nun im Backend');
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error('Benutzer nicht gefunden');
    }

    if (data.username) user.username = data.username;
    if (data.email) user.email = data.email;
    if (data.profileText) user.profileText = data.profileText;

    // ✅ Base64 direkt speichern (kein `[object Object]`)
    console.log(data.profileImage);    

    
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



  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
  
  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
  
  
}
