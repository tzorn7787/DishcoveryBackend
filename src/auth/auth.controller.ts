import { Controller, Post, Body,Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: { username: string; email: string; password: string }): Promise<User> {
    return this.authService.register(userData);
  }
  
  @Post('login')
  async login(@Body() loginData: { identifier: string; password: string }) {
    return this.authService.login(loginData.identifier, loginData.password);
  }
}
