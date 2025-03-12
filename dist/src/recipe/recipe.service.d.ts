import { Recipe } from './recipe.entity';
import { Repository } from 'typeorm';
export declare class RecipeService {
    private RecipesRepository;
    constructor(RecipesRepository: Repository<Recipe>);
    create(Recipe: Recipe): Promise<Recipe>;
    readAll(): Promise<Recipe[]>;
    readOne(id: number): Promise<Recipe | null>;
    update(id: number, data: Partial<Recipe>): Promise<import("typeorm").UpdateResult>;
    delete(id: number): Promise<void>;
}
