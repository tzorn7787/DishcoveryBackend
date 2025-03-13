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
  
  @Get('register')
  getRegisterMessage() {
    return { message: 'This is the register route. Use POST to register a user.' };
  }
  
}
