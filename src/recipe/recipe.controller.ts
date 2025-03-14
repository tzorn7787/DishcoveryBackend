import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';

@Controller('recipe') 
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  // GET /recipe → Gibt alle Rezepte zurück
  @Get()
  getAllRecipes(): Promise<Recipe[]> {
    return this.recipeService.readAll();
  }

  // GET /recipe/:id → Gibt ein Rezept nach ID zurück
  @Get(':id')
  getRecipe(@Param('id') id: number): Promise<Recipe | null> {
    return this.recipeService.readOne(Number(id));
  }

  // POST /recipe → Erstellt ein neues Rezept
  @Post()
  createRecipe(@Body() recipe: Recipe): Promise<Recipe> {
    return this.recipeService.create(recipe);
  }

  // PUT /recipe/:id → Aktualisiert ein Rezept
  @Put(':id')
  updateRecipe(@Param('id') id: number, @Body() data: Partial<Recipe>) {
    return this.recipeService.update(Number(id), data);
  }

  // DELETE /recipe/:id → Löscht ein Rezept
  @Delete(':id')
  deleteRecipe(@Param('id') id: number) {
    return this.recipeService.delete(Number(id));
  }
}
