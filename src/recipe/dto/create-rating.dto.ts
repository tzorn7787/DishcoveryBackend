import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: 1 | 2 | 3 | 4 | 5;

  @IsOptional()
  @IsString()
  comment?: string;
}
