import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { User } from '../user/user.entity';
import { Ingredient } from './ingredient.entity';
import { Tag } from './tag.entity';
import { RecipeDto } from './dto/recipe-response.dto'; 

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  
  ) {}

 

  async createRecipe(data: CreateRecipeDto, userId: number): Promise<Recipe> {
    console.log('rezept kam an');
    // User laden
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
  
    // Rezept-Objekt erstellen
    const recipe = this.recipeRepository.create({ 
      title: data.title,
      description: data.description,
      text: data.text,
      imgUrl: data.imgUrl,
      difficulty: data.difficulty,
      servings: 1, // Default-Wert
      prepTime: data.prepTime,
      cookTime: data.cookTime,
      user
    });
  
    await this.recipeRepository.save(recipe); // 🔥 Erst speichern, damit recipe eine ID hat!
  
    // Ingredients speichern
    if (data.ingredients) {
      recipe.ingredients = data.ingredients.map(ingredient => {
        return this.ingredientRepository.create({
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit as 'g' | 'kg' | 'ml' | 'l' | 'tbsp' | 'tsp' | 'cup' | 'piece',
          recipe: { id: recipe.id } //  Nur ID übergeben
        });
      });
  
      await this.ingredientRepository.save(recipe.ingredients);
    }
  
    // Tags speichern
    if (data.tags) {
      recipe.tags = await this.tagRepository.find({
        where: data.tags.map(tag => ({ name: tag }))
      });
    }
  
    return await this.recipeRepository.save(recipe);
  }
  


  // (!) Attention: If you use this api in production, implement a "where" filter
  async readAll(): Promise<Recipe[]> {
    // return await this.RecipesRepository.find();
    return await this.recipeRepository.find({
      relations: {
        ingredients: true,
        tags: true,
        ratings: true,
      }
    });
    return await this.recipeRepository.find();
  }

  async readOne(id: number): Promise<RecipeDto | null> {
    const result = await this.recipeRepository.findOne({
      where: { id },
      relations: { ingredients: true, ratings: { user: true }, tags: true, user: true },
    });

    if (!result) {
      return null;
    }
    return new RecipeDto(result);
  }

  async update(id: number, data: Partial<Recipe>) {
    return await this.recipeRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.recipeRepository.delete(id);
  }

  async getByUser(userId: number): Promise<Recipe[]> {
    return this.recipeRepository.find({
      where: { user: { id: userId } },
      relations: { tags: true, ratings: true }, 
    });
  }
  
  
}
