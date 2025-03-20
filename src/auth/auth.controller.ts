import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: { id: string; username: string; email: string }; // user definieren
}

@ApiTags('auth') // Gruppiert die Auth-Routen unter "auth" in Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registriert einen neuen Benutzer' })
  @ApiResponse({ status: 201, description: 'Benutzer wurde erfolgreich registriert', type: User })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'john_doe' },
        email: { type: 'string', example: 'john@example.com' },
        password: { type: 'string', example: 'securePassword123' },
      },
    },
  })
  async register(@Body() userData: { username: string; email: string; password: string }): Promise<User> {
    return this.authService.register(userData);
  }

  @Post('login')
  @ApiOperation({ summary: 'Meldet einen Benutzer an' })
  @ApiResponse({ status: 200, description: 'Login erfolgreich, gibt Token zurück' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        identifier: { type: 'string', example: 'john_doe oder john@example.com' },
        password: { type: 'string', example: 'securePassword123' },
      },
    },
  })
  async login(@Body() loginData: { identifier: string; password: string }) {
    return this.authService.login(loginData.identifier, loginData.password);
  }
}
