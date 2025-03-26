import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateRecipeDto {
  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsOptional()
  imgUrl?: string;

  @IsString()
  @IsNotEmpty()
  difficulty: 'easy' | 'medium' | 'hard';

  @IsNumber()
  @IsNotEmpty()
  prepTime: number;

  @IsNumber()
  @IsNotEmpty()
  cookTime: number;

  @IsNumber()
  @IsNotEmpty()
  servings: number;

  @IsArray()
  @IsOptional()
  ingredients?: { name: string; amount: number; unit: string }[];

  @IsArray()
  @IsOptional()
  tags?: string[];

}
