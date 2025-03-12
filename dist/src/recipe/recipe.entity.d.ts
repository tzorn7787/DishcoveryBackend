import { BaseEntity } from '../shared/base';
import { User } from 'src/user/user.entity';
import { Ingredient } from './ingredient.entity';
import { Rating } from './rating.entity';
import { Tag } from './tag.entity';
export declare class Recipe extends BaseEntity {
    title: string;
    description: string;
    text: string;
    imgUrl: string;
    difficulty: 'easy' | 'medium' | 'hard';
    prepTime: number;
    cookTime: number;
    ratings: Rating[];
    ingredients: Ingredient[];
    user: User;
    updatedAt: Date;
    tags: Tag[];
}
