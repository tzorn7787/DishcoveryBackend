import { Recipe } from './recipe.entity';
import { User } from '../user/user.entity';
import { BaseEntity } from '../shared/base';
export declare class Rating extends BaseEntity {
    user: User;
    recipe: Recipe;
    rating: 1 | 2 | 3 | 4 | 5;
    comment?: string;
    updatedAt: Date;
}
