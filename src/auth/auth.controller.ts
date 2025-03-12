import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    // Prüfen, ob Benutzername oder E-Mail bereits existieren
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('E-Mail bereits vergeben');
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10);

    // Benutzer erstellen
    const newUser = await this.userService.create({
        username,
        email,
        passwordHash: hashedPassword,
        role: "user",
        id: 0,
        createdAt: new Date(),
        watchEntries: [],

    });

    return { message: 'Registrierung erfolgreich', user: newUser };
  }
}
