import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';
export declare class RecipeController {
    private readonly recipeService;
    constructor(recipeService: RecipeService);
    readAll(): Promise<Recipe[]>;
    readOne(id: string): Promise<Recipe | null>;
    create(recipe: Recipe): Promise<Recipe>;
    update(id: string, recipe: Partial<Recipe>): Promise<import("typeorm").UpdateResult>;
}
