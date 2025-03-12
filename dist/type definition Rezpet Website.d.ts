interface BaseEntity {
    id: string;
    createdAt: Date;
}
interface User extends BaseEntity {
    username: string;
    email: string;
    passwordHash: string;
    userImgUrl?: string;
    role: 'user' | 'admin';
}
interface Recipe extends BaseEntity {
    title: string;
    description: string;
    text: string;
    imgUrl: string;
    difficulty: 'easy' | 'medium' | 'hard';
    prepTime: number;
    cookTime: number;
    ratings: Rating[];
    ingredients: Ingredient[];
    userId: string;
    updatedAt: Date;
}
interface Ingredient {
    servings: string;
    name: string;
    amount: number;
    unit: 'g' | 'kg' | 'ml' | 'l' | 'tbsp' | 'tsp' | 'cup' | 'piece';
}
interface Rating extends BaseEntity {
    userId: string;
    rating: 1 | 2 | 3 | 4 | 5;
    comment?: string;
    updatedAt: Date;
}
interface MerkListe {
    recipeId: string;
    userId: string;
    savedAt: Date;
}
interface Tag {
    id: string;
    name: string;
}
interface RecipeTag {
    recipeId: string;
    tagId: string;
}
interface ReportedRecipes {
    id: string;
    recipeId: string;
    userId: string;
    reportedAt: Date;
    reason: string;
}
