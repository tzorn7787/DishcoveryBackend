import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(userData: { username: string; email: string; password: string }): Promise<User> {
    const { username, email, password } = userData;

    const existingUser = await this.usersRepository.findOne({
      where: [{ email }, { username }],
    });
  
    if (existingUser) {
      throw new HttpException('Benutzername oder E-Mail ist bereits vergeben.', HttpStatus.BAD_REQUEST);
    }
  
    const user = new User();
    user.username = username;
    user.email = email;
    user.passwordHash = password; // Passwort wird im BeforeInsert-Listener gehasht
  
    return this.usersRepository.save(user);
  }
  
  //Für später, vermutlich login oder Passwort vergessen
  async validateUser(identifier: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: [{ email: identifier }, { username: identifier }],
    });
  
    if (!user) return null; //  Kein Nutzer gefunden 
    
    //Passwort-Hash aus der Antwort entfernen
    const { passwordHash, ...userWithoutPassword } = user;
  
    return userWithoutPassword as User;
  }
  
  
}
