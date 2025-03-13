import { Controller, Get, Param } from '@nestjs/common';
import { RecipeService } from './recipe.service';

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

}
