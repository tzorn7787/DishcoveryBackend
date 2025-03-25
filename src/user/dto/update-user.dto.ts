import { IsOptional, IsEmail, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  profileText?: string;

  @IsOptional()
  userImgUrl?: string;

  @IsOptional()
  oldPassword?: string;

  @IsOptional()
  @MinLength(6)
  newPassword?: string;
}
