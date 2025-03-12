import { Recipe } from 'src/recipe/recipe.entity';
import { User } from '../user/user.entity';
export declare class WatchEntry {
    id: number;
    user: User;
    recipe: Recipe;
    savedAt: Date;
}
