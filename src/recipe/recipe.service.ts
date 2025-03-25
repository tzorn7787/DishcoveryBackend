import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private RecipesRepository: Repository<Recipe>,  
  ) {}

  async create(Recipe: Recipe, userId: number): Promise<Recipe> {
    return await this.RecipesRepository.save(Recipe);
  }

  // kommentiert weil keine Ahnung wie es funktioniert. mit create geht aber alles :crying-cat-face:
  // async createRecipe(data: CreateRecipeDto, userId: number): Promise<Recipe> {
  //   console.log('rezept kam an');
  //   // User laden
  //   const user = await this.userRepository.findOne({ where: { id: userId } });
  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  
  //   // Rezept-Objekt erstellen
  //   const recipe = this.recipeRepository.create({ 
  //     title: data.title,
  //     description: data.description,
  //     text: data.text,
  //     imgUrl: data.imgUrl,
  //     difficulty: data.difficulty,
  //     prepTime: data.prepTime,
  //     cookTime: data.cookTime,
  //     user
  //   });
  
  //   await this.recipeRepository.save(recipe); // 
  
  //   // Ingredients speichern
  //   if (data.ingredients) {
  //     recipe.ingredients = data.ingredients.map(ingredient => {
  //       return this.ingredientRepository.create({
  //         name: ingredient.name,
  //         amount: ingredient.amount,
  //         unit: ingredient.unit as 'g' | 'kg' | 'ml' | 'l' | 'tbsp' | 'tsp' | 'cup' | 'piece',
  //         servings: 1, // Default-Wert
  //         recipe: { id: recipe.id } //  Nur ID übergeben
  //       });
  //     });
  
  //     await this.ingredientRepository.save(recipe.ingredients);
  //   }
  
  //   // Tags speichern
  //   if (data.tags) {
  //     recipe.tags = await this.tagRepository.find({
  //       where: data.tags.map(tag => ({ name: tag }))
  //     });
  //   }
  
  //   return await this.recipeRepository.save(recipe);
  // }


  // (!) Attention: If you use this api in production, implement a "where" filter
  async readAll(): Promise<Recipe[]> {
    // return await this.RecipesRepository.find();
    return await this.RecipesRepository.find({
      relations: {
        ingredients: true,
        tags: true,
        ratings: true,
      }
    });
  }

  async search(query: string): Promise<Recipe[]> {
    const lowerQuery = query.toLowerCase();
  
    return this.RecipesRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.tags', 'tag')
      .leftJoinAndSelect('recipe.ingredients', 'ingredient')
      .leftJoinAndSelect('recipe.ratings', 'rating')
      .where('LOWER(recipe.title) LIKE :query', { query: `%${lowerQuery}%` })
      .orWhere('LOWER(tag.name) LIKE :query', { query: `%${lowerQuery}%` })
      .orWhere('LOWER(ingredient.name) LIKE :query', { query: `%${lowerQuery}%` })
      .getMany();
  }
  

  async readOne(id: number): Promise<Recipe | null> {
    const result = await this.RecipesRepository.find({
      where: { id },
      relations: { ingredients: true, ratings: { user: true }, tags: true },
    });
    return result ? result[0] : null;
  }

  async update(id: number, data: Partial<Recipe>) {
    return await this.RecipesRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.RecipesRepository.delete(id);
  }

  async getByUser(userId: number): Promise<Recipe[]> {
    return this.RecipesRepository.find({
      where: { user: { id: userId } },
      relations: { tags: true, ratings: true }, 
    });
  }
  
  
}
