import { Recipe } from 'src/recipe/recipe.entity';
import { User } from 'src/user/user.entity';
export declare class RecipeReport {
    id: number;
    recipe: Recipe;
    user: User;
    reportedAt: Date;
    reason: string;
}
