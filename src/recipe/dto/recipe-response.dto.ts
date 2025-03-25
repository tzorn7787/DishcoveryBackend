import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDto } from "src/user/dto/user-response.dto";
import { RatingDto } from "./rating.dto";
import { Ingredient } from "../ingredient.entity";
import { Tag } from "../tag.entity";
import { Recipe } from "../recipe.entity";

export class RecipeDto{

  @ApiProperty({ description: 'Eindeutige Id des Rezepts' })
  id:number;

  @ApiProperty({ description: 'Der Name des Rezepts' })
  title: string;

  @ApiProperty({ description: 'Kurzbeschreibung des Rezepts' })
  description: string;

  @ApiProperty({ description: 'Detaillierte Rezeptanleitung' })
  text: string;

  @ApiProperty({ description: 'Bild-URL des Rezepts' })
  imgUrl: string;

  @ApiProperty({ enum: ['easy', 'medium', 'hard'] })
  difficulty: 'easy' | 'medium' | 'hard';

  @ApiProperty({ description: 'Vorbereitungszeit in Minuten' })
  prepTime: number;

  @ApiProperty({ description: 'Kochzeit in Minuten' })
  cookTime: number;

  @ApiProperty({ description: 'Anzahl der Portionen, welche für die Zutaten dieses Rezepts gedacht sind' })
  servings: number;

  @ApiProperty({ description: 'Liste der Bewertungen für das Rezept' })
  ratings: RatingDto[];

  @ApiProperty({ description: 'Liste der Zutaten für das Rezept' })
  ingredients: Ingredient[];

  @ApiProperty({ description: 'Der Benutzer, der das Rezept erstellt hat' })
  user: UserResponseDto;

  @ApiProperty({ example: '2025-03-14T10:00:00Z', description: 'Datum der letzten Aktualisierung' })
  updatedAt: Date;

  @ApiProperty({ description: 'Liste der Tags für das Rezept' })
  tags: Tag[];



  constructor(recipe: Recipe) {
    this.id = recipe.id;
    this.title = recipe.title;
    this.description = recipe.description;
    this.text = recipe.text;
    this.imgUrl = recipe.imgUrl;
    this.difficulty = recipe.difficulty;
    this.prepTime = recipe.prepTime;
    this.cookTime = recipe.cookTime;
    this.servings = recipe.servings;
    this.updatedAt = recipe.updatedAt;
    this.user = new UserResponseDto(recipe.user);
    this.ratings = recipe.ratings?.map(rating => new RatingDto(rating));
    this.ingredients = recipe.ingredients;
    this.tags = recipe.tags;
  }
}