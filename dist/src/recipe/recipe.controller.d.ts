import { RecipeService } from './recipe.service';
export declare class RecipeController {
    private readonly recipeService;
    constructor(recipeService: RecipeService);
    readAll(): Promise<import("./recipe.entity").Recipe[]>;
    readOne(id: string): Promise<import("./recipe.entity").Recipe | null>;
}
