import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(userData: RegisterUserDto): Promise<User> {
    const { username, email, password } = userData;

    const existingUser = await this.usersRepository.findOne({
      where: [{ email }, { username }],
    });

    if (existingUser) {
      throw new HttpException(
        'Benutzername oder E-Mail ist bereits vergeben.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = new User();
    user.username = username;
    user.email = email;
    user.passwordHash = password; // wird automatisch im Entity gehashed

    return this.usersRepository.save(user);
  }

  async login(loginDto: LoginUserDto) {
    const { identifier, password } = loginDto;

    const user = await this.usersRepository.findOne({
      where: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      throw new HttpException('Benutzer nicht gefunden', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new HttpException('Falsches Passwort', HttpStatus.UNAUTHORIZED);
    }

    const { passwordHash, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token: 'loggedin',
    };
  }
}
