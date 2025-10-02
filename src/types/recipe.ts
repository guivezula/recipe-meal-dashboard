export type IngredientCategory =
  | "produce"
  | "dairy"
  | "meat"
  | "pantry"
  | "spices"
  | "other";

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string; // g, ml, tbsp, etc.
  category: IngredientCategory;
}

export interface NutritionInfo {
  calories: number;
  protein: number; // g
  carbs: number;   // g
  fat: number;     // g
}

export interface Step {
  order: number;
  description: string;
  duration?: number;
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  cuisine: string;
  difficulty: "Easy" | "Medium" | "Hard";
  cookingTime: number;
  servings: number;
  dietaryTags: string[];

  ingredients: Ingredient[];
  instructions: Step[];
  nutrition: NutritionInfo;

  rating?: number;
  notes?: string[];
  sourceUrl?: string;
}
