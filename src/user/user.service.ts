import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

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

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, data);
    const updatedUser = await this.usersRepository.findOne({ where: { id } });
  
    if (!updatedUser) {
      throw new Error('Benutzer nicht gefunden');
    }
  
    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
  
  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
  
  async isAdministrator(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    return user?.role === 'admin';
  }
  
}
