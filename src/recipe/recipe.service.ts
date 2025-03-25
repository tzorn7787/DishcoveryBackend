import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './create-recipe.dto';
import { User } from '../user/user.entity';
import { Ingredient } from './ingredient.entity';
import { Tag } from './tag.entity';
import { console } from 'inspector';


@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private RecipesRepository: Repository<Recipe>,  
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(Recipe: Recipe, userId: number): Promise<Recipe> {
    return await this.RecipesRepository.save(Recipe);
  }

   //kommentiert weil keine Ahnung wie es funktioniert. mit create geht aber alles :crying-cat-face:
   async createRecipe(data: CreateRecipeDto, userId: number): Promise<Recipe> {
    console.log('📥 Rezept kam an');
    console.log("🔥 createRecipe aufgerufen")
    // 1. User laden
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
  
    console.log('👤 Zugewiesener User:', user);
    console.log('✅ Rezept vor dem Speichern:', data);

    // 2. Zutaten erstellen
    const ingredients = (data.ingredients ?? []).map(ingredient => {
      return this.ingredientRepository.create({
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit as 'g' | 'kg' | 'ml' | 'l' | 'tbsp' | 'tsp' | 'cup' | 'piece',
      });
    });
  
    // 3. Tags erstellen oder laden
    const tags: Tag[] = [];
    if (data.tags && Array.isArray(data.tags)) {
      for (const tagName of data.tags) {
        let tag = await this.tagRepository.findOne({ where: { name: tagName } });
        if (!tag) {
          tag = this.tagRepository.create({ name: tagName });
          tag = await this.tagRepository.save(tag);
        }
        tags.push(tag);
      }
    }
  
    // 4. Rezept erstellen (inkl. user, tags, ingredients)
    const recipe = new Recipe();
    recipe.title = data.title;
    recipe.description = data.description;
    recipe.text = data.text;
    recipe.imgUrl = data.imgUrl ?? '';
    recipe.difficulty = data.difficulty;
    recipe.prepTime = data.prepTime;
    recipe.cookTime = data.cookTime;
    recipe.servings = data.servings;
    recipe.user = user;
    recipe.ingredients = ingredients;
    recipe.tags = tags;
  
    console.log('📦 Gespeichertes Rezept:', recipe);

    const savedRecipe = await this.RecipesRepository.save(recipe);
    console.log('🏷️ Gespeicherte Tags:', savedRecipe.tags);

    // 5. Rezept + Zutaten speichern (Zutaten werden wegen `cascade: true` automatisch gespeichert)
    return await this.RecipesRepository.save(recipe);
  }
  


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
