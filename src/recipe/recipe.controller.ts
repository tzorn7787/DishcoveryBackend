import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  readAll() {
    return this.recipeService.readAll();
  }

  @Get(':id')
  readOne(@Param('id') id: string) {
    return this.recipeService.readOne(+id);
  }

  @Post()
  create(@Body() recipe: Recipe) {
    return this.recipeService.create(recipe);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() recipe: Partial<Recipe>) {
    return this.recipeService.update(+id, recipe);
  }
}
