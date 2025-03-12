// Basistyp für alle Entitäten
interface BaseEntity {
  id: string;
  createdAt: Date;
}

// Benutzer der Anwendung
interface User extends BaseEntity {
  username: string;
  email: string;
  passwordHash: string;
  userImgUrl?: string;
  role: 'user' | 'admin';
}

// Rezept
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
  userId: string; // Referenz auf die user.id des Erstellers
  updatedAt: Date;
}

// Zutaten mit Menge und Einheit
interface Ingredient {
  servings: string; // Für wie viel Portionen die Werte sind
  name: string;
  amount: number;
  unit: 'g' | 'kg' | 'ml' | 'l' | 'tbsp' | 'tsp' | 'cup' | 'piece';
}

// Bewertungen
interface Rating extends BaseEntity {
  userId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  updatedAt: Date;
}

// Merk Liste
interface MerkListe {
  recipeId: string; // Referenz auf recipe.id
  userId: string; // Referenz auf user.id der sich die Referenz merkt
  savedAt: Date;
}

// Tags für Rezepte
interface Tag {
  id: string;
  name: string;
}

// Verknüpfungstabelle zwischen Tags und Rezepten
interface RecipeTag {
  recipeId: string; // Referenz auf recipe.id
  tagId: string; // Referenz auf tag.id
}

// Liste für gemeldete Listen
interface ReportedRecipes {
  id: string;
  recipeId: string; // Referenz auf recipe.id
  userId: string; // Referenz auf user.id des Reporter
  reportedAt: Date;
  reason: string;
}
