import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';
export declare class RecipeController {
    private readonly recipeService;
    constructor(recipeService: RecipeService);
    getAllRecipes(): Promise<Recipe[]>;
    getRecipe(id: number): Promise<Recipe | null>;
    createRecipe(recipe: Recipe): Promise<Recipe>;
    updateRecipe(id: number, data: Partial<Recipe>): Promise<import("typeorm").UpdateResult>;
    deleteRecipe(id: number): Promise<void>;
}
