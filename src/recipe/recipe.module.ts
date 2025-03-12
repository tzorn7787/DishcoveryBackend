import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeService } from './recipe.service';
import { Ingredient } from './ingredient.entity';
import { Recipe } from './recipe.entity';
import { RecipeController } from './recipe.controller';
import { Rating } from './rating.entity';
import { Tag } from './tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Ingredient, Rating, Tag])],
  providers: [RecipeService],
  controllers: [RecipeController],
  exports: [RecipeService],
})
export class RecipeModule {}
