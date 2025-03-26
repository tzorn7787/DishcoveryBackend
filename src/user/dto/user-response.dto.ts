import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '../user.entity';

export class UserResponseDto {
  @ApiProperty({ example: 1, description: 'Die eindeutige ID des Benutzers' })
  id: number;

  @ApiProperty({ example: 'testuser', description: 'Der Benutzername' })
  username: string;

  @ApiPropertyOptional({ example: 'Hey, ich liebe Kuchen!', description: 'Profiltext des Benutzers' })
  profileText?: string;

  @ApiPropertyOptional({ example: 'Bild im Base65 format', description: 'Profilbild-URL' })
  userImgUrl?: string;

  @ApiProperty({ example: 'user', description: 'Benutzerrolle', enum: ['user', 'admin'] })
  role: 'user' | 'admin';

  @ApiProperty({ example: '2024-01-01T12:00:00Z', description: 'Erstellungsdatum' })
  createdAt: Date;

  /*@ApiProperty({ example: '2024-01-01T12:00:00Z', description: 'Letzte Aktualisierung' })
  updatedAt: Date;*/


  constructor(user: User){
    this.id = user.id;
    this.username = user.username;
    this.profileText = user.profileText;
    this.userImgUrl = user.userImgUrl;
    this.role = user.role;
    this.createdAt = user.createdAt;
    //this.updatedAt = user.updatedAt;
  }
}
