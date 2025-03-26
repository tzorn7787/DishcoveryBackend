import { IsOptional, IsEmail, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'neuerBenutzername',
    description: 'Neuer Benutzername',
  })
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({
    example: 'neue.email@example.com',
    description: 'Neue E-Mail-Adresse',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: 'Ich bin jetzt ein Meisterkoch!',
    description: 'Neuer Profiltext',
  })
  @IsOptional()
  profileText?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/neues-bild.jpg',
    description: 'Neue URL zum Profilbild',
  })
  @IsOptional()
  userImgUrl?: string;

  @ApiPropertyOptional({
    example: 'altesPasswort123',
    description: 'Altes Passwort zur Authentifizierung vor dem Ändern',
  })
  @IsOptional()
  oldPassword?: string;

  @ApiPropertyOptional({
    example: 'neuesSicheresPasswort456',
    description: 'Neues Passwort mit mindestens 6 Zeichen',
    minLength: 6,
  })
  @IsOptional()
  @MinLength(6)
  newPassword?: string;
}
