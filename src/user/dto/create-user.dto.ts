import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'chefkoch42',
    description: 'Benutzername des neuen Users',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'chef@example.com',
    description: 'E-Mail-Adresse des neuen Users',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'geheimespasswort',
    description: 'Passwort mit mindestens 6 Zeichen',
    minLength: 6,
  })
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    example: 'Ich liebe Pasta 🍝',
    description: 'Optionaler Profiltext des Users',
  })
  @IsOptional()
  profileText?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/profilbild.jpg',
    description: 'URL zum Profilbild des Users',
  })
  @IsOptional()
  userImgUrl?: string;
}
