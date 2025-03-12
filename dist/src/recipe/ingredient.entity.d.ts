import { Recipe } from './recipe.entity';
export declare class Ingredient {
    id: number;
    recipe: Recipe;
    servings: string;
    name: string;
    amount: number;
    unit: 'g' | 'kg' | 'ml' | 'l' | 'tbsp' | 'tsp' | 'cup' | 'piece';
}
