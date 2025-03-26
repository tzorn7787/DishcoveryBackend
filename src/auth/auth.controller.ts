import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserResponseDto } from '../user/dto/user-response.dto'; // optional für response

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registriert einen neuen Benutzer' })
  @ApiResponse({
    status: 201,
    description: 'Benutzer wurde erfolgreich registriert',
    type: UserResponseDto,
  })
  async register(@Body() userData: RegisterUserDto) {
    return this.authService.register(userData);
  }

  @Post('login')
  @ApiOperation({ summary: 'Loggt benutzer ein' })
  @ApiResponse({
    status: 201,
    description: 'Benutzer wurde erfolgreich eingeloggt',
    type: LoginUserDto,
  })
  async login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }
}
