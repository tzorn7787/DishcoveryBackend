import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

export class RatingDto {
  @ApiProperty({ description: 'Der Benutzer, der die Bewertung abgegeben hat', type: () => UserResponseDto })
  user: UserResponseDto;

  @ApiProperty({ description: 'Bewertung in Sternen (1-5)', enum: [1, 2, 3, 4, 5] })
  rating: 1 | 2 | 3 | 4 | 5;

  @ApiProperty({ description: 'Optionaler Kommentar zur Bewertung' })
  comment?: string;

  @ApiProperty({ description: 'Datum der letzten Aktualisierung' })
  updatedAt: Date;

  constructor(rating: any) {
    this.user = new UserResponseDto(rating.user);
    this.rating = rating.rating;
    this.comment = rating.comment;
    this.updatedAt = rating.updatedAt;
  }
}