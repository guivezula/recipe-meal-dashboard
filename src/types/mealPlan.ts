import type { NutritionInfo } from "./recipe";


export type MealType = "breakfast" | "lunch" | "dinner";

export interface MealSlot {
  type: MealType;
  recipeId: string;
}

export interface DayPlan {
  date: string;
  meals: MealSlot[];
  nutritionSummary: NutritionInfo; 
}

export interface MealPlan {
  id: string;
  weekStart: string;
  days: DayPlan[];
}
